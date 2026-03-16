import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {

  const body = await req.json()

  const product = await prisma.product.update({
    where: {
      id: params.id
    },
    data: {
      name: body.name,
      sku: body.sku,
      price: Number(body.price),
      stock: Number(body.stock),
      slug: body.name.toLowerCase().replace(/\s+/g, "-"),
    }
  })

  return NextResponse.json(product)
}