import React, { useState } from 'react';

const ConfirmationPage = ({setCurrentStep, selectedService, selectedBarber, selectedDateTime, resetSelection }) => {
    const [bookingMade, setBookingMade] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [bookingProcessing, setBookingProcessing] = useState(false);
    const [activeSelection, setActiveSelection] = useState('');

    const handleMakeBooking = () => {
        setBookingProcessing(true);

        // Simulate sending data to Square API
        setTimeout(() => {
            console.log('Booking made:', selectedBarber, selectedService, selectedDateTime, selectedTimeSlot);
            setBookingMade(true);
            setBookingProcessing(false);
        }, 2000);
    };

    const handleEditSelection = (selection) => {
        setActiveSelection(selection);
    };

    return (
        <div>
            <h2>Confirmation Page</h2>
            <p>Selected Service: {selectedService.name}</p>
            <p>Selected Barber: {selectedBarber.name}</p>
            <p>Selected Date and Time: {selectedDateTime}</p>

            {bookingMade ? (
                <div>
                    <p>Thank you for your booking!</p>
                    <button onClick={resetSelection}>Start Another Booking</button>
                </div>
            ) : (
                <div>
                    <h3>Edit Selection:</h3>
                    <div>
                        <button
                            onClick={() => setCurrentStep(1)}
                            className={activeSelection === 'service' ? 'active' : ''}
                        >
                            Edit Service
                        </button>
                        <button
                            onClick={() => setCurrentStep(2)}
                            className={activeSelection === 'barber' ? 'active' : ''}
                        >
                            Edit Barber
                        </button>
                        <button
                            onClick={() => setCurrentStep(3)}
                            className={activeSelection === 'datetime' ? 'active' : ''}
                        >
                            Edit Date and Time
                        </button>
                    </div>

                    {activeSelection === 'service' && (
                        <div>
                            {/* Render service selection UI */}
                        </div>
                    )}
                    {activeSelection === 'barber' && (
                        <div>
                            {/* Render barber selection UI */}
                        </div>
                    )}
                    {activeSelection === 'datetime' && (
                        <div>
                            {/* Render date and time selection UI */}
                        </div>
                    )}

                    <button onClick={handleMakeBooking} disabled={bookingProcessing}>
                        {bookingProcessing ? 'Processing...' : 'Make Booking'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConfirmationPage;