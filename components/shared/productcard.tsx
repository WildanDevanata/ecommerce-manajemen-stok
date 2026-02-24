'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FiShoppingCart, FiHeart, FiStar } from "react-icons/fi"
import { HiSparkles } from "react-icons/hi"

type ProductProps = {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating: number
  sold: number
  discount?: number
  stock?: number
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  rating,
  sold,
  discount,
  stock = 10,
}: ProductProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const discountedPrice = discount ? price - (price * discount / 100) : price
  const isLowStock = stock < 5

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {discount && (
          <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
            <HiSparkles className="w-3 h-3" />
            -{discount}%
          </span>
        )}
        {isLowStock && (
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            Stok Terbatas!
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className={`
          absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110
          ${isWishlisted 
            ? 'bg-red-500 text-white shadow-lg' 
            : 'bg-white/90 text-gray-700 hover:bg-red-50'
          }
        `}
      >
        <FiHeart 
          className={`w-5 h-5 transition-all ${isWishlisted ? 'fill-current' : ''}`} 
        />
      </button>

      {/* Image */}
      <Link href={`/products/${id}`}>
        <div className="relative h-64 w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          
          {/* Gradient Overlay on Hover */}
          <div className={`
            absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `} />
          
          {/* Quick Add Button on Hover */}
          <div className={`
            absolute bottom-4 left-4 right-4 transform transition-all duration-300
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            <button className="w-full bg-white text-gray-900 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-colors shadow-xl">
              <FiShoppingCart className="w-5 h-5" />
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Category */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1.5 rounded-full">
            {category}
          </span>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-semibold text-gray-700">{rating}</span>
          </div>
        </div>

        {/* Product Name */}
        <Link href={`/products/${id}`}>
          <h3 className="font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors min-h-[3rem]">
            {name}
          </h3>
        </Link>

        {/* Stats */}
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>{sold} terjual</span>
          </div>
          {stock && (
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isLowStock ? 'bg-orange-500' : 'bg-blue-500'}`} />
              <span>Stok: {stock}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="pt-3 border-t border-gray-100">
          {discount ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 line-through">
                  Rp {price.toLocaleString("id-ID")}
                </span>
              </div>
              <p className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Rp {discountedPrice.toLocaleString("id-ID")}
              </p>
              <p className="text-xs text-green-600 font-semibold">
                Hemat Rp {(price - discountedPrice).toLocaleString("id-ID")}
              </p>
            </div>
          ) : (
            <p className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Rp {price.toLocaleString("id-ID")}
            </p>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className={`
        absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl" />
      </div>
    </div>
  )
}