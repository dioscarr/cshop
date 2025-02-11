import { Barber } from '../../types/booking';

let barbers: Barber[] = [];

export async function createBarber(barber: Omit<Barber, 'id'>): Promise<Barber> {
  const newBarber: Barber = {
    id: Math.random().toString(36).substring(2, 15),
    ...barber,
  };
  barbers.push(newBarber);
  return newBarber;
}

export async function getBarber(id: string): Promise<Barber | undefined> {
  return barbers.find((barber) => barber.id === id);
}

export async function updateBarber(id: string, updates: Partial<Barber>): Promise<Barber | undefined> {
  const barberIndex = barbers.findIndex((barber) => barber.id === id);
  if (barberIndex === -1) {
    return undefined;
  }

  barbers[barberIndex] = { ...barbers[barberIndex], ...updates };
  return barbers[barberIndex];
}

export async function deleteBarber(id: string): Promise<boolean> {
  barbers = barbers.filter((barber) => barber.id !== id);
  return true;
}

export async function listBarbers(): Promise<Barber[]> {
  return barbers;
}
