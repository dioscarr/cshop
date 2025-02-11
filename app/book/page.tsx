import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import BookingForm from '@/components/BookingForm'

export default async function BookPage() {
  const supabase = createServerComponentClient({ cookies })

  const { data: barbers } = await supabase
    .from('barbers')
    .select('*')
    .eq('is_active', true)

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8 text-center">Book an Appointment</h1>
      <BookingForm barbers={barbers || []} services={services || []} />
    </div>
  )
}
