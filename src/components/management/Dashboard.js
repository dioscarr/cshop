import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Management Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Today's Overview</h2>
          <div className="space-y-2">
            <p>Appointments Today: <span className="font-medium">12</span></p>
            <p>Available Slots: <span className="font-medium">8</span></p>
            <p>Active Barbers: <span className="font-medium">3</span></p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link 
              to="/manage/appointments" 
              className="block w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
            >
              Manage Appointments
            </Link>
            <Link 
              to="/manage/barbers" 
              className="block w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
            >
              Manage Barbers
            </Link>
            <Link 
              to="/manage/services" 
              className="block w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
            >
              Manage Services
            </Link>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
          <div className="space-y-3">
            {[1,2,3].map((booking) => (
              <div key={booking} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">Classic Haircut</p>
                  <p className="text-sm text-gray-500">2:30 PM - James Wilson</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Confirmed
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
