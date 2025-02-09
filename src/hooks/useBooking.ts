import { useState, useCallback } from 'react';
import { Barber, Service } from '@/types/booking';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/booking/services`);
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      setServices(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBarbers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/booking/barbers`);
      if (!response.ok) throw new Error('Failed to fetch barbers');
      const data = await response.json();
      setBarbers(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch barbers');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createBooking = async (bookingData: {
    barber_id: string;
    service_id: string;
    appointment_date: string;
    customer_name: string;
    customer_email: string;
    customer_phone?: string;
    notes?: string;
  }) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/booking/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingData,
          status: 'pending'
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    services,
    barbers,
    fetchServices,
    fetchBarbers,
    createBooking
  };
};
