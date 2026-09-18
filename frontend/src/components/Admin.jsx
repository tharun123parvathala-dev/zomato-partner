import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Admin() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/partners').then(res => setPartners(res.data));
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Admin Demo View</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Partner ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Today's Dels</th>
            <th>Today's Earns</th>
            <th>NichePay</th>
          </tr>
        </thead>
        <tbody>
          {partners.map(p => (
            <tr key={p._id} className="border-b">
              <td className="py-2">{p.partnerId}</td>
              <td>{p.name}</td>
              <td>{p.isOnline ? '🟢 Online' : '⚪ Offline'}</td>
              <td>{p.completedDeliveries}</td>
              <td>₹{p.todayEarnings}</td>
              <td>{p.nichepayLinked ? 'Connected' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
