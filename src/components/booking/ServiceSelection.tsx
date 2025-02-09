import React from 'react';
import { Service } from '@/types/booking';
import { Card } from '@/components/ui/card';

interface ServiceSelectionProps {
  services: Service[];
  onSelect: (service: Service) => void;
}

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({ services, onSelect }) => {
  if (!services?.length) {
    return <div>No services available</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Choose a Service</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <Card
            key={service.id}
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect(service)}
          >
            <h3 className="text-lg font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{service.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold">${service.price}</span>
              <span className="text-sm text-gray-500">{service.duration} min</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelection;
