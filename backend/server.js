require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Partner = require('./models/Partner');
const Delivery = require('./models/Delivery');
const Earning = require('./models/Earning');
const Activity = require('./models/Activity');
const nichepayService = require('./services/nichepayService');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// AUTH
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password, city, vehicleType, vehicleNumber } = req.body;
    
    const existing = await Partner.findOne({ $or: [{ email }, { phone }] });
    if (existing) return res.status(400).json({ error: 'User with this email or phone already exists' });
    
    const hash = await bcrypt.hash(password, 10);
    // Generate a random 5 digit ZP id
    const newId = `ZP${Math.floor(10000 + Math.random() * 90000)}`;
    
    const partner = await Partner.create({
      partnerId: newId,
      name, email, phone, password: hash, city, vehicleType, vehicleNumber,
      isOnline: false,
      isVerified: true,
      totalDeliveries: 0, completedDeliveries: 0, cancelledDeliveries: 0,
      totalEarnings: 0, todayEarnings: 0, weeklyEarnings: 0, onlineHoursToday: 0
    });
    
    const token = jwt.sign({ userId: partner._id, partnerId: partner.partnerId, email: partner.email }, process.env.JWT_SECRET);
    res.json({ token, user: { partnerId: partner.partnerId, name: partner.name, email: partner.email } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const partner = await Partner.findOne({ email });
    if (!partner) return res.status(400).json({ error: 'User not found' });
    
    const validPass = await bcrypt.compare(password, partner.password);
    if (!validPass) return res.status(400).json({ error: 'Invalid password' });
    
    const token = jwt.sign({ userId: partner._id, partnerId: partner.partnerId, email: partner.email }, process.env.JWT_SECRET);
    res.json({ token, user: { partnerId: partner.partnerId, name: partner.name, email: partner.email } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PARTNERS
app.get('/api/partners/me', authMiddleware, async (req, res) => {
  const partner = await Partner.findOne({ partnerId: req.user.partnerId }).select('-password');
  res.json(partner);
});

app.patch('/api/partners/status', authMiddleware, async (req, res) => {
  const { isOnline } = req.body;
  const partner = await Partner.findOneAndUpdate({ partnerId: req.user.partnerId }, { isOnline }, { new: true });
  await Activity.create({ partnerId: partner.partnerId, type: isOnline ? 'ONLINE' : 'OFFLINE' });
  res.json(partner);
});

app.get('/api/admin/partners', async (req, res) => {
  const partners = await Partner.find().select('-password');
  res.json(partners);
});

// DELIVERIES
app.get('/api/deliveries/available', authMiddleware, async (req, res) => {
  const deliveries = await Delivery.find({ status: 'available' }).limit(10);
  res.json(deliveries);
});

app.get('/api/deliveries/active', authMiddleware, async (req, res) => {
  const delivery = await Delivery.findOne({ partnerId: req.user.partnerId, status: { $ne: 'available', $ne: 'delivered' } });
  res.json(delivery);
});

app.get('/api/deliveries', authMiddleware, async (req, res) => {
  const deliveries = await Delivery.find({ partnerId: req.user.partnerId, status: 'delivered' }).sort({ createdAt: -1 });
  res.json(deliveries);
});

app.post('/api/deliveries/:id/accept', authMiddleware, async (req, res) => {
  const delivery = await Delivery.findOneAndUpdate(
    { _id: req.params.id, status: 'available' }, 
    { status: 'accepted', partnerId: req.user.partnerId }, 
    { new: true }
  );
  if (delivery) {
    await Activity.create({ partnerId: req.user.partnerId, type: 'DELIVERY_ACCEPTED', deliveryId: delivery._id });
    res.json(delivery);
  } else {
    res.status(400).json({ error: 'Delivery no longer available' });
  }
});

app.patch('/api/deliveries/:id/status', authMiddleware, async (req, res) => {
  const { status } = req.body;
  const delivery = await Delivery.findOneAndUpdate({ _id: req.params.id, partnerId: req.user.partnerId }, { status }, { new: true });
  
  if (status === 'delivered') {
    const p = await Partner.findOne({ partnerId: req.user.partnerId });
    p.completedDeliveries += 1;
    p.totalDeliveries += 1;
    p.todayEarnings += delivery.estimatedEarnings;
    p.weeklyEarnings += delivery.estimatedEarnings;
    p.totalEarnings += delivery.estimatedEarnings;
    await p.save();
    
    await Earning.create({ partnerId: p.partnerId, deliveryId: delivery._id, amount: delivery.estimatedEarnings, type: 'delivery' });
    await Activity.create({ partnerId: p.partnerId, type: 'DELIVERY_COMPLETED', deliveryId: delivery._id });
  } else {
    await Activity.create({ partnerId: req.user.partnerId, type: status.toUpperCase(), deliveryId: delivery._id });
  }
  
  res.json(delivery);
});

// EARNINGS
app.get('/api/earnings', authMiddleware, async (req, res) => {
  const earnings = await Earning.find({ partnerId: req.user.partnerId }).populate('deliveryId');
  res.json(earnings);
});

// NICHEPAY
app.get('/api/nichepay/partners/:partnerId', authMiddleware, async (req, res) => {
  const data = await nichepayService.getPartnerStatus(req.params.partnerId);
  res.json(data);
});

app.post('/api/nichepay/connect', authMiddleware, async (req, res) => {
  await Partner.findOneAndUpdate({ partnerId: req.user.partnerId }, { nichepayLinked: true });
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
