'use client'

import { useState } from "react"
import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"
import Container from "@/components/shared/container"
import Link from "next/link"
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from "react-icons/fi"

export default function CartClient({ initialCartItems }: any) {

  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items: any) =>
      items.map((item: any) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, Math.min(item.stock, item.quantity + delta))
          return { ...item, quantity: newQuantity }
        }
        return item
      })
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items: any) => items.filter((item: any) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100000 ? 0 : 15000
  const total = subtotal + shipping

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`
  }

  // ⬇️ UI kamu tetap sama persis di bawah ini
}