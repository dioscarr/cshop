import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function BookingSuccessPage() {
  alert('Booking Success Page loaded')
  return (
    <div className="container max-w-2xl mx-auto py-12 px-4 text-center space-y-6">
      <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
      <p className="text-muted-foreground">
        Thank you for your booking. We have sent you a confirmation email with the details.
      </p>
      <div className="space-x-4">
        <Link to="/dashboard">
          <Button variant="primary">View My Bookings</Button>
        </Link>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}
