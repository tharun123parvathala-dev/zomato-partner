import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Register({ setToken }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    city: '',
    vehicleType: 'Bike',
    vehicleNumber: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', formData);
      setToken(res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col relative">
      {/* Food Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}
      ></div>
      <div className="absolute inset-0 w-full h-full bg-black/50"></div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 py-12 relative z-10">
        <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md z-10 border border-gray-100">
          
          {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-primary italic tracking-tighter mb-4">zomato</h1>
          <h2 className="text-xl font-bold text-gray-800">Partner Registration</h2>
          <p className="text-gray-500 text-sm mt-1">Join India's best delivery fleet</p>
        </div>

        {error && <p className="text-red-500 mb-4 text-center text-sm">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Full Name</label>
            <input required type="text" name="name" onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 bg-[#FAFAFA]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Email</label>
            <input required type="email" name="email" onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 bg-[#FAFAFA]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Phone Number</label>
            <input required type="text" name="phone" onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 bg-[#FAFAFA]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Password</label>
            <input required type="password" name="password" onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 bg-[#FAFAFA]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">City</label>
            <input required type="text" name="city" onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 bg-[#FAFAFA]" />
          </div>
          
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Vehicle</label>
              <select name="vehicleType" onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 bg-[#FAFAFA]">
                <option value="Bike">Bike</option>
                <option value="Cycle">Cycle</option>
                <option value="Scooter">Scooter</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Vehicle Number</label>
              <input required type="text" name="vehicleNumber" onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 bg-[#FAFAFA]" />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#EF4F5F] hover:bg-[#E23744] text-white py-3.5 rounded-xl font-bold transition-colors mt-6">
            Register
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm mb-1">Already have an account?</p>
          <Link to="/login" className="text-primary font-bold hover:underline">Log in here</Link>
        </div>
        </div>
      </div>
    </div>
  );
}
