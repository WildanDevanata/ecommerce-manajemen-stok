'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  FiShoppingBag,
  FiGrid,
  FiPackage,
  FiShoppingCart,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from 'react-icons/fi'

const menuItems = [
  {
    title: 'Menu Utama',
    items: [
      { icon: FiGrid, label: 'Dashboard', href: '/admin' },
      { icon: FiShoppingBag, label: 'Produk', href: '/admin/products' },
      { icon: FiPackage, label: 'Manajemen Stok', href: '/admin/stock' },
      { icon: FiShoppingCart, label: 'Transaksi', href: '/admin/transactions' },
      { icon: FiBarChart2, label: 'Laporan Penjualan', href: '/admin/reports' },
    ],
  },
  {
    title: 'Pengaturan',
    items: [
      { icon: FiSettings, label: 'Pengaturan', href: '/admin/settings' },
    ],
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <FiShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">E-Commerce</h1>
              <p className="text-xs text-gray-500">Manajemen Stok</p>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((section, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="px-6 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {section.title}
                </h3>
                <div className="space-y-1 px-3">
                  {section.items.map((item, itemIdx) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={itemIdx}
                        href={item.href}
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                          ${
                            isActive
                              ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                              : 'text-gray-700 hover:bg-gray-50'
                          }
                        `}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}

            {/* Logout */}
            <div className="px-3 mt-auto">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <FiLogOut className="w-5 h-5" />
                Keluar
              </button>
            </div>
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-600">AU</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? (
                <FiX className="w-6 h-6 text-gray-600" />
              ) : (
                <FiMenu className="w-6 h-6 text-gray-600" />
              )}
            </button>

            <div className="flex-1 lg:flex-none">
              {/* Breadcrumb or page title can go here */}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
