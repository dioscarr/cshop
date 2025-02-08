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
                        className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => selectService(service)}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium text-gray-800">{service.name}</h3>
                            <span className="text-blue-500 font-semibold">${service.price}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                        <div className="flex items-center text-xs text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {service.duration} minutes
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceList;