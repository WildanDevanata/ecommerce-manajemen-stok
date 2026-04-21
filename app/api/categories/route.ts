import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true
      }
    })
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json([], { status: 200 }) // Return empty array jika error
  }
}