import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-[#1C1C1C] font-sans">
      
      {/* Hero Section with Background Image */}
      <div className="relative h-[450px] md:h-[500px] w-full bg-black flex flex-col items-center">
        {/* Background Image (dimmed) */}
        <img 
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Pizza background" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        
        {/* Navbar inside hero to overlay on image */}
        <nav className="relative z-10 w-full flex justify-between items-center px-10 py-6 max-w-7xl mx-auto text-white">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-extrabold italic tracking-tighter">zomato</span>
            <span className="text-sm tracking-widest font-semibold mt-1 opacity-90">DELIVERY</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#how-it-works" className="hover:opacity-80 transition-opacity">How it works</a>
            <a href="#benefits" className="hover:opacity-80 transition-opacity">Benefits</a>
            <a href="#requirements" className="hover:opacity-80 transition-opacity">Requirements</a>
            <Link to="/login" className="hover:opacity-80 transition-opacity">Log in</Link>
            <Link to="/register" className="bg-white text-black px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors font-bold">
              Sign up
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <main className="relative z-10 max-w-7xl mx-auto px-10 flex-1 flex flex-col items-center justify-center text-center text-white pb-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight italic mb-8">
            zomato
          </h1>
          <h2 className="text-2xl md:text-4xl font-normal mb-10 tracking-wide text-white">
            Discover the freedom of delivering with India's best fleet.
          </h2>

          <Link 
            to="/register" 
            className="bg-[#E23744] hover:bg-[#D32F2F] text-white px-8 py-3.5 rounded-lg font-bold shadow-lg transition-transform transform hover:scale-105 duration-300">
            Join Current Batch
          </Link>
        </main>
      </div>

      {/* Content Sections */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-10 space-y-24">
          
          <section id="how-it-works" className="scroll-mt-24">
            <h2 className="text-3xl font-normal mb-8 text-center text-[#1C1C1C]">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="h-48 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Accept Deliveries" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-normal text-xl mb-2 text-[#1C1C1C]">1. Accept Deliveries</h3>
                  <p className="text-gray-500 font-light text-sm">Go online in the app and accept delivery requests from restaurants near you.</p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="h-48 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Pick Up Orders" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-normal text-xl mb-2 text-[#1C1C1C]">2. Pick Up Orders</h3>
                  <p className="text-gray-500 font-light text-sm">Head to the restaurant, pick up the hot food, and verify the order details.</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="h-48 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Deliver & Earn" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-normal text-xl mb-2 text-[#1C1C1C]">3. Deliver & Earn</h3>
                  <p className="text-gray-500 font-light text-sm">Deliver to the customer's location and get your earnings credited instantly.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="benefits" className="scroll-mt-24">
            <h2 className="text-3xl font-normal mb-8 text-center text-[#1C1C1C]">Benefits of joining us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4 bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="text-3xl">💸</div>
                <div>
                  <h3 className="font-normal text-lg">Weekly Payouts</h3>
                  <p className="text-gray-500 text-sm mt-1 font-light">Get your earnings transferred directly to your bank account every single week without delays.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="text-3xl">⏱️</div>
                <div>
                  <h3 className="font-normal text-lg">Flexible Timings</h3>
                  <p className="text-gray-500 text-sm mt-1 font-light">You are your own boss. Log in and log out whenever you want. Work full-time or part-time.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="text-3xl">🛡️</div>
                <div>
                  <h3 className="font-normal text-lg">Insurance Cover</h3>
                  <p className="text-gray-500 text-sm mt-1 font-light">Accidental and medical insurance coverage for you and your family to keep you safe.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="text-3xl">🏆</div>
                <div>
                  <h3 className="font-normal text-lg">NichePay Integration</h3>
                  <p className="text-gray-500 text-sm mt-1 font-light">Seamlessly connect your profile to NichePay for worker onboarding and exclusive disruption protection.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="requirements" className="scroll-mt-24 pb-16">
            <h2 className="text-3xl font-normal mb-8 text-center text-[#1C1C1C]">Requirements</h2>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <ul className="space-y-4 font-light text-[#1C1C1C]">
                <li className="flex items-center space-x-3"><span className="text-[#E23744]">✓</span><span>A smartphone with internet connection</span></li>
                <li className="flex items-center space-x-3"><span className="text-[#E23744]">✓</span><span>A valid two-wheeler driving license (if using a bike/scooter)</span></li>
                <li className="flex items-center space-x-3"><span className="text-[#E23744]">✓</span><span>Vehicle Registration Certificate (RC)</span></li>
                <li className="flex items-center space-x-3"><span className="text-[#E23744]">✓</span><span>PAN Card and Bank Account details for payouts</span></li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
