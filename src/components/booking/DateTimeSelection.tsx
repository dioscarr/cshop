import React, { useState } from 'react';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DateTimeSelectionProps {
  onSelect: (datetime: string) => void;
}

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00'
  ];

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const datetime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        parseInt(selectedTime.split(':')[0]),
        parseInt(selectedTime.split(':')[1])
      ).toISOString();
      onSelect(datetime);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Add your calendar component here */}
        </div>
        <div>
          <h3 className="text-lg font-medium mb-3">Available Times</h3>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? 'primary' : 'outline'}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Button 
        className="mt-6 w-full"
        onClick={handleConfirm}
        disabled={!selectedDate || !selectedTime}
      >
        Confirm Selection
      </Button>
    </Card>
  );
};

export default DateTimeSelection;
