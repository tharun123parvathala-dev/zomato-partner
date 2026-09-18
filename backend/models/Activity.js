const mongoose = require('mongoose');
const activitySchema = new mongoose.Schema({
  partnerId: { type: String, required: true },
  type: { type: String, required: true },
  deliveryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Delivery' },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true, collection: 'partner_activity' });
module.exports = mongoose.model('Activity', activitySchema);
