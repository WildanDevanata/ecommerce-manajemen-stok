'use client'

import { useState } from 'react'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import ProductCard from '@/components/shared/productcard'
import Container from '@/components/shared/container'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  categorySlug: string
  rating: number
  sold: number
  discount?: number
  stock: number
}

interface Category {
  id: string
  name: string
  slug: string
}

const sortOptions = [
  { id: 'popular', name: 'Paling Populer' },
  { id: 'newest', name: 'Terbaru' },
  { id: 'price-low', name: 'Harga Terendah' },
  { id: 'price-high', name: 'Harga Tertinggi' },
]

export default function ProductsClient({
  products = [],
  categories = []
}: {
  products: Product[]
  categories: Category[]
}) {

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSort, setSelectedSort] = useState('popular')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 150000 })
  const [showFilters, setShowFilters] = useState(false)

  // FILTER
  let filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === 'all' ||
      product.categorySlug === selectedCategory

    const matchesPrice =
      product.price >= priceRange.min &&
      product.price <= priceRange.max

    return matchesSearch && matchesCategory && matchesPrice
  })

  // SORT
  filteredProducts = filteredProducts.sort((a, b) => {

    switch (selectedSort) {

      case 'popular':
        return b.sold - a.sold

      case 'price-low':
        return a.price - b.price

      case 'price-high':
        return b.price - a.price

      default:
        return 0
    }

  })

  const categoriesWithAll = [
    { id: 'all', name: 'Semua Produk', slug: 'all' },
    ...categories
  ]

  return (
    <>
      <Navbar />

      {/* Header */}
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

          {/* SEARCH & SORT */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">

            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-xl"
            >
              <FiFilter />
              Filter
            </button>

          </div>

          <div className="flex gap-8">

            {/* SIDEBAR */}
            <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64`}>
              <div className="bg-white border rounded-xl p-6 sticky top-24">

                <div className="md:hidden flex justify-between mb-4">
                  <h3 className="font-bold">Filter</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <FiX />
                  </button>
                </div>

                {/* CATEGORY */}
                <div className="mb-6">
                  <h3 className="font-bold mb-4">Kategori</h3>

                  <div className="space-y-2">

                    {categoriesWithAll.map((category) => (

                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.slug)}
                        className={`w-full text-left px-4 py-2 rounded-lg
                          ${selectedCategory === category.slug
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'hover:bg-gray-50'}
                        `}
                      >
                        {category.name}
                      </button>

                    ))}

                  </div>
                </div>

                {/* PRICE RANGE */}
                <div>

                  <h3 className="font-bold mb-4">Harga</h3>

                  <div className="space-y-4">

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">
                        Minimum: Rp {priceRange.min.toLocaleString('id-ID')}
                      </label>

                      <input
                        type="range"
                        min="0"
                        max="150000"
                        step="5000"
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            min: Number(e.target.value)
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">
                        Maximum: Rp {priceRange.max.toLocaleString('id-ID')}
                      </label>

                      <input
                        type="range"
                        min="0"
                        max="150000"
                        step="5000"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            max: Number(e.target.value)
                          })
                        }
                        className="w-full"
                      />
                    </div>

                  </div>

                </div>

              </div>
            </aside>

            {/* PRODUCTS GRID */}
            <div className="flex-1">

              <div className="mb-6 text-gray-600">
                Menampilkan <b>{filteredProducts.length}</b> produk
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredProducts.map((product) => {

                  const discountedPrice = product.discount
                    ? product.price - (product.price * product.discount) / 100
                    : product.price

                  return (

                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      discountedPrice={discountedPrice}
                      discount={product.discount}
                      image={product.image}
                      rating={product.rating}
                      sold={product.sold}
                      stock={product.stock}
                    />

                  )

                })}

              </div>

            </div>

          </div>

        </div>
      </Container>

      <Footer />
    </>
  )
}