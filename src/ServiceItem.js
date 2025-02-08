// ServiceItem.js

import React from 'react';

const ServiceItem = ({ service, selectService }) => {
    return (
        <div 
            onClick={() => selectService(service)}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.name}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="flex justify-between items-center">
                <span className="text-green-600 font-medium">${service.price}</span>
                <span className="text-gray-500 text-sm">{service.duration} mins</span>
            </div>
        </div>
    );
};

export default ServiceItem;