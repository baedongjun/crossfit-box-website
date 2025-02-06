import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import ProfileForm from "../components/ProfileForm"
import PRRecordForm from "../components/PRRecordForm"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
    include: { profile: true, prRecords: true },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">프로필</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProfileForm user={user} />
        <PRRecordForm userId={user?.id!} prRecords={user?.prRecords || []} />
      </div>
    </div>
  )
}

