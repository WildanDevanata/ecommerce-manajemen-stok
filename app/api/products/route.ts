import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {

  const products = await prisma.product.findMany({
    include: {
      category: true
    }
  })

  const formatted = products.map((p) => ({
    id: p.id,
    sku: p.sku,
    name: p.name,
    category: p.category?.name ?? "-",
    price: p.price,
    stock: p.stock,
    image: "🥛"
  }))

  return NextResponse.json(formatted)
}