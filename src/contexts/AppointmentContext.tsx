import React, { createContext, useContext, useState, useCallback } from 'react'

interface AppointmentContextProps {
  selectedBarber: string | null
  selectedService: string | null
  selectedDateTime: Date | null
  setSelectedBarber: (barber: string | null) => void
  setSelectedService: (service: string | null) => void
  setSelectedDateTime: (dateTime: Date | null) => void
  reset: () => void
}

const AppointmentContext = createContext<AppointmentContextProps | undefined>(undefined)

export const useAppointment = () => {
  const context = useContext(AppointmentContext)
  if (!context) {
    throw new Error('useAppointment must be used within an AppointmentProvider')
  }
  return context
}

export function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)

  const reset = useCallback(() => {
    setSelectedBarber(null)
    setSelectedService(null)
    setSelectedDateTime(null)
  }, [])

  const value = {
    selectedBarber,
    selectedService,
    selectedDateTime,
    setSelectedBarber,
    setSelectedService,
    setSelectedDateTime,
    reset,
  }

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  )
}
