import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// Helper function untuk slug
const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// --- UPDATE (PUT) ---
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // Tambahkan Promise di sini
) {
  try {
    const { id } = await params // WAJIB di-await
    const body = await req.json()
    const { name } = body

    if (!name) {
      return NextResponse.json({ message: "Nama wajib diisi" }, { status: 400 })
    }

    const slug = slugify(name)

    // Cek duplikasi slug pada id lain
    const existing = await prisma.category.findFirst({
      where: {
        slug,
        NOT: { id: id }
      }
    })

    if (existing) {
      return NextResponse.json({ message: "Nama kategori sudah digunakan" }, { status: 400 })
    }

    const updated = await prisma.category.update({
      where: { id },
      data: { name, slug }
    })

    return NextResponse.json(updated)
  } catch (error: any) {
    console.error("PUT_ERROR:", error)
    return NextResponse.json({ message: "Gagal update kategori" }, { status: 500 })
  }
}

// --- DELETE ---
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // Tambahkan Promise di sini
) {
  try {
    const { id } = await params // WAJIB di-await

    // Cek apakah kategori ada
    const category = await prisma.category.findUnique({
      where: { id }
    })

    if (!category) {
      return NextResponse.json({ message: "Kategori tidak ditemukan" }, { status: 404 })
    }

    await prisma.category.delete({
      where: { id }
    })

    return NextResponse.json({ message: "Berhasil menghapus kategori" })
  } catch (error: any) {
    console.error("DELETE_ERROR:", error)
    return NextResponse.json(
      { message: "Gagal menghapus kategori. Kategori mungkin masih digunakan oleh produk." },
      { status: 500 }
    )
  }
}