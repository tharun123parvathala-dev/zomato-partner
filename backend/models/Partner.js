const mongoose = require('mongoose');
const partnerSchema = new mongoose.Schema({
  partnerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  isOnline: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: true },
  totalDeliveries: { type: Number, default: 0 },
  completedDeliveries: { type: Number, default: 0 },
  cancelledDeliveries: { type: Number, default: 0 },
  totalEarnings: { type: Number, default: 0 },
  todayEarnings: { type: Number, default: 0 },
  weeklyEarnings: { type: Number, default: 0 },
  onlineHoursToday: { type: Number, default: 0 },
  rating: { type: Number, default: 5.0 },
  nichepayLinked: { type: Boolean, default: false }
}, { timestamps: true, collection: 'delivery_partners' });
module.exports = mongoose.model('Partner', partnerSchema);
