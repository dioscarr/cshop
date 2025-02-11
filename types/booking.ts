export type Barber = {
  id: string
  name: string
  bio: string | null
  image_url: string | null
  is_active: boolean
}

export type Service = {
  id: string
  name: string
  description: string | null
  duration: number
  price: number
  is_active: boolean
}

export type Booking = {
  id?: string
  barber_id: string
  service_id: string
  appointment_date: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  notes?: string
  status?: 'pending' | 'confirmed' | 'cancelled'
}
