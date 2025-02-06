import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

const prisma = new PrismaClient()

const prRecordSchema = z.object({
  userId: z.string(),
  exercise: z.string().min(2),
  weight: z.number().positive(),
  reps: z.number().positive(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = prRecordSchema.parse(body)

    const newPRRecord = await prisma.pRRecord.create({
      data: {
        userId: validatedData.userId,
        exercise: validatedData.exercise,
        weight: validatedData.weight,
        reps: validatedData.reps,
        date: new Date(),
      },
    })

    return NextResponse.json(newPRRecord)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

