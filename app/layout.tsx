import "./globals.css"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { getCsrfToken } from "next-auth/react"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CrossFit Box",
  description: "Welcome to our CrossFit Box",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const csrfToken = await getCsrfToken()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="container mx-auto px-4 py-8">{children}</main>
        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.csrfToken = "${csrfToken}";`,
          }}
        />
      </body>
    </html>
  )
}

