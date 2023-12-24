// BarberCard.js

import React from 'react';

const BarberCard = ({ barber, selectBarber }) => {
    const handleSelectBarber = () => {
        debugger;
        selectBarber(barber);
    };

    return (
        <div className="card">
            <h3>{barber.name}</h3>
            <p>{barber.description}</p>
            <button onClick={handleSelectBarber}>Select</button>
        </div>
    );
};

export default BarberCard;