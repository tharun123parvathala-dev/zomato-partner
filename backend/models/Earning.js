const mongoose = require('mongoose');
const earningSchema = new mongoose.Schema({
  partnerId: { type: String, required: true },
  deliveryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Delivery' },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['delivery', 'incentive', 'tip'], default: 'delivery' }
}, { timestamps: true, collection: 'earnings' });
module.exports = mongoose.model('Earning', earningSchema);
