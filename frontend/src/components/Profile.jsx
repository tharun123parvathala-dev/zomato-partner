import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
  const [partner, setPartner] = useState(null);

  const loadData = async () => {
    const p = await axios.get('/api/partners/me');
    setPartner(p.data);
  };

  useEffect(() => { loadData(); }, []);

  const connectNichepay = async () => {
    alert(`NichePay Worker Onboarding

Partner ID: ${partner.partnerId}
Name: ${partner.name}
City: ${partner.city}

Connecting to NichePay...`);
    await axios.post('/api/nichepay/connect');
    loadData();
  };

  if (!partner) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div><p className="text-gray-500">Name</p><p className="font-bold">{partner.name}</p></div>
        <div><p className="text-gray-500">Partner ID</p><p className="font-bold">{partner.partnerId}</p></div>
        <div><p className="text-gray-500">Email</p><p className="font-bold">{partner.email}</p></div>
        <div><p className="text-gray-500">Phone</p><p className="font-bold">{partner.phone}</p></div>
        <div><p className="text-gray-500">City</p><p className="font-bold">{partner.city}</p></div>
        <div><p className="text-gray-500">Vehicle</p><p className="font-bold">{partner.vehicleType} ({partner.vehicleNumber})</p></div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-2">NichePay Integration</h3>
        <p className="mb-4">Status: <span className="font-bold">{partner.nichepayLinked ? 'Connected' : 'Not Connected'}</span></p>
        {!partner.nichepayLinked && (
          <button onClick={connectNichepay} className="bg-blue-600 text-white px-4 py-2 rounded">Connect to NichePay</button>
        )}
      </div>
    </div>
  );
}
