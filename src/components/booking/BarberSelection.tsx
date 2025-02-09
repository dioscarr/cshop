import React from 'react';
import { Barber } from '@/types/booking';
import { Card } from '@/components/ui/card';

interface BarberSelectionProps {
  barbers: Barber[];
  onSelect: (barber: Barber) => void;
}

const BarberSelection: React.FC<BarberSelectionProps> = ({ barbers, onSelect }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Choose Your Barber</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {barbers?.map((barber) => (
          <Card
            key={barber.id}
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect(barber)}
          >
            {barber.image_url && (
              <img
                src={barber.image_url}
                alt={barber.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h3 className="text-lg font-semibold">{barber.name}</h3>
            {barber.bio && <p className="text-sm text-gray-600">{barber.bio}</p>}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BarberSelection;
