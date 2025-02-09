import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminAppointmentsPage() {
  alert('Admin Appointments Page loaded')
  const router = useRouter()
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    const { data } = await supabase
      .from('appointments')
      .select(`
        *,
        barbers (name),
        services (name, price)
      `)
      .order('appointment_datetime', { ascending: true })
    
    if (data) setAppointments(data)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <Button 
          onClick={() => router.push('/admin/appointments/new')}
          className="bg-[var(--main-color)] hover:bg-[var(--main-color)]/80 
            transition-all duration-300 ease-in-out
            shadow-md hover:shadow-lg transform hover:-translate-y-0.5
            hover:scale-105 hover:brightness-110"
        >
          New Appointment
        </Button>
      </div>

      <div className="space-y-4">
        {appointments.map((apt: any) => (
          <div 
            key={apt.id} 
            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{apt.barbers?.name}</h3>
                <p className="text-sm text-muted-foreground">{apt.services?.name}</p>
                <p className="text-sm">
                  {new Date(apt.appointment_datetime).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">${apt.services?.price}</p>
                <p className={`text-sm ${
                  apt.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {apt.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
