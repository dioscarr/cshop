import { useEffect, useState } from 'react'
import { AppointmentForm } from '@/components/admin/AppointmentForm'
import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export default function NewAppointmentPage() {
  alert('New Appointment Page loaded')
  const [barbers, setBarbers] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: barbersData }, { data: servicesData }] = await Promise.all([
        supabase.from('barbers').select('*'),
        supabase.from('services').select('*')
      ])
      
      if (barbersData) setBarbers(barbersData)
      if (servicesData) setServices(servicesData)
    }

    fetchData()
  }, [])

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <AppointmentForm
        barbers={barbers}
        services={services}
        onSuccess={() => navigate('/admin/appointments')}
      />
    </div>
  )
}
