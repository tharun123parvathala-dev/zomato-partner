const mongoose = require('mongoose');
const deliverySchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  partnerId: { type: String },
  restaurant: { type: String, required: true },
  pickupAddress: { type: String, required: true },
  customerArea: { type: String, required: true },
  distance: { type: Number, required: true },
  estimatedTime: { type: Number, required: true },
  estimatedEarnings: { type: Number, required: true },
  status: { type: String, enum: ['available', 'accepted', 'arrived_at_restaurant', 'picked_up', 'on_the_way', 'delivered'], default: 'available' }
}, { timestamps: true, collection: 'deliveries' });
module.exports = mongoose.model('Delivery', deliverySchema);
