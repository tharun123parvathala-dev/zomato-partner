import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [partner, setPartner] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const navigate = useNavigate();

  const loadData = async () => {
    const p = await axios.get('/api/partners/me');
    setPartner(p.data);
    const d = await axios.get('/api/deliveries/available');
    setDeliveries(d.data);
  };

  useEffect(() => { loadData(); }, []);

  const toggleOnline = async () => {
    await axios.patch('/api/partners/status', { isOnline: !partner.isOnline });
    loadData();
  };

  const acceptDelivery = async (id) => {
    await axios.post(`/api/deliveries/${id}/accept`);
    navigate('/active');
  };

  if (!partner) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {partner.name}</h1>
          <p className="text-gray-500">Partner ID: {partner.partnerId}</p>
        </div>
        <button onClick={toggleOnline} className={`px-6 py-2 rounded-full font-bold text-white ${partner.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}>
          {partner.isOnline ? 'ONLINE ●' : 'OFFLINE ○'}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Today's Earnings</p>
          <h2 className="text-2xl font-bold">₹{partner.todayEarnings}</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Today's Deliveries</p>
          <h2 className="text-2xl font-bold">{partner.completedDeliveries}</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Online Hours</p>
          <h2 className="text-2xl font-bold">{partner.onlineHoursToday} hrs</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Rating</p>
          <h2 className="text-2xl font-bold">{partner.rating} ⭐</h2>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Available Deliveries</h2>
      <div className="grid grid-cols-2 gap-4">
        {deliveries.map(d => (
          <div key={d._id} className="bg-white p-4 rounded shadow border-l-4 border-primary">
            <h3 className="font-bold mb-2">NEW DELIVERY</h3>
            <p><strong>Restaurant:</strong> {d.restaurant}</p>
            <p><strong>Pickup:</strong> {d.pickupAddress}</p>
            <p><strong>Drop:</strong> {d.customerArea}</p>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{d.distance} km</span>
              <span>{d.estimatedTime} min</span>
              <span className="font-bold text-green-600">₹{d.estimatedEarnings}</span>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-gray-200 py-2 rounded">Reject</button>
              <button onClick={() => acceptDelivery(d._id)} className="flex-1 bg-primary text-white py-2 rounded">Accept Delivery</button>
            </div>
          </div>
        ))}
        {deliveries.length === 0 && <p>No deliveries available.</p>}
      </div>
    </div>
  );
}
