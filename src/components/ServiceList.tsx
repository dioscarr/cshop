import { ServiceCard } from './ServiceCard'

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
}

interface ServiceListProps {
  services: Service[]
  selectedService: Service | null
  onSelect: (service: Service) => void
}

export function ServiceList({ services, selectedService, onSelect }: ServiceListProps) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onClick={() => onSelect(service)}
          selected={selectedService?.id === service.id}
        />
      ))}
    </div>
  )
}
