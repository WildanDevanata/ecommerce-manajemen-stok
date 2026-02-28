import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import Container from '@/components/shared/container'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

const categories = [
  {
    id: 'susu-segar',
    name: 'Susu Segar',
    icon: '🥛',
    description: 'Susu segar langsung dari peternakan pilihan dengan kualitas terbaik',
    productCount: 15,
    gradient: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50',
  },
  {
    id: 'susu-uht',
    name: 'Susu UHT',
    icon: '📦',
    description: 'Susu ultra high temperature dengan berbagai varian rasa',
    productCount: 24,
    gradient: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50',
  },
  {
    id: 'yogurt',
    name: 'Yogurt',
    icon: '🥄',
    description: 'Yogurt sehat dengan probiotik untuk pencernaan yang lebih baik',
    productCount: 18,
    gradient: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50',
  },
  {
    id: 'keju',
    name: 'Keju',
    icon: '🧀',
    description: 'Berbagai jenis keju berkualitas untuk kebutuhan masakan Anda',
    productCount: 12,
    gradient: 'from-orange-500 to-amber-500',
    bgColor: 'from-orange-50 to-amber-50',
  },
  {
    id: 'susu-formula',
    name: 'Susu Formula',
    icon: '🍼',
    description: 'Susu formula dengan nutrisi lengkap untuk tumbuh kembang bayi',
    productCount: 20,
    gradient: 'from-pink-500 to-rose-500',
    bgColor: 'from-pink-50 to-rose-50',
  },
  {
    id: 'minuman-susu',
    name: 'Minuman Susu',
    icon: '🥤',
    description: 'Minuman susu siap minum dengan berbagai varian rasa',
    productCount: 16,
    gradient: 'from-indigo-500 to-purple-500',
    bgColor: 'from-indigo-50 to-purple-50',
  },
]

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-32 pb-12">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Kategori Produk
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Temukan produk yang Anda butuhkan dengan mudah melalui kategori-kategori pilihan kami
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-16">
          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className="mb-6 inline-block">
                    <div className={`w-20 h-20 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center text-4xl transform group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Product Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500">
                      {category.productCount} Produk
                    </span>
                    
                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                      <span>Lihat Produk</span>
                      <FiArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tidak Menemukan Kategori yang Dicari?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Hubungi customer service kami untuk bantuan menemukan produk yang Anda butuhkan
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Hubungi Kami
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  )
}
