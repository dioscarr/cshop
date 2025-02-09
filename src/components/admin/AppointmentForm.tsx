import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { createClient } from '@supabase/supabase-js'
import { format } from 'date-fns'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface AppointmentFormProps {
  barbers: any[]
  services: any[]
  onSuccess?: () => void
}

export function AppointmentForm({ barbers, services, onSuccess }: AppointmentFormProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState('')
  const [selectedBarber, setSelectedBarber] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Get or create user by email
      const { data: user, error: userError } = await supabase.auth.signUp({
        email: clientEmail,
        password: Math.random().toString(36).slice(-8), // Generate random password
      })

      if (userError) throw userError

      if (!date || !time) throw new Error('Please select date and time')

      const appointmentDateTime = new Date(date)
      const [hours, minutes] = time.split(':')
      appointmentDateTime.setHours(parseInt(hours), parseInt(minutes))

      // Create appointment
      const { error: appointmentError } = await supabase
        .from('appointments')
        .insert({
          user_id: user.user?.id,
          barber_id: selectedBarber,
          service_id: selectedService,
          appointment_datetime: appointmentDateTime.toISOString(),
          status: 'confirmed', // Admin-created appointments are confirmed by default
          payment_status: 'paid'
        })

      if (appointmentError) throw appointmentError

      // Call onSuccess only after successful creation
      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create appointment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Client Email</label>
          <Input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            required
            placeholder="client@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Barber</label>
          <Select
            value={selectedBarber}
            onValueChange={setSelectedBarber}
            required
          >
            {barbers.map((barber) => (
              <Select.Option key={barber.id} value={barber.id}>
                {barber.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Service</label>
          <Select
            value={selectedService}
            onValueChange={setSelectedService}
            required
          >
            {services.map((service) => (
              <Select.Option key={service.id} value={service.id}>
                {service.name} - ${service.price}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(date) => date < new Date()}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Time</label>
          <Select
            value={time}
            onValueChange={setTime}
            required
          >
            {Array.from({ length: 9 }, (_, i) => i + 9).map((hour) => (
              <>
                <Select.Option value={`${hour}:00`}>{format(new Date().setHours(hour, 0), 'hh:mm a')}</Select.Option>
                <Select.Option value={`${hour}:30`}>{format(new Date().setHours(hour, 30), 'hh:mm a')}</Select.Option>
              </>
            ))}
          </Select>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating...' : 'Create Appointment'}
        </Button>
      </form>
    </Card>
  )
}
