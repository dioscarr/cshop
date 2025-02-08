import React, { useState } from 'react';

const DateTimePicker = ({ selectDateTime, barberAvailability, serviceDuration }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const formatDateLabel = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dateToCheck = new Date(date);
        dateToCheck.setHours(0, 0, 0, 0);
        
        const diffDays = Math.floor((dateToCheck - today) / (1000 * 60 * 60 * 24));
        const fullDate = dateToCheck.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });
        
        switch (diffDays) {
            case 0:
                return `Today (${fullDate})`;
            case 1:
                return `Tomorrow (${fullDate})`;
            case 2:
                return `In 2 days (${fullDate})`;
            default:
                return `In ${diffDays} days (${fullDate})`;
        }
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };
    const handleDateChange = (dateStr) => {
        setSelectedDate(dateStr); // Update the date
        setSelectedTime(''); // Reset time whenever a new date is selected
    };
    const handleDateTimeSelection = () => {
        if (selectedDate && selectedTime) {
            const dateTime = `${selectedDate} ${selectedTime}`;
            selectDateTime(dateTime);
        }
    };

    const generateTimeSlots = () => {
        const timeSlots = [];
        const dates = [];
        const now = new Date();
        const today = new Date();
        
        // Generate next 5 days
        for (let i = 0; i < 5; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date);
        }

        // Generate time slots
        const startTime = new Date();
        startTime.setHours(10, 0, 0); // Start at 10 AM
        const endTime = new Date();
        endTime.setHours(22, 0, 0); // End at 10 PM

        // If it's today, filter out past times
        const currentTime = now.getHours() * 60 + now.getMinutes();
        
        while (startTime < endTime) {
            const timeSlot = startTime.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
            
            const slotTime = startTime.getHours() * 60 + startTime.getMinutes();
            
            if (selectedDate === today.toISOString().split('T')[0]) {
                // Only add future time slots for today
                if (slotTime > currentTime) {
                    timeSlots.push(timeSlot);
                }
            } else {
                timeSlots.push(timeSlot);
            }
            
            startTime.setMinutes(startTime.getMinutes() + 30);
        }

        return { 
            timeSlots, 
            dates: dates.map(date => ({
                value: date.toISOString().split('T')[0],
                label: formatDateLabel(date)
            }))
        };
    };

    const slots = generateTimeSlots();

    return (
        <div className="container mx-auto px-3 py-4">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-4">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Select Date:</label>
                    <div className="flex flex-wrap gap-2">
                        {slots.dates.map(({ value, label }) => (
                            <button
                                key={value}
                                onClick={() => handleDateChange(value)}
                                className={`flex-1 min-w-[150px] py-2 px-3 text-sm rounded-md transition-all ${
                                    selectedDate === value
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {selectedDate && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Select Time:
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {slots.timeSlots.map((timeSlot) => (
                                <button
                                    key={timeSlot}
                                    onClick={() => handleTimeChange({ target: { value: timeSlot } })}
                                    className={`py-2 px-3 text-sm rounded-md transition-all ${
                                        selectedTime === timeSlot
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    {timeSlot}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <button 
                    onClick={handleDateTimeSelection}
                    disabled={!selectedDate || !selectedTime}
                    className={`w-full py-2 px-4 rounded-md text-sm transition-all ${
                        selectedDate && selectedTime
                            ? 'bg-blue-500 hover:bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    Confirm Date and Time
                </button>
            </div>
        </div>
    );
};

export default DateTimePicker;