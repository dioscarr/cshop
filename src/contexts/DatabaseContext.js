import React, { createContext, useContext } from 'react';
import supabase from '../config/supabaseClient';

const DatabaseContext = createContext();

export function DatabaseProvider({ children }) {
  // Barbers
  const getBarbers = async () => {
    console.log('🔍 Fetching barbers...');
    const { data, error } = await supabase
      .from('barbers')
      .select('*');
    
    console.log('📊 Barbers data:', data);
    console.log('❌ Barbers error:', error);
    
    if (error) {
      console.error('Error fetching barbers:', error);
      throw new Error(error.message);
    }
    return data;
  };

  // Services
  const getServices = async () => {
    console.log('🔍 Fetching services...');
    const { data, error } = await supabase
      .from('services')
      .select('*');
    
    console.log('📊 Services data:', data);
    console.log('❌ Services error:', error);
    
    if (error) {
      console.error('Error fetching services:', error);
      throw new Error(error.message);
    }
    return data;
  };

  // Appointments
  const createAppointment = async (appointmentData) => {
    console.log('Creating appointment with data:', appointmentData);
    
    // Format the datetime to ISO string
    const formattedData = {
      ...appointmentData,
      appointment_datetime: new Date(appointmentData.datetime).toISOString(),
      status: 'pending',
      payment_status: 'unpaid'
    };

    const { data, error } = await supabase
      .from('appointments')
      .insert([formattedData])
      .select('*, barbers(*), services(*)')
      .single();
    
    if (error) {
      console.error('Appointment error:', error);
      throw new Error(error.message);
    }

    console.log('Appointment created successfully:', data);
    return data;
  };

  const getAppointments = async () => {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        barbers (
          id,
          name,
          image_url
        ),
        services (
          id,
          name,
          price,
          duration
        )
      `)
      .order('appointment_datetime', { ascending: true });

    if (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
    return data;
  };

  const updateAppointmentStatus = async (id, status) => {
    const { data, error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const getBarberAvailability = async (barberId, date) => {
    const { data, error } = await supabase
      .from('barber_availability')
      .select('*')
      .eq('barber_id', barberId)
      .eq('day_of_week', date.getDay());
    if (error) throw error;
    return data;
  };

  const createBooking = async (bookingData) => {
    console.log('🔍 Starting booking creation...');
    
    try {
      const formattedData = {
        client_name: bookingData.client_name.trim(),
        client_email: bookingData.client_email.trim().toLowerCase(),
        client_phone: bookingData.client_phone.trim(),
        barber_id: bookingData.barber_id,
        service_id: bookingData.service_id,
        booking_datetime: new Date(bookingData.booking_datetime).toISOString(),
        status: 'pending',
        notes: bookingData.notes || ''
      };

      console.log('📝 Attempting to save booking:', formattedData);

      const { data, error } = await supabase
        .from('bookings')
        .insert([formattedData])
        .select()
        .single();

      if (error) {
        console.error('❌ Booking error:', error);
        throw new Error(error.message);
      }

      console.log('✅ Booking created:', data);
      return data;
    } catch (error) {
      console.error('❌ Error:', error);
      throw error;
    }
  };

  const value = {
    getBarbers,
    getServices,
    createAppointment,
    getAppointments,
    updateAppointmentStatus,
    getBarberAvailability,
    createBooking,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}
