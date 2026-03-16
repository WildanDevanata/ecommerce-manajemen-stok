import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json([])
  }

  const cart = await prisma.cart.findFirst({
    where: {
      user: {
        email: session.user.email,
      },
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!cart) return NextResponse.json([])

  const items = cart.items.map((item) => ({
    id: item.id,
    name: item.product.name,
    price: item.product.price,
    image: item.product.images?.[0] ?? '/images/products/default.jpg',
    quantity: item.quantity,
    stock: item.product.stock,
  }))

  return NextResponse.json(items)
}

export async function POST(req: Request) {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { productId } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  // Cari cart user
  let cart = await prisma.cart.findFirst({
    where: { userId: user.id }
  })

  // Jika belum ada cart → buat
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId: user.id
      }
    })
  }

  // Cari item yang sama di cart
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId: productId
    }
  })

  // Jika sudah ada → tambah quantity
  if (existingItem) {
    await prisma.cartItem.update({
      where: {
        id: existingItem.id
      },
      data: {
        quantity: existingItem.quantity + 1
      }
    })
  } 
  // Jika belum ada → buat item baru
  else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: productId,
        quantity: 1
      }
    })
  }

  return NextResponse.json({ success: true })
}