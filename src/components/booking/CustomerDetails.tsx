import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CustomerDetailsProps {
  formData: any;
  onChange: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ 
  formData, 
  onChange, 
  onSubmit 
}) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Your Details</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={formData.customer_name}
            onChange={(e) => onChange({
              ...formData,
              customer_name: e.target.value
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={formData.customer_email}
            onChange={(e) => onChange({
              ...formData,
              customer_email: e.target.value
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            value={formData.customer_phone}
            onChange={(e) => onChange({
              ...formData,
              customer_phone: e.target.value
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Complete Booking
        </Button>
      </form>
    </Card>
  );
};

export default CustomerDetails;
