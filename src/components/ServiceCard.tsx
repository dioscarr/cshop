import { Card } from '@/components/ui/card'
import { Scissors, Beard, Ruler, Timer } from 'lucide-react'
import type { Service } from '@/types/database.types'

const serviceIcons = {
  'Classic Haircut': Scissors,
  'Beard Trim & Shape': Beard,
  'Royal Shave': Ruler,
  'Hair & Beard Combo': Scissors,
  // fallback icon
  default: Timer
}

interface ServiceCardProps {
  service: Service
  onClick: () => void
  selected?: boolean
}

export function ServiceCard({ service, onClick, selected }: ServiceCardProps) {
  const IconComponent = serviceIcons[service.name as keyof typeof serviceIcons] || serviceIcons.default

  return (
    <Card
      className={`
        p-4 cursor-pointer transition-all duration-200
        hover:shadow-lg hover:bg-red-50
        ${selected 
          ? 'border-2 border-[--main-color] shadow-lg bg-red-50' 
          : 'hover:border-[--main-color]'
        }
      `}
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className="p-2 rounded-full bg-[--main-color]/10">
          <IconComponent className="w-6 h-6 text-[--main-color]" />
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="font-semibold">{service.name}</h3>
          <p className="text-sm text-muted-foreground">{service.description}</p>
          <div className="flex items-center justify-between pt-2">
            <p className="font-semibold">${service.price}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Timer className="w-4 h-4 mr-1" />
              {service.duration} min
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
