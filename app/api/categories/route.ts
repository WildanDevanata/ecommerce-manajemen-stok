import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// Fungsi pembantu untuk membuat slug
const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name } = body

    if (!name) {
      return NextResponse.json({ message: "Nama kategori wajib diisi" }, { status: 400 })
    }

    const slug = slugify(name)

    // Cek apakah slug sudah ada (karena slug bersifat unik)
    const existingSlug = await prisma.category.findUnique({
      where: { slug }
    })

    if (existingSlug) {
      return NextResponse.json(
        { message: "Kategori dengan nama serupa sudah ada (duplikasi slug)" },
        { status: 400 }
      )
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
        slug,
        isActive: true, // Nilai default sesuai schema
      }
    })

    return NextResponse.json(newCategory, { status: 201 })
  } catch (error: any) {
    console.error("ERROR_POST_CATEGORY:", error)
    return NextResponse.json(
      { message: "Gagal menyimpan kategori ke database" },
      { status: 500 }
    )
  }
}

// GET tetap sama seperti sebelumnya
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json([], { status: 200 })
  }
}