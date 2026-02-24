'use client'

import { useState } from "react"
import Container from "../shared/container"
import ProductCard from "../shared/productcard"
import { FiChevronRight, FiTrendingUp } from "react-icons/fi"
import { HiSparkles } from "react-icons/hi"
import Link from "next/link"

const categories = [
  { id: 'all', name: 'Semua Produk', icon: '🥛' },
  { id: 'fresh', name: 'Susu Segar', icon: '🥛' },
  { id: 'uht', name: 'Susu UHT', icon: '📦' },
  { id: 'yogurt', name: 'Yogurt', icon: '🥄' },
  { id: 'cheese', name: 'Keju', icon: '🧀' },
]

const products = [
  {
    id: "1",
    name: "Susu Segar Full Cream 1L",
    price: 25000,
    image: "/images/products/susu-segar-1l.jpg",
    category: "Susu Segar",
    rating: 4.9,
    sold: 328,
    discount: 15,
    stock: 45,
  },
  {
    id: "2",
    name: "Susu UHT Cokelat 250ml",
    price: 8000,
    image: "/images/products/uht-coklat.jpg",
    category: "Susu UHT",
    rating: 4.8,
    sold: 567,
    discount: 10,
    stock: 120,
  },
  {
    id: "3",
    name: "Greek Yogurt Original 200ml",
    price: 15000,
    image: "/images/products/greek-yogurt.jpg",
    category: "Yogurt",
    rating: 4.7,
    sold: 234,
    stock: 30,
  },
  {
    id: "4",
    name: "Keju Cheddar Premium 200gr",
    price: 35000,
    image: "/images/products/keju-cheddar.jpg",
    category: "Keju",
    rating: 4.9,
    sold: 189,
    discount: 20,
    stock: 4,
  },
  {
    id: "5",
    name: "Susu Segar Low Fat 1L",
    price: 28000,
    image: "/images/products/susu-segar-lowfat.jpg",
    category: "Susu Segar",
    rating: 4.6,
    sold: 412,
    stock: 67,
  },
  {
    id: "6",
    name: "Yogurt Rasa Buah 150ml",
    price: 12000,
    image: "/images/products/yogurt-buah.jpg",
    category: "Yogurt",
    rating: 4.8,
    sold: 523,
    discount: 5,
    stock: 88,
  },
  {
    id: "7",
    name: "Susu UHT Strawberry 250ml",
    price: 8000,
    image: "/images/products/uht-strawberry.jpg",
    category: "Susu UHT",
    rating: 4.7,
    sold: 445,
    stock: 95,
  },
  {
    id: "8",
    name: "Keju Mozarella 250gr",
    price: 42000,
    image: "/images/products/keju-mozarella.jpg",
    category: "Keju",
    rating: 4.9,
    sold: 156,
    discount: 15,
    stock: 3,
  },
]

export default function PopularProducts() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category.toLowerCase().includes(activeCategory))

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />

      <Container>
        {/* Header */}
        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-full mb-6">
            <FiTrendingUp className="text-blue-600 w-5 h-5" />
            <span className="text-sm font-semibold text-blue-700">Trending Now</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Produk Terlaris
            </span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Jelajahi produk terbaik dengan kualitas premium yang paling disukai pelanggan
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                group relative px-6 py-3 rounded-2xl font-semibold transition-all transform hover:scale-105
                ${activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                }
              `}
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">{category.icon}</span>
                {category.name}
              </span>
              
              {activeCategory === category.id && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 blur-xl opacity-50 -z-10" />
              )}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12 animate-fade-in">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            Lihat Semua Produk
            <FiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">100% Original</h3>
            <p className="text-gray-600 text-sm">Semua produk dijamin keasliannya langsung dari produsen terpercaya</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Pengiriman Cepat</h3>
            <p className="text-gray-600 text-sm">Pesanan diproses dan dikirim dalam 24 jam ke seluruh Indonesia</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Harga Terbaik</h3>
            <p className="text-gray-600 text-sm">Dapatkan penawaran harga terbaik dan promo menarik setiap hari</p>
          </div>
        </div>
      </Container>
    </section>
  )
}