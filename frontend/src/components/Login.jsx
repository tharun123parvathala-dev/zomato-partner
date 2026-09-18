import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login({ setToken }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming demo users email matches the pattern or we can just send it as 'email' since backend expects email
      // We'll hack it to map the phone number back to an email for demo if they enter 9981345677
      let trimmedPhone = phone.trim().toLowerCase();
      let emailToSend = trimmedPhone;
      if (trimmedPhone === '9981345677') emailToSend = 'balu@demo.zomato';
      else if (!trimmedPhone.includes('@')) emailToSend = `${trimmedPhone}@demo.zomato`;

      const res = await axios.post('/api/auth/login', { email: emailToSend, password });
      setToken(res.data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
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
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md z-10 border border-gray-100">
          
          <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-primary italic tracking-tighter mb-4">zomato</h1>
          <h2 className="text-xl font-bold text-gray-800">Partner Login</h2>
          <p className="text-gray-500 text-sm mt-1">Earn more with India's best fleet</p>
        </div>

        {error && <p className="text-red-500 mb-4 text-center text-sm">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input 
                type="text" 
                value={phone} 
                onChange={e=>setPhone(e.target.value)} 
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors bg-[#FAFAFA]" 
                placeholder="tharun@demo.zomato"
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                type="password" 
                value={password} 
                onChange={e=>setPassword(e.target.value)} 
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors bg-[#FAFAFA]" 
                placeholder="••••••••"
                required 
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link 
              to="/forgot-password"
              className="text-primary text-sm font-bold hover:underline bg-transparent border-none cursor-pointer">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="w-full bg-[#EF4F5F] hover:bg-[#E23744] text-white py-3.5 rounded-xl font-bold transition-colors mt-6">
            Log In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm mb-1">New to Zomato Delivery?</p>
          <Link 
            to="/register"
            className="text-primary font-bold hover:underline bg-transparent border-none cursor-pointer">
            Register as a Partner
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
