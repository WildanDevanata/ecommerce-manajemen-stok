'use client'

import { useState, useEffect } from 'react'
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi'

type Product = {
  id: string
  sku: string
  name: string
  categoryId?: string
  price: number
  stock: number
  image: string
  discount?: number // 0-100 untuk persentase
}
type Category = {
  id: string
  name: string
}
export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([]) // ✅ NEW
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    sku: "",
    name: "",
    categoryId: "", 
    price: 0,
    stock: 0,
    discount: 0
  })

  // Fetch products
  // ✅ Fetch products & categories
  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      }
    } catch (err) {
      console.error('Gagal load kategori')
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/products')
      if (!res.ok) throw new Error('Gagal memuat data')
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      setError('Gagal memuat produk')
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
    return discount ? `${discount}%` : '-'
  }

  /* =======================
     CREATE
  ======================= */
  const createProduct = async () => {
  if (!form.sku || !form.name || !form.categoryId || form.price <= 0) {
    setError('Lengkapi data produk dengan benar')
    return
  }

  const isDuplicateSku = products.some(
    (p) => p.sku.toLowerCase() === form.sku.toLowerCase()
  )

  const isDuplicateName = products.some(
    (p) => p.name.toLowerCase() === form.name.toLowerCase()
  )

  if (isDuplicateSku) {
    setError('SKU sudah terdaftar')
    return
  }

  if (isDuplicateName) {
    setError('Nama produk sudah terdaftar')
    return
  }

  try {
    setLoading(true)
    setError('')

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      throw new Error(data.message || 'Gagal membuat produk')
    }

    setProducts((prev) => [
      {
        ...data,
        category: categories.find(c => c.id === form.categoryId)?.name || "-"
      },
      ...prev
    ])

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
    if (!editingProduct || !form.sku || !form.name || !form.categoryId || form.price <= 0) {
      setError('Lengkapi data produk dengan benar')
      return
    }

    try {
      setLoading(true)
      setError('')
      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Gagal update produk')
      }

      await fetchProducts() // Refresh data
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

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      throw new Error(data.message || "Gagal hapus")
    }

    setProducts((prev) => prev.filter((p) => p.id !== id))
  } catch (err: any) {
    setError(err.message)
    alert("Gagal hapus: " + err.message)
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="space-y-6 p-6">
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

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk atau SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Memuat data...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {searchQuery ? 'Tidak ada hasil pencarian' : 'Belum ada produk'}
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Nama Produk</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Harga</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Diskon</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Harga Diskon</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Stok</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => {
                  const discountPrice = product.discount 
                    ? product.price * (1 - product.discount / 100) 
                    : product.price

                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {product.sku}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                            {product.image || '📦'}
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {categories.find(c => c.id === product.categoryId)?.name || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          product.discount ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {formatDiscount(product.discount)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {product.discount ? (
                          <div className="flex flex-col">
                            <span className="line-through text-gray-400 text-xs">
                              {formatCurrency(product.price)}
                            </span>
                            <span className="font-semibold text-green-600">
                              {formatCurrency(discountPrice)}
                            </span>
                          </div>
                        ) : (
                          formatCurrency(product.price)
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">
                          {product.stock} unit
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(product)
                              setForm({
                                sku: product.sku,
                                name: product.name,
                                categoryId: product.categoryId || "",
                                price: product.price,
                                discount: product.discount || 0,
                                stock: product.stock
                              })
                              setError('')
                              setShowModal(true)
                            }}
                            disabled={loading}
                            className="p-2 text-blue-600 hover:bg-blue-50 disabled:opacity-50 rounded-lg transition-colors"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            disabled={loading}
                            className="p-2 text-red-600 hover:bg-red-50 disabled:opacity-50 rounded-lg transition-colors"
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

       {/* MODAL - GANTI HANYA KATEGORI INPUT */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setShowModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}>
              
              <h2 className="text-2xl font-bold mb-6">
                {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
              </h2>

              <div className="space-y-4">
                {/* SKU SAMA */}
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

                {/* Name SAMA */}
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

                {/* ✅ RADIO BUTTON KATEGORI - GANTI INPUT TEXT */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto p-3 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    {categories.map((category) => (
                      <label key={category.id} 
                             className="flex items-center p-3 hover:bg-white rounded-lg cursor-pointer transition-all group border border-transparent hover:border-blue-200">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={form.categoryId === category.id}
                          onChange={(e) => setForm({...form, categoryId: e.target.value})}
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 rounded mr-3 flex-shrink-0"
                          disabled={loading}
                        />
                        <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                          {category.name}
                        </span>
                      </label>
                    ))}
                    {categories.length === 0 && (
                      <div className="col-span-2 text-center py-8 text-gray-500">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mx-auto mb-2"></div>
                        Loading kategori...
                      </div>
                    )}
                  </div>
                  {!form.categoryId && categories.length > 0 && (
                    <p className="text-sm text-red-500 mt-2">Pilih kategori terlebih dahulu</p>
                  )}
                </div>

                {/* Price & Discount SAMA */}
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

                {/* Stock SAMA */}
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

              {/* Buttons SAMA */}
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
                  disabled={loading || !form.categoryId}
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