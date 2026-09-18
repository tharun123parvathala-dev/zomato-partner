require('dotenv').config();
const mongoose = require('mongoose');
const Delivery = require('./models/Delivery');

const restaurants = [
  "Biryani Palace", "Burger King", "Subway", "Domino's Pizza", "KFC", 
  "Local Dosa Corner", "Chinese Wok", "Taco Bell", "Cafe Coffee Day", "McDonald's"
];
const areas = [
  'MG Road', 'Railway Station', 'Bus Stand', 'IT Park', 'University Campus',
  'Shopping Mall', 'Residential Complex', 'City Center', 'Old Town', 'New Suburb'
];

const fixDeliveries = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    
    // Delete all available deliveries that are "Spice Kitchen" (the old seed)
    await Delivery.deleteMany({ status: 'available', restaurant: 'Spice Kitchen' });
    
    // Ensure we have at least 15 varied available deliveries
    for(let i=0; i<15; i++) {
        const restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
        const drop = areas[Math.floor(Math.random() * areas.length)];
        const dist = (Math.random() * 8 + 1).toFixed(1); // 1.0 to 9.0 km
        
        await Delivery.create({
          orderId: `ORD${Math.floor(Math.random()*90000) + 10000}`,
          partnerId: null, // Global pool
          restaurant: restaurant,
          pickupAddress: `${restaurant} - Main Branch`,
          customerArea: drop,
          distance: parseFloat(dist),
          estimatedTime: Math.floor(dist * 4) + 10,
          estimatedEarnings: Math.floor(dist * 12) + 40,
          status: 'available'
        });
    }
    
    console.log('Cleaned up old deliveries and generated varied new ones.');
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}
fixDeliveries();
