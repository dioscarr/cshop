export interface Barber {
  id: string;
  name: string;
  availability: string[];
  imageUrl?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description?: string;
}

export interface Step {
  number: number;
  title: string;
}

export interface AppointmentData {
  selectedBarber: Barber | null;
  selectedService: Service | null;
  selectedDateTime: string | null;
}
