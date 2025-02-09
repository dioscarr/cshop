import { useAppointment } from '@/contexts/AppointmentContext'
import { createBooking } from '@/services/bookingService'
import { Button } from './ui/button'
import { useState } from 'react'
import { useRouter } from 'next/router'

export function BookingConfirmation() {
  const { selectedBarber, selectedService, selectedDateTime, reset } = useAppointment()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!selectedBarber || !selectedService || !selectedDateTime) {
      setError('Please complete all booking details')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await createBooking({
        barber_id: selectedBarber.id,
        service_id: selectedService.id,
        appointment_datetime: selectedDateTime.toISOString()
      })
      reset()
      router.push('/booking/success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Confirm Your Booking</h2>
      
      <div className="space-y-2">
        <p><span className="font-medium">Barber:</span> {selectedBarber?.name}</p>
        <p><span className="font-medium">Service:</span> {selectedService?.name}</p>
        <p><span className="font-medium">Date & Time:</span> {selectedDateTime?.toLocaleString()}</p>
        <p><span className="font-medium">Price:</span> ${selectedService?.price}</p>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button 
        onClick={handleSubmit} 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
      </Button>
    </div>
  )
}
