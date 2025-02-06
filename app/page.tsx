import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import VideoHero from "./components/VideoHero"

export default function Home() {
  const t = useTranslations("home")

  return (
    <div className="space-y-8">
      <VideoHero />

      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t("welcome")}</h1>
        <p className="text-xl">{t("description")}</p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t("aboutUs")}</h2>
          <p>{t("aboutUsDescription")}</p>
        </div>
        <div className="relative h-64">
          <Image
            src="/placeholder.svg?height=300&width=400"
            alt="CrossFit Box"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">{t("readyToStart")}</h2>
        <div className="space-x-4">
          <Link href="/reservation" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            {t("makeReservation")}
          </Link>
          <Link href="/drop-in" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            {t("dropIn")}
          </Link>
        </div>
      </section>
    </div>
  )
}

