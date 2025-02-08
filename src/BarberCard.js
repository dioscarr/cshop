// BarberCard.js

import React from 'react';

const BarberCard = ({ barber, selectBarber }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{barber.name}</h3>
            <p className="text-gray-600 mb-4">{barber.description}</p>
            <button 
                onClick={() => selectBarber(barber)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
                Select
            </button>
        </div>
    );
};

export default BarberCard;