import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
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
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-primary italic tracking-tighter mb-4">zomato</h1>
            <h2 className="text-xl font-bold text-gray-800">Reset Password</h2>
            {!submitted && <p className="text-gray-500 text-sm mt-2">Enter your email address to receive a password reset link.</p>}
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors bg-[#FAFAFA]" 
                    placeholder="partner@demo.zomato"
                    required 
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#EF4F5F] hover:bg-[#E23744] text-white py-3.5 rounded-xl font-bold transition-colors">
                Send Reset Link
              </button>
            </form>
          ) : (
            <div className="text-center bg-green-50 border border-green-100 p-6 rounded-2xl">
              <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Check your email</h3>
              <p className="text-gray-600 text-sm mb-6">
                We've sent a password reset link to <span className="font-semibold">{email}</span>. Please check your inbox.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-primary text-sm font-bold hover:underline"
              >
                Try another email
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 text-center flex justify-center space-x-2 text-sm">
            <span className="text-gray-500">Remember your password?</span>
            <Link to="/login" className="text-primary font-bold hover:underline">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
