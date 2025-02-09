export interface Appointment {
  id: string;
  user_id: string;
  barber_id: string;
  service_id: string;
  appointment_date: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  created_at: string;
}

export interface Barber {
  id: string;
  name: string;
  bio?: string;
  image_url?: string;
  active: boolean;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  duration: number;
  price: number;
  active: boolean;
}

export interface BookingFormData {
  service_id: string;
  barber_id: string;
  appointment_date: string;
  notes?: string;
}
