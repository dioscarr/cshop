import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Layout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">BookCut Admin</h2>
        </div>
        <nav className="mt-4">
          <Link to="/manage" className="block px-4 py-2 hover:bg-gray-50">Dashboard</Link>
          <Link to="/manage/appointments" className="block px-4 py-2 hover:bg-gray-50">Appointments</Link>
          <Link to="/manage/barbers" className="block px-4 py-2 hover:bg-gray-50">Barbers</Link>
          <Link to="/manage/services" className="block px-4 py-2 hover:bg-gray-50">Services</Link>
          <Link to="/manage/payments" className="block px-4 py-2 hover:bg-gray-50">Payment History</Link>
          <Link to="/manage/reports" className="block px-4 py-2 hover:bg-gray-50">Reports</Link>
          <button 
            onClick={() => {
              logout();
              navigate('/manage/login');
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4">
            <h1 className="text-xl font-semibold text-gray-800">Management Portal</h1>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
