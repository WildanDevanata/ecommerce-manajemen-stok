import { prisma } from '@/lib/prisma'
import ProductsClient from './productsClient'
import { Product } from '@prisma/client'

export default async function ProductsPage() {

  const productsRaw = await prisma.product.findMany({
    where: { isActive: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  })

  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' }
  })

  const products = productsRaw.map((p: Product & { category: any }) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    image: p.images?.[0] || '/images/placeholder.png',
    category: p.category.name,
    categorySlug: p.category.slug,
    rating: Number(p.rating),
    sold: p.sold,
    discount: p.discount ?? 0,
    stock: p.stock
  }))

  return (
    <ProductsClient
      products={products}
      categories={categories}
    />
  )
}