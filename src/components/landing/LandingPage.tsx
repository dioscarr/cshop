import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ShieldCheckIcon, ScissorsIcon } from '@heroicons/react/24/outline';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Welcome to BookCut
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
          Professional haircuts and grooming services at your fingertips
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Booking Tile */}
          <Link 
            to="/booking"
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800"
          >
            <div className="p-8">
              <ScissorsIcon className="h-16 w-16 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Book Appointment
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Schedule your next haircut or grooming service with our expert barbers
              </p>
              <div className="flex items-center text-blue-500 group-hover:translate-x-2 transition-transform">
                Book Now
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </div>
            </div>
          </Link>

          {/* Admin Tile */}
          <Link 
            to="/secure"
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800"
          >
            <div className="p-8">
              <ShieldCheckIcon className="h-16 w-16 text-green-500 mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Admin Access
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Manage appointments, services, and barbers through the admin dashboard
              </p>
              <div className="flex items-center text-green-500 group-hover:translate-x-2 transition-transform">
                Login
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} BookCut. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
