export default function BookingConfirmationPage() {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for booking with us. We&apos;ll send you a confirmation email shortly.
      </p>
      <a
        href="/"
        className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Return to Home
      </a>
    </div>
  )
}
