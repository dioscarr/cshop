// ServiceList.js

import React from 'react';
import ServiceItem from './ServiceItem';

const ServiceList = ({ services, selectService }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-medium mb-4">Select Your Service</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div 
            key={service.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2 dark:text-white">{service.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{service.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">${service.price}</span>
              <button
                onClick={() => selectService(service)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;