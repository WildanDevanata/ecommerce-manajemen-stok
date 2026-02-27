'use client'

import { useState } from 'react'
import StatsCard from '@/components/admin/statcard'
import { FiPackage, FiAlertTriangle, FiTrendingUp, FiPlus } from 'react-icons/fi'

const stockData = [
  {
    sku: 'ELK-001',
    name: 'Smartphone XYZ Pro',
    currentStock: 25,
    minStock: 10,
    status: 'Normal',
  },
  {
    sku: 'ELK-002',
    name: 'Laptop ABC Gaming',
    currentStock: 15,
    minStock: 10,
    status: 'Normal',
  },
  {
    sku: 'AKS-001',
    name: 'Wireless Mouse',
    currentStock: 8,
    minStock: 10,
    status: 'Rendah',
  },
  {
    sku: 'AKS-002',
    name: 'Power Bank 20000mAh',
    currentStock: 5,
    minStock: 15,
    status: 'Kritis',
  },
  {
    sku: 'AKS-003',
    name: 'USB Cable Type-C',
    currentStock: 12,
    minStock: 20,
    status: 'Rendah',
  },
]

export default function StockManagementPage() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'history'>('inventory')

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')} Jt`
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      Normal: 'bg-green-100 text-green-700',
      Rendah: 'bg-orange-100 text-orange-700 flex items-center gap-1',
      Kritis: 'bg-red-100 text-red-700 flex items-center gap-1',
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles]}`}>
        {(status === 'Rendah' || status === 'Kritis') && <FiAlertTriangle className="w-3 h-3" />}
        {status}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Stok</h1>
        <p className="text-gray-600 mt-1">Kelola inventori dan stok produk secara real-time</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Produk"
          value="5"
          icon={<FiPackage className="w-6 h-6 text-blue-600" />}
          iconBgColor="bg-blue-100"
        />
        <StatsCard
          title="Stok Menipis/Habis"
          value="3"
          icon={<FiAlertTriangle className="w-6 h-6 text-orange-600" />}
          iconBgColor="bg-orange-100"
        />
        <StatsCard
          title="Total Nilai Stok"
          value="Rp 125,4 Jt"
          icon={<FiTrendingUp className="w-6 h-6 text-green-600" />}
          iconBgColor="bg-green-100"
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex gap-8 px-6">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'inventory'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Inventori
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Riwayat Stok
            </button>
          </div>
        </div>

        {/* Table */}
        {activeTab === 'inventory' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Stok Produk</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      SKU
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Nama Produk
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Stok Saat Ini
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Stok Minimum
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stockData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{item.sku}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{item.name}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {item.currentStock} unit
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{item.minStock} unit</td>
                      <td className="px-4 py-4">{getStatusBadge(item.status)}</td>
                      <td className="px-4 py-4">
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                          <FiPlus className="w-4 h-4" />
                          Restock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="p-6">
            <div className="text-center py-12">
              <p className="text-gray-500">Riwayat stok akan ditampilkan di sini</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
