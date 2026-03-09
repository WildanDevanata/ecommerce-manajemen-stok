'use client'

import { useState } from 'react'
import ProductCard from '../shared/productcard'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating: number
  sold: number
  discount: number
  stock: number
}

interface Category {
  id: string
  name: string
  icon: string
}

interface Props {
  initialProducts: Product[]
  categories: Category[]
}

export default function PopularProductsClient({ initialProducts, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProducts = activeCategory === 'all'
    ? initialProducts
    : initialProducts.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === activeCategory)

  return (
    <>
      {/* Category Filter */}
      <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all
              ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }
            `}
          >
            <span className="text-xl">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada produk dalam kategori ini</p>
        </div>
      )}

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Lihat Semua Produk
          <FiArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </>
  )
}