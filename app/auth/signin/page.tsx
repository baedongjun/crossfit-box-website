"use client"

import { signIn } from "next-auth/react"
import { useTranslations } from "next-intl"

export default function SignIn() {
  const t = useTranslations("auth")

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">{t("signIn")}</h1>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-64 mb-4"
      >
        {t("signInWithGoogle")}
      </button>
      <button
        onClick={() => signIn("kakao", { callbackUrl: "/" })}
        className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-64"
      >
        {t("signInWithKakao")}
      </button>
    </div>
  )
}

