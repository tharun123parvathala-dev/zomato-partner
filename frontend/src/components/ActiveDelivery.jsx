import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ActiveDelivery() {
  const [delivery, setDelivery] = useState(null);
  const navigate = useNavigate();

  const loadDelivery = async () => {
    const res = await axios.get('/api/deliveries/active');
    setDelivery(res.data);
  };

  useEffect(() => { loadDelivery(); }, []);

  const updateStatus = async (status) => {
    await axios.patch(`/api/deliveries/${delivery._id}/status`, { status });
    if (status === 'delivered') navigate('/');
    else loadDelivery();
  };

  if (!delivery) return <div>No active delivery. Go accept one!</div>;

  const states = ['accepted', 'arrived_at_restaurant', 'picked_up', 'on_the_way', 'delivered'];
  const currentIndex = states.indexOf(delivery.status);

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Active Delivery: {delivery.orderId}</h2>
      <div className="mb-6">
        <p><strong>Restaurant:</strong> {delivery.restaurant}</p>
        <p><strong>Pickup:</strong> {delivery.pickupAddress}</p>
        <p><strong>Drop:</strong> {delivery.customerArea}</p>
        <p><strong>Distance:</strong> {delivery.distance} km</p>
        <p><strong>Earnings:</strong> ₹{delivery.estimatedEarnings}</p>
      </div>

      <div className="space-y-4 mb-8">
        {states.map((s, i) => (
          <div key={s} className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded-full ${i <= currentIndex ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <span className={i <= currentIndex ? 'font-bold' : 'text-gray-500'}>{s.replace(/_/g, ' ').toUpperCase()}</span>
          </div>
        ))}
      </div>

      {delivery.status === 'accepted' && <button onClick={()=>updateStatus('arrived_at_restaurant')} className="w-full bg-primary text-white p-3 rounded">I've Reached Restaurant</button>}
      {delivery.status === 'arrived_at_restaurant' && <button onClick={()=>updateStatus('picked_up')} className="w-full bg-primary text-white p-3 rounded">Picked Up Order</button>}
      {delivery.status === 'picked_up' && <button onClick={()=>updateStatus('on_the_way')} className="w-full bg-primary text-white p-3 rounded">Start Delivery</button>}
      {delivery.status === 'on_the_way' && <button onClick={()=>updateStatus('delivered')} className="w-full bg-green-500 text-white p-3 rounded">Mark as Delivered</button>}
    </div>
  );
}
