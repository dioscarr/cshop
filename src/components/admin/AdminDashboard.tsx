import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { format } from 'date-fns';
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  appointment_date: string;
  status: 'pending' | 'accepted' | 'declined';
  service_name: string;
  barber_name: string;
}

export function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await apiClient.get<Booking[]>('/admin/bookings');
      setBookings(data);
    } catch (err) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId: string, status: 'accepted' | 'declined') => {
    try {
      await apiClient.post(`/admin/bookings/${bookingId}/status`, { status });
      await loadBookings();
    } catch (err) {
      setError('Failed to update booking status');
    }
  };

  const handleReschedule = async (bookingId: string, newDate: string) => {
    try {
      await apiClient.post(`/admin/bookings/${bookingId}/reschedule`, { appointment_date: newDate });
      await loadBookings();
      setIsRescheduling(false);
      setSelectedBooking(null);
    } catch (err) {
      setError('Failed to reschedule booking');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button 
            onClick={loadBookings}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Booking Management</h1>
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{booking.customer_name}</h3>
                <p className="text-sm text-gray-600">{booking.customer_email}</p>
                <p className="text-sm">
                  {format(new Date(booking.appointment_date), 'PPP p')}
                </p>
                <p className="text-sm">
                  {booking.service_name} with {booking.barber_name}
                </p>
              </div>
              <div className="flex gap-2">
                {booking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(booking.id, 'accepted')}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                    >
                      <CheckCircleIcon className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => handleStatusChange(booking.id, 'declined')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <XCircleIcon className="h-6 w-6" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    setSelectedBooking(booking);
                    setIsRescheduling(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <CalendarDaysIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="mt-2">
              <span className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${booking.status === 'accepted' ? 'bg-green-100 text-green-800' : ''}
                ${booking.status === 'declined' ? 'bg-red-100 text-red-800' : ''}
                ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
              `}>
                <ClockIcon className="h-4 w-4 mr-1" />
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {isRescheduling && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Reschedule Booking</h3>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded mb-4"
              onChange={(e) => {
                if (selectedBooking) {
                  handleReschedule(selectedBooking.id, e.target.value);
                }
              }}
            />
            <button
              onClick={() => {
                setIsRescheduling(false);
                setSelectedBooking(null);
              }}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
