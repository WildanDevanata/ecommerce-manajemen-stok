'use client'

import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import StatsCard from '@/components/admin/statcard'
import {
  FiPackage,
  FiShoppingCart,
  FiTrendingUp,
  FiAlertTriangle,
  FiShoppingBag,
  FiBox,
  FiAlertCircle,
  FiBarChart2,
} from 'react-icons/fi'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Mock data
const salesData = {
  labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
  datasets: [
    {
      label: 'Penjualan (Rp)',
      data: [2500, 1500, 3900, 4000, 4500, 4200, 4400],
      borderColor: 'rgb(147, 51, 234)',
      backgroundColor: 'rgba(147, 51, 234, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
}

const topProducts = [
  { rank: 1, name: 'Smartphone XYZ Pro', sold: 145, revenue: 65250000, growth: '+15%' },
  { rank: 2, name: 'Laptop ABC Gaming', sold: 89, revenue: 106800000, growth: '+22%' },
  { rank: 3, name: 'Headphone Premium', sold: 234, revenue: 19890000, growth: '+8%' },
  { rank: 4, name: 'Smartwatch Elite', sold: 167, revenue: 41750000, growth: '+12%' },
  { rank: 5, name: 'Tablet Mini 2024', sold: 98, revenue: 31360000, growth: '+5%' },
]

const lowStockProducts = [
  { name: 'Smartphone XYZ Pro', stock: 5, status: 'Kritis' },
  { name: 'Wireless Mouse', stock: 8, status: 'Rendah' },
  { name: 'USB Cable Type-C', stock: 12, status: 'Rendah' },
]

const recentActivities = [
  {
    type: 'transaction',
    title: 'Transaksi baru #TR-2024-0156',
    time: '2 menit lalu',
    icon: FiShoppingCart,
    color: 'text-green-600 bg-green-100',
  },
  {
    type: 'stock',
    title: 'Stok produk diperbarui',
    time: '15 menit lalu',
    icon: FiBox,
    color: 'text-blue-600 bg-blue-100',
  },
  {
    type: 'alert',
    title: 'Peringatan stok rendah',
    time: '1 jam lalu',
    icon: FiAlertCircle,
    color: 'text-orange-600 bg-orange-100',
  },
  {
    type: 'report',
    title: 'Laporan penjualan dihasilkan',
    time: '2 jam lalu',
    icon: FiBarChart2,
    color: 'text-purple-600 bg-purple-100',
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Selamat datang di sistem manajemen e-commerce</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Produk"
          value="245"
          icon={<FiPackage className="w-6 h-6 text-blue-600" />}
          iconBgColor="bg-blue-100"
        />
        <StatsCard
          title="Transaksi Hari Ini"
          value="28"
          icon={<FiShoppingCart className="w-6 h-6 text-green-600" />}
          iconBgColor="bg-green-100"
        />
        <StatsCard
          title="Pendapatan Hari Ini"
          value="Rp 4.250.000"
          icon={<FiTrendingUp className="w-6 h-6 text-purple-600" />}
          iconBgColor="bg-purple-100"
        />
        <StatsCard
          title="Stok Menipis"
          value="12"
          icon={<FiAlertTriangle className="w-6 h-6 text-orange-600" />}
          iconBgColor="bg-orange-100"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Penjualan Minggu Ini</h3>
          <div className="h-64">
            <Line
              data={salesData}
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
                      callback: (value) => `Rp ${Number(value).toLocaleString('id-ID')}`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Produk Terlaris</h3>
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.rank} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-gray-600">#{product.rank}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.sold} terjual</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    Rp {(product.revenue / 1000).toFixed(0)}Jt
                  </p>
                  <p className="text-xs text-green-600 font-medium">{product.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiAlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">Peringatan Stok Menipis</h3>
          </div>
          <div className="space-y-3">
            {lowStockProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">Stok tersisa: {product.stock} unit</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.status === 'Kritis'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {product.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, idx) => {
              const Icon = activity.icon
              return (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${activity.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
