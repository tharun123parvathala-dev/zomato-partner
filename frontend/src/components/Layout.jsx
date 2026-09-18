import { Outlet, Link } from 'react-router-dom';
import { Home, Bike, User, LogOut, Settings } from 'lucide-react';

export default function Layout({ setToken }) {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-primary">Delivery Partner</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"><Home size={20}/><span>Dashboard</span></Link>
          <Link to="/active" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"><Bike size={20}/><span>Active Delivery</span></Link>
          <Link to="/profile" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"><User size={20}/><span>Profile</span></Link>
          <Link to="/admin" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"><Settings size={20}/><span>Admin Demo</span></Link>
        </nav>
        <div className="p-4 border-t">
          <button onClick={() => setToken(null)} className="flex items-center space-x-2 p-2 text-red-500 hover:bg-red-50 rounded w-full"><LogOut size={20}/><span>Logout</span></button>
        </div>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
