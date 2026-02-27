'use client'

import { useState } from 'react'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import StatsCard from '@/components/admin/statcard'
import { FiDollarSign, FiShoppingCart, FiTrendingUp, FiPackage, FiDownload } from 'react-icons/fi'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const salesChartData = {
  labels: ['1 Okt', '2 Okt', '3 Okt', '4 Okt', '5 Okt', '6 Okt', '7 Okt'],
  datasets: [
    {
      label: 'Penjualan (Rp)',
      data: [1000000, 900000, 2400000, 1800000, 2600000, 2100000, 2900000],
      backgroundColor: 'rgb(147, 51, 234)',
    },
  ],
}

const transactionChartData = {
  labels: ['1 Okt', '2 Okt', '3 Okt', '4 Okt', '5 Okt', '6 Okt', '7 Okt'],
  datasets: [
    {
      label: 'Jumlah Transaksi',
      data: [18, 14, 22, 18, 25, 21, 28],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
}

const categoryChartData = {
  labels: ['Elektronik 45%', 'Audio 25%', 'Wearable 18%', 'Aksesoris 12%'],
  datasets: [
    {
      data: [45, 25, 18, 12],
      backgroundColor: ['rgb(147, 51, 234)', 'rgb(59, 130, 246)', 'rgb(16, 185, 129)', 'rgb(251, 146, 60)'],
    },
  ],
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily')

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')} Jt`
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan Penjualan</h1>
          <p className="text-gray-600 mt-1">Analisis penjualan dan performa bisnis</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
            <FiDownload className="w-5 h-5" />
            Export Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
            <FiDownload className="w-5 h-5" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Penjualan"
          value="Rp 135 Jt"
          icon={<FiDollarSign className="w-6 h-6 text-purple-600" />}
          iconBgColor="bg-purple-100"
          change="+12,5% dari bulan lalu"
          changeType="positive"
        />
        <StatsCard
          title="Total Transaksi"
          value="558"
          icon={<FiShoppingCart className="w-6 h-6 text-blue-600" />}
          iconBgColor="bg-blue-100"
          change="+8,3% dari bulan lalu"
          changeType="positive"
        />
        <StatsCard
          title="Rata-rata Transaksi"
          value="Rp 242.000"
          icon={<FiTrendingUp className="w-6 h-6 text-green-600" />}
          iconBgColor="bg-green-100"
          change="+3,8% dari bulan lalu"
          changeType="positive"
        />
        <StatsCard
          title="Produk Terjual"
          value="1.245"
          icon={<FiPackage className="w-6 h-6 text-orange-600" />}
          iconBgColor="bg-orange-100"
          change="+15,2% dari bulan lalu"
          changeType="positive"
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === 'daily'
                ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Harian
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === 'weekly'
                ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Mingguan
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === 'monthly'
                ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Bulanan
          </button>
        </div>

        {/* Sales Bar Chart */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Grafik Penjualan Harian</h3>
          <div className="h-80">
            <Bar
              data={salesChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `Rp ${context.parsed.y.toLocaleString('id-ID')}`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `${Number(value) / 1000000}Jt`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Row - Transaction Chart & Category Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaksi Harian</h3>
          <div className="h-64">
            <Line
              data={transactionChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Category Doughnut Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Penjualan per Kategori</h3>
          <div className="h-64 flex items-center justify-center">
            <Doughnut
              data={categoryChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      padding: 15,
                      font: {
                        size: 11,
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
