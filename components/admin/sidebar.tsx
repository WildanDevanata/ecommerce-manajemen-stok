"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const menus = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Produk", href: "/admin/products" },
  { name: "Manajemen Stok", href: "/admin/stock" },
  { name: "Transaksi", href: "/admin/transactions" },
  { name: "Laporan Penjualan", href: "/admin/reports" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r p-5">
      <h1 className="text-xl font-bold mb-8">
        🛒 E-Commerce
      </h1>

      <nav className="space-y-2">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className={`block p-2 rounded-lg ${
              pathname === menu.href
                ? "bg-gray-200 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            {menu.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}