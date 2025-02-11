import React from 'react';
import { Outlet, useRouteError, Link, useLocation } from 'react-router-dom';
import { HomeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function ErrorBoundary() {
  const error = useRouteError() as any;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">
          {error?.status === 404 ? 'Page Not Found' : 'Oops! Something went wrong'}
        </h1>
        <p className="text-gray-600 text-center mb-6">
          {error?.message || 'An unexpected error occurred'}
        </p>
        <Link 
          to="/"
          className="flex items-center justify-center gap-2 w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <HomeIcon className="h-5 w-5" />
          Return Home
        </Link>
      </div>
    </div>
  );
}

export const RootLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            BookCut
          </h1>
          {!isHomePage && (
            <Link 
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <HomeIcon className="h-5 w-5" />
              <span>Home</span>
            </Link>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

RootLayout.ErrorBoundary = ErrorBoundary;

export default RootLayout;
