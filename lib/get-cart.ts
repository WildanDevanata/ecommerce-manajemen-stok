import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function getCart() {
  const session = await auth()

  if (!session?.user?.email) return []

  const cart = await prisma.cart.findFirst({
    where: {
      user: {
        email: session.user.email
      }
    },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  })

  if (!cart) return []

  return cart.items.map((item) => ({
    id: item.id,
    name: item.product.name,
    price: item.product.price,
    image: item.product.images?.[0] || "/images/placeholder.png",
    quantity: item.quantity,
    stock: item.product.stock
  }))
}