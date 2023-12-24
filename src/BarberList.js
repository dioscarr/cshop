// BarberList.js

import React from 'react';
import BarberCard from './BarberCard';

const BarberList = ({ barbers, selectBarber, selectedBarber }) => {
    const handleSelectBarber = (barber) => {
        selectBarber(barber);
    };

    return (
        <div>
            <h2>Barber List</h2>
            {selectedBarber && (
                <p>Selected Barber: {selectedBarber.name}</p>
            )}
            {barbers.map((barber) => (
                <BarberCard key={barber.id} barber={barber} selectBarber={handleSelectBarber} />
            ))}
        </div>
    );
};

export default BarberList;