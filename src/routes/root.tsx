import React from 'react';
import { Outlet, useRouteError } from 'react-router-dom';

function ErrorBoundary() {
  const error = useRouteError() as Error;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            BookCut
          </h1>
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
