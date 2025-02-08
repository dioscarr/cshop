// BarberList.js

import React from 'react';

const BarberList = ({ barbers, selectBarber }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-xl font-medium mb-4">Select Your Barber</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {barbers.map((barber) => (
                    <div 
                        key={barber.id}
                        onClick={() => selectBarber(barber)}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden group"
                    >
                        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                            <img 
                                src={barber.image} 
                                alt={barber.name}
                                className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-medium text-gray-800">{barber.name}</h3>
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-sm text-gray-600 ml-1">{barber.rating}</span>
                                    <span className="text-xs text-gray-500 ml-1">({barber.reviews})</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{barber.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {barber.expertise.map((skill, index) => (
                                    <span 
                                        key={index}
                                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BarberList;