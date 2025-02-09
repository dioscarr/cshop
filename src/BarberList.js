// BarberList.js

import React from 'react';

const BarberList = ({ barbers, selectBarber }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-medium mb-4 dark:text-gray-100">Select Your Barber</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {barbers.map((barber) => (
          <div 
            key={barber.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={barber.image_url}
                alt={barber.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = 'https://via.placeholder.com/400x300?text=Barber'; // Fallback image
                }}
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold dark:text-white">{barber.name}</h3>
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 text-sm dark:text-gray-300">{barber.rating}</span>
                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({barber.reviews})</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{barber.description}</p>
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {barber.expertise && barber.expertise.map((skill, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-xs text-gray-700 dark:text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => selectBarber(barber)}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Select {barber.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarberList;