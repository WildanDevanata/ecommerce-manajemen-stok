'use client'

import { useState } from 'react'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import Container from '@/components/shared/container'
import Link from 'next/link'
import Image from 'next/image'
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi'

// Mock cart data
const initialCartItems = [
  {
    id: '1',
    name: 'Susu Segar Full Cream 1L',
    price: 25000,
    image: '/images/products/susu-segar-1l.jpg',
    quantity: 2,
    stock: 45,
  },
  {
    id: '2',
    name: 'Greek Yogurt Original 200ml',
    price: 15000,
    image: '/images/products/greek-yogurt.jpg',
    quantity: 3,
    stock: 30,
  },
  {
    id: '3',
    name: 'Keju Cheddar Premium 200gr',
    price: 35000,
    image: '/images/products/keju-cheddar.jpg',
    quantity: 1,
    stock: 4,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, Math.min(item.stock, item.quantity + delta))
          return { ...item, quantity: newQuantity }
        }
        return item
      })
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100000 ? 0 : 15000
  const total = subtotal + shipping

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
          <Container>
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiShoppingBag className="w-16 h-16 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Keranjang Belanja Kosong</h2>
              <p className="text-gray-600 mb-8">
                Belum ada produk di keranjang belanja Anda. Yuk mulai belanja!
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Mulai Belanja
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </Container>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-32 pb-12">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Keranjang Belanja
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              {cartItems.length} produk di keranjang Anda
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-600">
                    <div className="col-span-6">Produk</div>
                    <div className="col-span-2 text-center">Harga</div>
                    <div className="col-span-3 text-center">Jumlah</div>
                    <div className="col-span-1"></div>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Product Info */}
                        <div className="col-span-6 flex items-center gap-4">
                          <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-3xl">🥛</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-500">Stok: {item.stock}</p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 text-center">
                          <p className="font-semibold text-gray-900">{formatCurrency(item.price)}</p>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={item.quantity <= 1}
                              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <FiMinus className="w-4 h-4 text-gray-600" />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              readOnly
                              className="w-16 text-center py-2 border border-gray-300 rounded-lg font-semibold"
                            />
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              disabled={item.quantity >= item.stock}
                              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <FiPlus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>

                        {/* Delete */}
                        <div className="col-span-1 text-right">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="mt-4 text-right">
                        <span className="text-sm text-gray-600">Subtotal: </span>
                        <span className="font-bold text-gray-900 text-lg">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link
                  href="/products"
                  className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
                >
                  ← Lanjut Belanja
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Pengiriman</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">GRATIS</span>
                      ) : (
                        formatCurrency(shipping)
                      )}
                    </span>
                  </div>
                  
                  {subtotal < 100000 && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-blue-700">
                        Belanja {formatCurrency(100000 - subtotal)} lagi untuk gratis ongkir!
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Lanjut ke Pembayaran
                  <FiArrowRight className="w-5 h-5" />
                </Link>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Pembayaran Aman</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Garansi Uang Kembali</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Produk 100% Original</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  )
}
