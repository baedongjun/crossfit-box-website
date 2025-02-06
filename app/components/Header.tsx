"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import LanguageSelector from "./LanguageSelector"
import { useSession, signOut } from "next-auth/react"

export default function Header() {
  const t = useTranslations("nav")
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            {t("title")}
          </Link>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul
            className={`md:flex md:space-x-4 md:items-center ${isMenuOpen ? "block" : "hidden"} absolute md:relative top-full left-0 right-0 bg-gray-800 md:bg-transparent`}
          >
            <li>
              <Link href="/" className="block py-2 md:py-0">
                {t("home")}
              </Link>
            </li>
            <li>
              <Link href="/reservation" className="block py-2 md:py-0">
                {t("reservation")}
              </Link>
            </li>
            <li>
              <Link href="/drop-in" className="block py-2 md:py-0">
                {t("dropIn")}
              </Link>
            </li>
            <li>
              <Link href="/diet-project" className="block py-2 md:py-0">
                {t("dietProject")}
              </Link>
            </li>
            {session ? (
              <>
                <li className="block py-2 md:py-0">{session.user?.name}</li>
                <li>
                  <button onClick={() => signOut()} className="block py-2 md:py-0">
                    {t("signOut")}
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/auth/signin" className="block py-2 md:py-0">
                  {t("signIn")}
                </Link>
              </li>
            )}
            <li>
              <LanguageSelector />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

