import React, { createContext, useContext, useState } from 'react';

const AppointmentContext = createContext(null);

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const createAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now(),
      createdAt: new Date(),
      status: 'pending',
      paid: false,
      ...appointmentData
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    return newAppointment;
  };

  const updateAppointmentStatus = (appointmentId, status) => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status } 
          : appointment
      )
    );
  };

  const updatePaymentStatus = (appointmentId, transactionId) => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, paid: true, transactionId } 
          : appointment
      )
    );
  };

  return (
    <AppointmentContext.Provider value={{ 
      appointments,
      createAppointment,
      updateAppointmentStatus,
      updatePaymentStatus
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};
