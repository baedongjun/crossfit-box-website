"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function ProfileForm({ user }: { user: any }) {
  const [name, setName] = useState(user?.name || "")
  const [bio, setBio] = useState(user?.profile?.bio || "")
  const [dateOfBirth, setDateOfBirth] = useState(user?.profile?.dateOfBirth || "")
  const [weight, setWeight] = useState(user?.profile?.weight || "")
  const [height, setHeight] = useState(user?.profile?.height || "")
  const [image, setImage] = useState<File | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const router = useRouter()

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (name.trim().length < 2) newErrors.name = "이름은 2글자 이상이어야 합니다."
    if (bio.trim().length > 500) newErrors.bio = "자기소개는 500자 이내여야 합니다."
    if (weight && (isNaN(Number(weight)) || Number(weight) <= 0)) newErrors.weight = "올바른 체중을 입력해주세요."
    if (height && (isNaN(Number(height)) || Number(height) <= 0)) newErrors.height = "올바른 신장을 입력해주세요."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    const formData = new FormData()
    formData.append("name", name)
    formData.append("bio", bio)
    formData.append("dateOfBirth", dateOfBirth)
    formData.append("weight", weight)
    formData.append("height", height)
    if (image) {
      formData.append("image", image)
    }

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "프로필 업데이트 중 오류가 발생했습니다.")
      }

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
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.form && <div className="text-red-500">{errors.form}</div>}
      <div className="flex flex-col items-center md:items-start">
        <label className="block mb-2">프로필 이미지</label>
        {user?.image && (
          <Image
            src={user.image || "/placeholder.svg"}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full mb-2"
          />
        )}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full"
          accept="image/*"
        />
      </div>
      <div>
        <label className="block mb-2">이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
      </div>
      <div>
        <label className="block mb-2">자기소개</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className={`w-full p-2 border rounded ${errors.bio ? "border-red-500" : ""}`}
          rows={3}
        />
        {errors.bio && <div className="text-red-500 text-sm">{errors.bio}</div>}
      </div>
      <div>
        <label className="block mb-2">생년월일</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">체중 (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className={`w-full p-2 border rounded ${errors.weight ? "border-red-500" : ""}`}
          />
          {errors.weight && <div className="text-red-500 text-sm">{errors.weight}</div>}
        </div>
        <div>
          <label className="block mb-2">신장 (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className={`w-full p-2 border rounded ${errors.height ? "border-red-500" : ""}`}
          />
          {errors.height && <div className="text-red-500 text-sm">{errors.height}</div>}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        저장
      </button>
    </form>
  )
}

