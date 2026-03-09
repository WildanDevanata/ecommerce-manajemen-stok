'use client'
import { prisma } from '@/lib/prisma' 
import ProductCard from './productcard'
import Container from "./container"
import { FiPackage, FiTruck, FiAward } from 'react-icons/fi'
import PopularProductsClient from '../landing/popularproductsclient'

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      include: {
        category: true,
      },
      orderBy: {
        sold: 'desc',
      },
      take: 8,
    })

    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.images[0] || '/images/placeholder.jpg',
      category: product.category.name,
      rating: Number(product.rating),
      sold: product.sold,
      discount: product.discount || 0,
      stock: product.stock,
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return [
      { id: 'all', name: 'Semua Produk', icon: '🛍️' },
      ...categories.map(cat => ({
        id: cat.slug,
        name: cat.name,
        icon: cat.icon || '📦',
      })),
    ]
  } catch (error) {
    console.error('Error fetching categories:', error)
    return [{ id: 'all', name: 'Semua Produk', icon: '🛍️' }]
  }
}

export default async function PopularProducts() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  return (
    <Container>
      <div className="py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-full shadow-sm mb-4">
            <span className="text-blue-600 font-semibold text-sm">Trending Now</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Produk <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Terpopuler</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Produk terlaris pilihan pelanggan kami
          </p>
        </div>

        {/* Client Component for interactivity */}
        <PopularProductsClient 
          initialProducts={products}
          categories={categories}
        />

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
            <FiPackage className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">100% Original</h3>
            <p className="text-gray-600 text-sm">Semua produk dijamin keaslian dan kualitasnya</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <FiTruck className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Pengiriman Cepat</h3>
            <p className="text-gray-600 text-sm">Pesanan diproses dan dikirim dalam 24 jam</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <FiAward className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Harga Terbaik</h3>
            <p className="text-gray-600 text-sm">Harga kompetitif dengan kualitas premium</p>
          </div>
        </div>
      </div>
    </Container>
  )
}