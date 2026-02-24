import Container from "./container"
import Link from "next/link"
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi"
import { HiSparkles } from "react-icons/hi"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-20">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0 transform rotate-180">
        <svg className="w-full h-16 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      <Container>
        <div className="pt-24 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-50" />
                  <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-2 rounded-xl">
                    <span className="text-2xl">🥛</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Toko Susu Kita</h3>
                  <p className="text-xs flex items-center gap-1">
                    <HiSparkles className="text-yellow-400" />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Susu Segar Berkualitas
                    </span>
                  </p>
                </div>
              </div>
              
              <p className="text-sm leading-relaxed">
                Menyediakan susu segar berkualitas premium dengan harga terjangkau untuk keluarga Indonesia sejak 2020.
              </p>

              {/* Social Media */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-white">Follow Us</p>
                <div className="flex gap-3">
                  <a 
                    href="https://facebook.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-gray-800 hover:bg-blue-600 rounded-xl transition-all transform hover:scale-110"
                  >
                    <FiFacebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-xl transition-all transform hover:scale-110"
                  >
                    <FiInstagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-gray-800 hover:bg-blue-400 rounded-xl transition-all transform hover:scale-110"
                  >
                    <FiTwitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                  <a 
                    href="https://youtube.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-gray-800 hover:bg-red-600 rounded-xl transition-all transform hover:scale-110"
                  >
                    <FiYoutube className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/products" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    Semua Produk
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    Kategori
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    Hubungi Kami
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Customer Service</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/account" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    Akun Saya
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    Lacak Pesanan
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    Info Pengiriman
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    Kebijakan Pengembalian
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    Kebijakan Privasi
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Hubungi Kami</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-blue-600 transition-colors">
                    <FiMapPin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Alamat</p>
                    <p className="text-sm leading-relaxed">
                      Jl. Raya Magetan No. 123<br />
                      Magetan, Jawa Timur 63319
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-green-600 transition-colors">
                    <FiPhone className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Telepon</p>
                    <a href="tel:+6281234567890" className="text-sm hover:text-blue-400 transition-colors">
                      +62 812-3456-7890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-purple-600 transition-colors">
                    <FiMail className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Email</p>
                    <a href="mailto:info@tokosusu.com" className="text-sm hover:text-blue-400 transition-colors">
                      info@tokosusu.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} <span className="font-semibold text-white">Toko Susu Kita</span>. All rights reserved.
              </p>
              
              <div className="flex items-center gap-6">
                <Link href="/terms" className="text-sm hover:text-blue-400 transition-colors">
                  Syarat & Ketentuan
                </Link>
                <Link href="/privacy" className="text-sm hover:text-blue-400 transition-colors">
                  Kebijakan Privasi
                </Link>
              </div>
            </div>

            {/* Made with love */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                Made with <span className="text-red-500 animate-pulse">❤️</span> by 
                <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Wildan Devanata Rizkyvianto
                </span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}