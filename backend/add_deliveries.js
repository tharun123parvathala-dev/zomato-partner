require('dotenv').config();
const mongoose = require('mongoose');
const Partner = require('./models/Partner');
const Delivery = require('./models/Delivery');

const restaurants = [
  "Biryani Palace", "Burger King", "Subway", "Domino's Pizza", "KFC", 
  "Local Dosa Corner", "Chinese Wok", "Taco Bell", "Cafe Coffee Day", "McDonald's"
];
const areas = [
  'MG Road', 'Railway Station', 'Bus Stand', 'IT Park', 'University Campus',
  'Shopping Mall', 'Residential Complex', 'City Center', 'Old Town', 'New Suburb'
];

const addDeliveries = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected for adding deliveries');
    
    const partners = await Partner.find({});
    
    for (const p of partners) {
      for(let i=0; i<5; i++) {
        const restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
        const drop = areas[Math.floor(Math.random() * areas.length)];
        const dist = (Math.random() * 5 + 1).toFixed(1); // 1.0 to 6.0 km
        
        await Delivery.create({
          orderId: `ORD${Math.floor(Math.random()*90000) + 10000}`,
          partnerId: p.partnerId,
          restaurant: restaurant,
          pickupAddress: `${restaurant} - Main Branch`,
          customerArea: drop,
          distance: parseFloat(dist),
          estimatedTime: Math.floor(dist * 5) + 5, // roughly 5 mins per km + 5 mins pickup
          estimatedEarnings: Math.floor(dist * 15) + 30, // roughly ₹15 per km + ₹30 base
          status: 'available'
        });
      }
    }
    
    console.log('Successfully added 5 new deliveries for all partners');
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}
addDeliveries();
