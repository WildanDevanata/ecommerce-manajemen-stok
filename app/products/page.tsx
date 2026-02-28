'use client'

import { useState } from 'react'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import ProductCard from '@/components/shared/productcard'
import Container from '@/components/shared/container'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'

const categories = [
  { id: 'all', name: 'Semua Produk' },
  { id: 'susu-segar', name: 'Susu Segar' },
  { id: 'susu-uht', name: 'Susu UHT' },
  { id: 'yogurt', name: 'Yogurt' },
  { id: 'keju', name: 'Keju' },
  { id: 'susu-formula', name: 'Susu Formula' },
]

const products = [
  {
    id: '1',
    name: 'Susu Segar Full Cream 1L',
    price: 25000,
    image: '/images/products/susu-segar-1l.jpg',
    category: 'Susu Segar',
    rating: 4.9,
    sold: 328,
    discount: 15,
    stock: 45,
  },
  {
    id: '2',
    name: 'Susu UHT Cokelat 250ml',
    price: 8000,
    image: '/images/products/uht-coklat.jpg',
    category: 'Susu UHT',
    rating: 4.8,
    sold: 567,
    discount: 10,
    stock: 120,
  },
  {
    id: '3',
    name: 'Greek Yogurt Original 200ml',
    price: 15000,
    image: '/images/products/greek-yogurt.jpg',
    category: 'Yogurt',
    rating: 4.7,
    sold: 234,
    stock: 30,
  },
  {
    id: '4',
    name: 'Keju Cheddar Premium 200gr',
    price: 35000,
    image: '/images/products/keju-cheddar.jpg',
    category: 'Keju',
    rating: 4.9,
    sold: 189,
    discount: 20,
    stock: 4,
  },
  {
    id: '5',
    name: 'Susu Segar Low Fat 1L',
    price: 28000,
    image: '/images/products/susu-segar-lowfat.jpg',
    category: 'Susu Segar',
    rating: 4.6,
    sold: 412,
    stock: 67,
  },
  {
    id: '6',
    name: 'Yogurt Rasa Buah 150ml',
    price: 12000,
    image: '/images/products/yogurt-buah.jpg',
    category: 'Yogurt',
    rating: 4.8,
    sold: 523,
    discount: 5,
    stock: 88,
  },
  {
    id: '7',
    name: 'Susu UHT Strawberry 250ml',
    price: 8000,
    image: '/images/products/uht-strawberry.jpg',
    category: 'Susu UHT',
    rating: 4.7,
    sold: 445,
    stock: 95,
  },
  {
    id: '8',
    name: 'Keju Mozarella 250gr',
    price: 42000,
    image: '/images/products/keju-mozarella.jpg',
    category: 'Keju',
    rating: 4.9,
    sold: 156,
    discount: 15,
    stock: 3,
  },
  {
    id: '9',
    name: 'Susu Formula Bayi 400gr',
    price: 125000,
    image: '/images/products/susu-formula.jpg',
    category: 'Susu Formula',
    rating: 4.8,
    sold: 278,
    stock: 25,
  },
]

const sortOptions = [
  { id: 'popular', name: 'Paling Populer' },
  { id: 'newest', name: 'Terbaru' },
  { id: 'price-low', name: 'Harga Terendah' },
  { id: 'price-high', name: 'Harga Tertinggi' },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSort, setSelectedSort] = useState('popular')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 150000 })
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <>
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-32 pb-12">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Semua Produk
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Temukan susu dan produk dairy terbaik untuk keluarga Anda
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12">
          {/* Search & Sort Bar */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <FiFilter className="w-5 h-5" />
              Filter
            </button>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside
              className={`
                ${showFilters ? 'block' : 'hidden'} md:block
                w-full md:w-64 flex-shrink-0
              `}
            >
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                {/* Mobile Close Button */}
                <div className="md:hidden flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Filter</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">Kategori</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`
                          w-full text-left px-4 py-2 rounded-lg transition-colors
                          ${
                            selectedCategory === category.id
                              ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }
                        `}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Harga</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-2 block">
                        Minimum: Rp {priceRange.min.toLocaleString('id-ID')}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="150000"
                        step="5000"
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange({ ...priceRange, min: parseInt(e.target.value) })
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-2 block">
                        Maximum: Rp {priceRange.max.toLocaleString('id-ID')}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="150000"
                        step="5000"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setPriceRange({ min: 0, max: 150000 })
                    setSearchQuery('')
                  }}
                  className="w-full mt-6 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Reset Filter
                </button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600">
                  Menampilkan <span className="font-semibold">{filteredProducts.length}</span> produk
                </p>
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Tidak ada produk yang ditemukan</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all')
                      setPriceRange({ min: 0, max: 150000 })
                      setSearchQuery('')
                    }}
                    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  )
}
