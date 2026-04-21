import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { Prisma } from '@prisma/client' // ✅ Tambah di atas!

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    
    // ✅ VALIDASI ID
    if (!params.id) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
    }
    
    console.log('PUT ID:', params.id, 'body:', body)

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        sku: body.sku,
        price: new Prisma.Decimal(body.price), // Import Prisma!
        discount: Number(body.discount ?? 0),
        stock: Number(body.stock ?? 0),
        categoryId: body.categoryId,
        slug: body.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ''),
      }
    })

    return NextResponse.json(product)
  } catch (error: any) {
    console.error('PUT Error:', error)
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log('🗑️ params.id:', params.id)

  if (!params.id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 })
  }

  try {
    await prisma.product.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('❌ Prisma error:', error)

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
