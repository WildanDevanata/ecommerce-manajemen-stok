import { prisma } from "@/lib/prisma"
import { Prisma } from '@prisma/client' // ✅ Tambah ini
import { NextResponse } from "next/server"

export async function GET() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      sku: true,
      name: true,
      price: true,
      discount: true,
      stock: true,
      images: true,
      categoryId: true,
      category: { select: { name: true } }
    }
  })

  const formatted = products.map((p) => ({
    id: p.id,
    sku: p.sku,
    name: p.name,
    category: p.category?.name ?? "-",
    categoryId: p.categoryId,
    price: Number(p.price),
    discount: Number(p.discount ?? 0),
    stock: p.stock,
    image: "🥛",
  }))

  return NextResponse.json(formatted)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body.sku || !body.name || !body.categoryId) {
      return NextResponse.json(
        { message: "Data produk belum lengkap" },
        { status: 400 }
      )
    }

    const duplicateSku = await prisma.product.findUnique({
      where: { sku: body.sku }
    })

    if (duplicateSku) {
      return NextResponse.json(
        { message: "SKU sudah terdaftar" },
        { status: 409 }
      )
    }

    const duplicateName = await prisma.product.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive"
        }
      }
    })

    if (duplicateName) {
      return NextResponse.json(
        { message: "Nama produk sudah terdaftar" },
        { status: 409 }
      )
    }

    const category = await prisma.category.findUnique({
      where: { id: body.categoryId }
    })

    if (!category) {
      return NextResponse.json(
        { message: "Kategori tidak ditemukan" },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: body.name,
        sku: body.sku,
        price: new Prisma.Decimal(body.price),
        discount: Number(body.discount ?? 0),
        stock: Number(body.stock ?? 0),
        categoryId: body.categoryId,
        slug: body.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        images: body.images || [],
        isActive: true,
        weight: 0,
        minStock: 5,
        sold: 0,
        rating: new Prisma.Decimal(0)
      }
    })

    return NextResponse.json(product)
  } catch (error: any) {
    console.error("POST ERROR:", error)
    return NextResponse.json(
      { message: error.message || "Gagal create produk" },
      { status: 500 }
    )
  }
}