'use client'

import { useState } from 'react'
import { Barber, Service, Booking } from '@/types/booking'

type BookingFormProps = {
  barbers: Barber[]
  services: Service[]
}

export default function BookingForm({ barbers, services }: BookingFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const booking: Booking = {
      barber_id: formData.get('barber_id') as string,
      service_id: formData.get('service_id') as string,
      appointment_date: formData.get('appointment_date') as string,
      customer_name: formData.get('customer_name') as string,
      customer_email: formData.get('customer_email') as string,
      customer_phone: formData.get('customer_phone') as string,
      notes: formData.get('notes') as string
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      })

      if (!response.ok) throw new Error('Booking failed')

      window.location.href = '/booking-confirmation'
    } catch (err) {
      setError('Failed to create booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="barber_id" className="block text-sm font-medium">
          Select Barber
        </label>
        <select
          id="barber_id"
          name="barber_id"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          {barbers.map((barber) => (
            <option key={barber.id} value={barber.id}>
              {barber.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="service_id" className="block text-sm font-medium">
          Select Service
        </label>
        <select
          id="service_id"
          name="service_id"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} - ${service.price} ({service.duration} min)
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="appointment_date" className="block text-sm font-medium">
          Appointment Date & Time
        </label>
        <input
          type="datetime-local"
          id="appointment_date"
          name="appointment_date"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="customer_name" className="block text-sm font-medium">
          Your Name
        </label>
        <input
          type="text"
          id="customer_name"
          name="customer_name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="customer_email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="customer_email"
          name="customer_email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="customer_phone" className="block text-sm font-medium">
          Phone (optional)
        </label>
        <input
          type="tel"
          id="customer_phone"
          name="customer_phone"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? 'Booking...' : 'Book Appointment'}
      </button>
    </form>
  )
}
