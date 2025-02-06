import Link from "next/link"

export default function DropInConfirmation() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Drop-In Request Submitted!</h1>
      <p className="mb-4">Thank you for your drop-in request. We'll get back to you shortly with confirmation.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  )
}

