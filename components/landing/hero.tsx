'use client'

import Container from "../shared/container"
import Link from "next/link"
import { FiArrowRight, FiShoppingBag, FiTruck, FiAward } from "react-icons/fi"
import { HiSparkles } from "react-icons/hi"

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <Container>
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-lg">
              <HiSparkles className="text-yellow-500 w-5 h-5 animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                #1 Toko Susu Terpercaya di Magetan
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center space-y-6 animate-slide-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Susu Segar
              </span>
              <br />
              <span className="text-gray-900">
                Berkualitas Premium
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Pesan susu favoritmu dengan mudah dan cepat. 
              <span className="font-semibold text-gray-900"> Gratis ongkir</span> untuk pembelian minimal Rp 100.000
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/products"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-3"
              >
                <FiShoppingBag className="w-6 h-6" />
                Belanja Sekarang
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
              </Link>

              <Link
                href="/about"
                className="px-8 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-900 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 animate-fade-in-up animation-delay-200">
            {/* Stat 1 */}
            <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 text-center hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-4">
                <FiShoppingBag className="w-7 h-7 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">1000+</p>
              <p className="text-gray-600 font-medium">Produk Tersedia</p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 text-center hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mb-4">
                <FiTruck className="w-7 h-7 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">24 Jam</p>
              <p className="text-gray-600 font-medium">Pengiriman Cepat</p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 text-center hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl mb-4">
                <FiAward className="w-7 h-7 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">100%</p>
              <p className="text-gray-600 font-medium">Kualitas Terjamin</p>
            </div>
          </div>

          {/* Trusted By */}
          <div className="mt-16 text-center animate-fade-in animation-delay-400">
            <p className="text-sm text-gray-500 font-medium mb-6">
              Dipercaya oleh 10.000+ pelanggan di seluruh Indonesia
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              <div className="text-2xl font-bold text-gray-400">BPOM ✓</div>
              <div className="text-2xl font-bold text-gray-400">HALAL ✓</div>
              <div className="text-2xl font-bold text-gray-400">SNI ✓</div>
              <div className="text-2xl font-bold text-gray-400">ISO ✓</div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  )
}