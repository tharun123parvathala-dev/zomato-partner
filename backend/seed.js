require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Partner = require('./models/Partner');
const Delivery = require('./models/Delivery');
const Earning = require('./models/Earning');
const Activity = require('./models/Activity');

const users = [
  { name: 'Tharun', partnerId: 'ZP10001', email: 'tharun@demo.zomato' },
  { name: 'Koushik', partnerId: 'ZP10002', email: 'koushik@demo.zomato' },
  { name: 'Chaitanya', partnerId: 'ZP10003', email: 'chaitanya@demo.zomato' },
  { name: 'Dwarakesh', partnerId: 'ZP10004', email: 'dwarakesh@demo.zomato' },
  { name: 'Balu', partnerId: 'ZP10005', email: 'balu@demo.zomato' },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected for seeding');
    
    await Partner.deleteMany({});
    await Delivery.deleteMany({});
    await Earning.deleteMany({});
    await Activity.deleteMany({});
    
    const hash = await bcrypt.hash('password123', 10);
    
    for (const u of users) {
      const p = await Partner.create({
        ...u,
        phone: '9999999999',
        password: hash,
        city: 'Chirala',
        vehicleType: 'Bike',
        vehicleNumber: 'AP 27 AB 1234',
        todayEarnings: 850,
        totalDeliveries: 245,
        completedDeliveries: 8,
        onlineHoursToday: 6.4,
        isOnline: true,
        weeklyEarnings: 5240
      });
      
      for(let i=0; i<5; i++) {
        await Delivery.create({
          orderId: `ORD${Math.floor(Math.random()*10000)}`,
          partnerId: p.partnerId,
          restaurant: 'Spice Kitchen',
          pickupAddress: 'Main Road, Chirala',
          customerArea: 'Railway Station Road',
          distance: 3.8,
          estimatedTime: 22,
          estimatedEarnings: 115,
          status: 'available'
        });
      }
    }
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}
seedDB();
