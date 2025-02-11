import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { data: bookings, error } = await supabase
      .from('appointments')
      .select(`
        id,
        appointment_date,
        status,
        customer_name,
        customer_email,
        customer_phone,
        notes,
        barbers!inner(id, name),
        services!inner(id, name, duration, price)
      `)
      .order('appointment_date', { ascending: true })

    if (error) throw error

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Admin bookings error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings', details: error.message },
      { status: 500 }
    )
  }
}
