import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

/* =======================
   UPDATE PRODUCT
======================= */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await req.json()

    console.log("PUT ID:", id)

    if (!id) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 })
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        sku: body.sku,
        price: new Prisma.Decimal(body.price),
        discount: Number(body.discount ?? 0),
        stock: Number(body.stock ?? 0),
        categoryId: body.categoryId,
        slug: body.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      },
    })

    return NextResponse.json(product)
  } catch (error: any) {
    console.error("PUT Error:", error)

    return NextResponse.json(
      { message: error.message || "Gagal update produk" },
      { status: 500 }
    )
  }
}

/* =======================
   DELETE PRODUCT
======================= */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    console.log("DELETE ID:", id)

    if (!id || id === "undefined") {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 })
    }

    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({
      message: "Produk berhasil dihapus",
    })
  } catch (error: any) {
    console.error("DELETE Error:", error)

    return NextResponse.json(
      { message: error.message || "Gagal hapus" },
      { status: 500 }
    )
  }
}
