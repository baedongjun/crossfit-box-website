import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

const prisma = new PrismaClient()

const profileSchema = z.object({
  name: z.string().min(2),
  bio: z.string().max(500).optional(),
  dateOfBirth: z.string().optional(),
  weight: z.number().positive().optional(),
  height: z.number().positive().optional(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const name = formData.get("name") as string
    const bio = formData.get("bio") as string
    const dateOfBirth = formData.get("dateOfBirth") as string
    const weight = Number.parseFloat(formData.get("weight") as string)
    const height = Number.parseFloat(formData.get("height") as string)
    const image = formData.get("image") as File | null

    const validatedData = profileSchema.parse({
      name,
      bio,
      dateOfBirth,
      weight,
      height,
    })

    let imageUrl = session.user?.image

    if (image) {
      // 이미지 업로드 로직 (생략)
      imageUrl = "/path/to/uploaded/image.jpg"
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user?.email! },
      data: {
        name: validatedData.name,
        image: imageUrl,
        profile: {
          upsert: {
            create: {
              bio: validatedData.bio,
              dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : undefined,
              weight: validatedData.weight,
              height: validatedData.height,
            },
            update: {
              bio: validatedData.bio,
              dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : undefined,
              weight: validatedData.weight,
              height: validatedData.height,
            },
          },
        },
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

