import Link from "next/link"

export default function ReservationConfirmation() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Reservation Confirmed!</h1>
      <p className="mb-4">Thank you for making a reservation. We look forward to seeing you!</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  )
}

