"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function PRRecordForm({ userId, prRecords }: { userId: string; prRecords: any[] }) {
  const [exercise, setExercise] = useState("")
  const [weight, setWeight] = useState("")
  const [reps, setReps] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const router = useRouter()

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (exercise.trim().length < 2) newErrors.exercise = "운동 종목은 2글자 이상이어야 합니다."
    if (isNaN(Number(weight)) || Number(weight) <= 0) newErrors.weight = "올바른 중량을 입력해주세요."
    if (isNaN(Number(reps)) || Number(reps) <= 0) newErrors.reps = "올바른 반복 횟수를 입력해주세요."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const res = await fetch("/api/pr-record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, exercise, weight, reps }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "PR 기록 추가 중 오류가 발생했습니다.")
      }

      setExercise("")
      setWeight("")
      setReps("")
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ form: error.message })
      } else {
        setErrors({ form: "알 수 없는 오류가 발생했습니다." })
      }
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">PR 기록</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {errors.form && <div className="text-red-500">{errors.form}</div>}
        <div>
          <label className="block mb-2">운동 종목</label>
          <input
            type="text"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className={`w-full p-2 border rounded ${errors.exercise ? "border-red-500" : ""}`}
            required
          />
          {errors.exercise && <div className="text-red-500 text-sm">{errors.exercise}</div>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">중량 (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className={`w-full p-2 border rounded ${errors.weight ? "border-red-500" : ""}`}
              required
            />
            {errors.weight && <div className="text-red-500 text-sm">{errors.weight}</div>}
          </div>
          <div>
            <label className="block mb-2">반복 횟수</label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className={`w-full p-2 border rounded ${errors.reps ? "border-red-500" : ""}`}
              required
            />
            {errors.reps && <div className="text-red-500 text-sm">{errors.reps}</div>}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          PR 기록 추가
        </button>
      </form>

      <h3 className="text-xl font-bold mb-2">PR 기록 목록</h3>
      <ul className="space-y-2">
        {prRecords.map((record: any) => (
          <li key={record.id} className="border p-2 rounded">
            <div className="font-bold">{record.exercise}</div>
            <div>
              {record.weight}kg x {record.reps}
            </div>
            <div className="text-sm text-gray-500">{new Date(record.date).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

