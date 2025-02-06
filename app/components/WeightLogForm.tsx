"use client"

import { useState } from "react"

export default function WeightLogForm() {
  const [date, setDate] = useState("")
  const [weight, setWeight] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log("Weight logged:", { date, weight })
    // Show a success message or update UI
    alert("Weight logged successfully!")
    setDate("")
    setWeight("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="date" className="block mb-2">
          Date:
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="weight" className="block mb-2">
          Weight (kg):
        </label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          step="0.1"
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Log Weight
      </button>
    </form>
  )
}

