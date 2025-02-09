import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function createBooking(booking: {
  barber_id: string
  service_id: string
  appointment_datetime: string
}) {
  const { data: session } = await supabase.auth.getSession()
  if (!session?.session?.user) {
    throw new Error('User must be logged in to book an appointment')
  }

  const { data, error } = await supabase
    .from('appointments')
    .insert({
      ...booking,
      user_id: session.session.user.id,
      status: 'pending',
      payment_status: 'unpaid'
    })
    .select()
    .single()

  if (error) throw error
  return data
}
