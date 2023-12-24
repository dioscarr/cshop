import React, { useState } from 'react';
import './App.css';
import BarberList from './BarberList';
import ServiceList from './ServiceList';
import ConfirmationPage from './ConfirmationPage';
import DateTimePicker from './DateTimePicker';

function App() {
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const barbers = [
    { id: 1, name: 'Barber 1', description: 'Experienced barber', availability: ['10:00', '11:00', '14:00', '15:00'] },
    { id: 2, name: 'Barber 2', description: 'Skilled in modern hairstyles', availability: ['09:00', '10:00', '13:00', '14:00'] },
    { id: 3, name: 'Barber 3', description: 'Specializes in beard grooming', availability: ['11:00', '12:00', '15:00', '16:00'] },
  ];

  const services = [
    { id: 1, name: 'Haircut', price: 20, duration: 30 },
    { id: 2, name: 'Beard Trim', price: 10, duration: 15 },
    { id: 3, name: 'Shave', price: 15, duration: 15 },
  ];

  const selectBarber = (barber) => {
    setSelectedBarber(barber);
    setCurrentStep(3);
  };

  const selectService = (service) => {
    setSelectedService(service);
    setCurrentStep(2);
  };

  const selectDateTime = (dateTime) => {
    setSelectedDateTime(dateTime);
    setCurrentStep(4);
  };

  const resetSelection = () => {
    setSelectedBarber(null);
    setSelectedService(null);
    setSelectedDateTime(null);
    setCurrentStep(1);
  };

  return (
    <div className="App">
      <h1>Barbershop Portal</h1>
      {currentStep === 1 && (
        <div>
          <h2>Select a Service</h2>
          <ServiceList services={services} selectService={selectService} />
        </div>
      )}
      {currentStep === 2 && (
        <div>
          <h2>Select a Barber</h2>
          <BarberList barbers={barbers} selectBarber={selectBarber} />
        </div>
      )}
      {currentStep === 3 && selectedService && (
        <div>
          <h2>Select a Barber</h2>
          <BarberList barbers={barbers} selectBarber={selectBarber} />
        </div>
      )}
      {currentStep === 4 && (
        <ConfirmationPage
          selectedBarber={selectedBarber}
          selectedService={selectedService}
          selectedDateTime={selectedDateTime}
          resetSelection={resetSelection}
          setCurrentStep={setCurrentStep} // Pass setCurrentStep as a prop
        />
      )}
      {currentStep === 3 && selectedService && selectedBarber && (
        <div>
          <h2>Select a Date and Time</h2>
          <DateTimePicker
            selectDateTime={selectDateTime}
            barberAvailability={selectedBarber.availability}
            serviceDuration={selectedService.duration}
          />
        </div>
      )}
    </div>
  );
}

export default App;