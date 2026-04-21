'use client'

import { useState, useEffect } from 'react'
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi'

type Product = {
  id: string
  sku: string
  name: string
  categoryId: string
  price: number // Prisma Decimal di-parse ke number
  discount?: number // Persentase 0-100
  stock: number
  images: string[]
  category?: {
    name: string
  }
  // Fields lain yang mungkin dibutuhkan
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    sku: "",
    name: "",
    categoryId: "",
    price: 0,
    discount: 0,
    stock: 0
  })

  // Fetch products dengan include category
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch('/api/products')
      if (!res.ok) throw new Error('Gagal memuat data')
      const data = await res.json()
      setProducts(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`
  }

  const formatDiscount = (discount?: number) => {
    return discount && discount > 0 ? `${discount}%` : '-'
  }

  const getDiscountedPrice = (price: number, discount?: number) => {
    return discount && discount > 0 
      ? Math.round(price * (1 - discount / 100))
      : price
  }

  /* =======================
     CREATE
  ======================= */
  const createProduct = async () => {
    if (!form.sku?.trim() || !form.name?.trim() || !form.categoryId?.trim() || form.price <= 0) {
      setError('Lengkapi SKU, Nama, Kategori, dan Harga')
      return
    }

    try {
      setLoading(true)
      setError('')
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: form.sku.trim(),
          name: form.name.trim(),
          categoryId: form.categoryId.trim(),
          price: parseFloat(form.price.toString()),
          discount: form.discount || 0,
          stock: form.stock || 0
        })
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Gagal membuat produk')
      }

      const newProduct = await res.json()
      setProducts([newProduct, ...products])
      setShowModal(false)
      setForm({ sku: "", name: "", categoryId: "", price: 0, discount: 0, stock: 0 })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* =======================
     UPDATE
  ======================= */
  const updateProduct = async () => {
    if (!editingProduct || !form.sku?.trim() || !form.name?.trim() || !form.categoryId?.trim() || form.price <= 0) {
      setError('Lengkapi SKU, Nama, Kategori, dan Harga')
      return
    }

    try {
      setLoading(true)
      setError('')
      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: form.sku.trim(),
          name: form.name.trim(),
          categoryId: form.categoryId.trim(),
          price: parseFloat(form.price.toString()),
          discount: form.discount || 0,
          stock: form.stock || 0
        })
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Gagal update produk')
      }

      await fetchProducts()
      setEditingProduct(null)
      setShowModal(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* =======================
     DELETE
  ======================= */
  const deleteProduct = async (id: string) => {
    if (!confirm("Hapus produk ini?")) return

    try {
      setLoading(true)
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Gagal hapus produk')
      }
      setProducts(products.filter(p => p.id !== id))
    } catch (err: any) {
      setError(err.message)
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Produk</h1>
          <p className="text-gray-600 mt-1">Kelola semua produk dalam sistem</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null)
            setForm({ sku: "", name: "", categoryId: "", price: 0, discount: 0, stock: 0 })
            setError('')
            setShowModal(true)
          }}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Tambah Produk
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk atau SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-2"></div>
              Memuat data produk...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              {searchQuery ? 'Tidak ada hasil pencarian' : 'Belum ada produk'}
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Produk</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Harga</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Diskon</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Harga Diskon</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stok</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => {
                  const discountedPrice = getDiscountedPrice(product.price, product.discount)
                  
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded text-xs">
                          {product.sku}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center text-lg font-semibold p-2">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              product.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-900 block">{product.name}</span>
                            {product.images?.length > 0 && (
                              <span className="text-xs text-gray-500">{product.images.length} gambar</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                          {product.category?.name || product.categoryId}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          product.discount && product.discount > 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {formatDiscount(product.discount)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {product.discount && product.discount > 0 ? (
                          <div className="space-y-1">
                            <span className="line-through text-gray-400 text-xs">
                              {formatCurrency(product.price)}
                            </span>
                            <span className="font-bold text-lg text-green-600">
                              {formatCurrency(discountedPrice)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(product.price)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          product.stock === 0 
                            ? 'bg-red-100 text-red-800' 
                            : product.stock < 10 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {product.stock} unit
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(product)
                              setForm({
                                sku: product.sku,
                                name: product.name,
                                categoryId: product.categoryId,
                                price: Number(product.price),
                                discount: product.discount || 0,
                                stock: product.stock
                              })
                              setError('')
                              setShowModal(true)
                            }}
                            disabled={loading}
                            className="p-2 text-blue-600 hover:bg-blue-50 disabled:opacity-50 rounded-lg hover:scale-105 transition-all"
                            title="Edit"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            disabled={loading}
                            className="p-2 text-red-600 hover:bg-red-50 disabled:opacity-50 rounded-lg hover:scale-105 transition-all"
                            title="Hapus"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" 
            onClick={() => setShowModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6">
                {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SKU *</label>
                  <input
                    value={form.sku}
                    onChange={(e) => setForm({...form, sku: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Contoh: SSG-001"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Produk *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Masukkan nama produk"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori ID *</label>
                  <input
                    value={form.categoryId}
                    onChange={(e) => setForm({...form, categoryId: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="ID kategori dari database"
                    disabled={loading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Harga (Rp) *</label>
                    <input
                      type="number"
                      value={form.price}
                      min="0"
                      step="1000"
                      onChange={(e) => setForm({...form, price: Number(e.target.value) || 0})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="25000"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Diskon (%)</label>
                    <input
                      type="number"
                      value={form.discount}
                      min="0"
                      max="100"
                      step="1"
                      onChange={(e) => {
                        let val = Number(e.target.value)
                        if (val > 100) val = 100
                        if (val < 0) val = 0
                        setForm({...form, discount: val})
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="0"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stok</label>
                  <input
                    type="number"
                    value={form.stock}
                    min="0"
                    onChange={(e) => setForm({...form, stock: Number(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingProduct(null)
                    setError('')
                  }}
                  disabled={loading}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={editingProduct ? updateProduct : createProduct}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl font-semibold hover:from-gray-800 hover:to-black disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></span>
                      Menyimpan...
                    </>
                  ) : (
                    'Simpan Produk'
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}