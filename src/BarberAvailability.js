import React, { useState } from 'react';

const BarberAvailability = ({ barbers, selectBarber }) => {
    const [selectedBarber, setSelectedBarber] = useState(null);

    const handleBarberSelection = (barber) => {
        setSelectedBarber(barber);
        selectBarber(barber);
    };

    return (
        <div>
            <h2>Select a Barber</h2>
            {barbers.map((barber) => (
                <div key={barber.id}>
                    <p>{barber.name}</p>
                    <button onClick={() => handleBarberSelection(barber)}>Select</button>
                </div>
            ))}
        </div>
    );
};

export default BarberAvailability;