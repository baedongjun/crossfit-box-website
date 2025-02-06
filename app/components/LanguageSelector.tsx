"use client"

import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import type React from "react" // Import React

export default function LanguageSelector() {
  const router = useRouter()
  const pathname = usePathname()

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value
    router.push(pathname, { locale })
  }

  return (
    <select onChange={changeLanguage} className="ml-4 p-2 rounded border">
      <option value="ko">한국어</option>
      <option value="en">English</option>
      <option value="ja">日本語</option>
    </select>
  )
}

