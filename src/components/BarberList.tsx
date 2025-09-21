import { Card } from "@/components/ui/card"

interface Barber {
  id: string;
  name: string;
  image_url: string;
  description: string;
  rating: number;
  reviews: number;
}

interface BarberListProps {
  barbers: Barber[];
  onSelect: (barber: Barber) => void;
}

export function BarberList({ barbers, onSelect }: BarberListProps) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {barbers.map((barber) => (
        <Card
          key={barber.id}
          className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow hover:border-[var(--main-color)]"
          onClick={() => onSelect(barber)}
        >
          <div className="relative w-full h-48">
            <img
              src={barber.image_url}
              alt={barber.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-lg">{barber.name}</h3>
            <p className="text-muted-foreground text-sm">{barber.description}</p>
            <div className="flex items-center gap-2">
              <span className="text-[var(--main-color)]">★</span>
              <span>{barber.rating}</span>
              <span className="text-muted-foreground">({barber.reviews} reviews)</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
