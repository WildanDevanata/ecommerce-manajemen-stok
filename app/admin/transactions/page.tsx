'use client'

import { useState } from 'react'
import StatsCard from '@/components/admin/statcard'
import { FiShoppingCart, FiDollarSign, FiClock, FiSearch, FiEye, FiFilter } from 'react-icons/fi'

const transactions = [
  {
    id: 'TR-2024-0156',
    date: '2024-10-12',
    time: '10:30',
    customer: 'Ahmad Pratama',
    items: 2,
    total: 9250000,
    status: 'Selesai',
  },
  {
    id: 'TR-2024-0155',
    date: '2024-10-11',
    time: '16:45',
    customer: 'Siti Nurhaliza',
    items: 1,
    total: 12000000,
    status: 'Selesai',
  },
  {
    id: 'TR-2024-0154',
    date: '2024-10-11',
    time: '14:20',
    customer: 'Budi Santoso',
    items: 2,
    total: 2700000,
    status: 'Selesai',
  },
  {
    id: 'TR-2024-0153',
    date: '2024-10-11',
    time: '11:00',
    customer: 'Dewi Lestari',
    items: 2,
    total: 3200000,
    status: 'Selesai',
  },
  {
    id: 'TR-2024-0152',
    date: '2024-10-10',
    time: '15:30',
    customer: 'Eko Prasetyo',
    items: 1,
    total: 6400000,
    status: 'Pending',
  },
  {
    id: 'TR-2024-0151',
    date: '2024-10-10',
    time: '09:15',
    customer: 'Rina Wijaya',
    items: 2,
    total: 5350000,
    status: 'Selesai',
  },
]

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`
  }

  const getStatusBadge = (status: string) => {
    if (status === 'Selesai') {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
          Selesai
        </span>
      )
    }
    return (
      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
        Pending
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transaksi</h1>
        <p className="text-gray-600 mt-1">Kelola dan pantau semua transaksi penjualan</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Transaksi Hari Ini"
          value="28"
          icon={<FiShoppingCart className="w-6 h-6 text-green-600" />}
          iconBgColor="bg-green-100"
          change="+12% dari kemarin"
          changeType="positive"
        />
        <StatsCard
          title="Total Penjualan Hari Ini"
          value="Rp 4.250.000"
          icon={<FiDollarSign className="w-6 h-6 text-blue-600" />}
          iconBgColor="bg-blue-100"
          change="+8% dari kemarin"
          changeType="positive"
        />
        <StatsCard
          title="Transaksi Pending"
          value="1"
          icon={<FiClock className="w-6 h-6 text-orange-600" />}
          iconBgColor="bg-orange-100"
          change="Memerlukan tindakan"
          changeType="neutral"
        />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Search & Filter */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari ID transaksi atau pelanggan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FiFilter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter Tanggal</span>
            </button>
          </div>
        </div>

        {/* Transaction History Title */}
        <div className="px-6 pt-6">
          <h3 className="text-lg font-semibold text-gray-900">Riwayat Transaksi</h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-6">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  ID Transaksi
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Tanggal & Waktu
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Pelanggan
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Total Item
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Total Harga
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
              {filteredTransactions.map((transaction, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {transaction.date} {transaction.time}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{transaction.customer}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{transaction.items} item</td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {formatCurrency(transaction.total)}
                  </td>
                  <td className="px-4 py-4">{getStatusBadge(transaction.status)}</td>
                  <td className="px-4 py-4">
                    <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                      <FiEye className="w-4 h-4" />
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada transaksi yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  )
}
