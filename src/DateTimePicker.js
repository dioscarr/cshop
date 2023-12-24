import React, { useState } from 'react';

const DateTimePicker = ({ selectDateTime, barberAvailability, serviceDuration }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const toInputDateStr = (date) => {
        return date.toISOString().split('T')[0];
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
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        const dayAfterTomorrow = new Date();
        dayAfterTomorrow.setDate(today.getDate() + 2);

        const startTime = new Date();
        startTime.setHours(10); // Set the starting hour
        startTime.setMinutes(0); // Set the starting minute
      
        const endTime = new Date();
        endTime.setHours(22); // Set the closing hour
        endTime.setMinutes(0); // Set the closing minute
      
        while (startTime < endTime) {
          const timeSlot = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          timeSlots.push(timeSlot);
          startTime.setMinutes(startTime.getMinutes() + 30); // Increment by 30 minutes
        }

        dates.push(today.toLocaleDateString());
        dates.push(tomorrow.toLocaleDateString());
        dates.push(dayAfterTomorrow.toLocaleDateString());

        const formattedToday = toInputDateStr(today);
        const formattedTomorrow = toInputDateStr(tomorrow);
        const formattedDayAfterTomorrow = toInputDateStr(dayAfterTomorrow);

        return { timeSlots, dates: [formattedToday, formattedTomorrow, formattedDayAfterTomorrow] };
    };

    return (
        <div>
        <label htmlFor="date">Date:</label>
        <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(event) => handleDateChange(event.target.value)}
        />

        <div>
            {generateTimeSlots().dates.map((dateStr) => (
                <button
                    key={dateStr}
                    onClick={() => handleDateChange(dateStr)}
                >
                    {dateStr}
                </button>
            ))}
        </div>

            <label htmlFor="time">Time:</label>
            <select id="time" value={selectedTime} onChange={handleTimeChange}>
                <option value="">Select a time</option>
                {generateTimeSlots().timeSlots.map((timeSlot) => (
                    <option key={timeSlot} value={timeSlot}>
                        {timeSlot}
                    </option>
                ))}
            </select>

            <button onClick={handleDateTimeSelection}>Select Date and Time</button>
        </div>
    );
};

export default DateTimePicker;