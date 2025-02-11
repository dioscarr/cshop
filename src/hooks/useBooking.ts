import { useState, useCallback } from 'react';
import { Barber, Service } from '@/types/booking';
import { apiClient } from '@/lib/api-client';

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiClient.get<Service[]>('/booking/services');
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
      const data = await apiClient.get<Barber[]>('/booking/barbers');
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
      const data = await apiClient.post('/booking/appointments', {
        ...bookingData,
        status: 'pending'
      });
      return data;
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
