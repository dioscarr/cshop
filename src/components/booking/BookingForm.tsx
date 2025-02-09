import React, { useState, useEffect } from 'react';
import { useBooking } from '@/hooks/useBooking';
import { Card } from '@/components/ui/card';
import ServiceSelection from './ServiceSelection';
import BarberSelection from './BarberSelection';
import DateTimeSelection from './DateTimeSelection';
import CustomerDetails from './CustomerDetails';

export const BookingForm = () => {
  const { loading, error, fetchServices, fetchBarbers, services, barbers, createBooking } = useBooking();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service_id: '',
    barber_id: '',
    appointment_date: null,
    customer_name: '',
    customer_email: '',
    customer_phone: ''
  });

  useEffect(() => {
    // Load initial data
    fetchServices();
    fetchBarbers();
  }, [fetchServices, fetchBarbers]);

  const steps = [
    { number: 1, title: "Select Service", completed: !!formData.service_id },
    { number: 2, title: "Choose Barber", completed: !!formData.barber_id },
    { number: 3, title: "Pick Time", completed: !!formData.appointment_date },
    { number: 4, title: "Your Details", completed: false }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createBooking(formData);
      if (result) {
        // Show success message
        alert('Booking confirmed!');
        setFormData({
          service_id: '',
          barber_id: '',
          appointment_date: null,
          customer_name: '',
          customer_email: '',
          customer_phone: ''
        });
        setStep(1);
      }
    } catch (err) {
      console.error('Booking failed:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((s) => (
            <div
              key={s.number}
              className={`flex-1 relative ${
                step > s.number ? 'text-blue-600' : ''
              }`}
            >
              <div className={`
                w-8 h-8 mx-auto rounded-full flex items-center justify-center
                ${step >= s.number ? 'bg-blue-600 text-white' : 'bg-gray-200'}
                ${s.completed ? 'bg-green-500' : ''}
              `}>
                {s.number}
              </div>
              <div className="text-xs mt-1 text-center">{s.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {step === 1 && (
          <ServiceSelection 
            services={services}
            onSelect={(service) => {
              setFormData(prev => ({ ...prev, service_id: service.id }));
              setStep(2);
            }} 
          />
        )}
        {step === 2 && (
          <BarberSelection
            barbers={barbers}
            onSelect={(barber) => {
              setFormData(prev => ({ ...prev, barber_id: barber.id }));
              setStep(3);
            }}
          />
        )}
        {step === 3 && (
          <DateTimeSelection
            onSelect={(datetime) => {
              setFormData(prev => ({ ...prev, appointment_date: datetime }));
              setStep(4);
            }}
          />
        )}
        {step === 4 && (
          <CustomerDetails
            formData={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </Card>
  );
};

export default BookingForm;
