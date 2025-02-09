import { useEffect, useState } from 'react'
import { AppointmentForm } from '@/components/admin/AppointmentForm'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function NewAppointmentPage() {
  alert('New Appointment Page loaded')
  const [barbers, setBarbers] = useState([])
  const [services, setServices] = useState([])
  const router = useRouter()

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
        onSuccess={() => router.push('/admin/appointments')}
      />
    </div>
  )
}
