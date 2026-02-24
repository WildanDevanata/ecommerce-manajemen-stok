'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch } from "react-icons/fi"
import { HiSparkles } from "react-icons/hi"
import Container from "./container"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartItemsCount = 3 // Example, bisa dari state management

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
        : 'bg-white border-b border-gray-100'
      }
    `}>
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition" />
              <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-2 rounded-xl">
                <span className="text-2xl">🥛</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Toko Susu Kita
              </h1>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <HiSparkles className="text-yellow-400" />
                Susu Segar Berkualitas
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link 
              href="/products" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
            >
              Produk
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link 
              href="/categories" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
            >
              Kategori
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
            >
              Tentang
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search Button */}
            <button 
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors group"
            >
              <FiSearch className="text-gray-600 group-hover:text-blue-600 transition-colors" />
              <span className="text-sm text-gray-600">Cari...</span>
            </button>

            {/* Cart */}
            <Link 
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group"
            >
              <FiShoppingCart className="text-gray-700 w-6 h-6 group-hover:text-blue-600 transition-colors" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <Link
              href="/signin"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FiUser className="w-4 h-4" />
              Login
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6 text-gray-700" />
              ) : (
                <FiMenu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-slide-down">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Produk
              </Link>
              <Link 
                href="/categories" 
                className="px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kategori
              </Link>
              <Link 
                href="/about" 
                className="px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tentang
              </Link>
              <Link
                href="/auth/login"
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login / Daftar
              </Link>
            </div>
          </div>
        )}
      </Container>
    </nav>
  )
}