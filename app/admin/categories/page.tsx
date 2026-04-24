'use client'

import { useEffect, useState } from 'react'
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi'

type Category = {
  id: string
  name: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldError, setFieldError] = useState<string | null>(null)
const filteredCategories = categories.filter((c) =>
  c.name.toLowerCase().includes(searchQuery.toLowerCase())
)

  const [form, setForm] = useState({
    name: ""
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data)
    } catch {
      setError('Gagal memuat kategori')
    } finally {
      setLoading(false)
    }
  }

  

  /* =======================
     CREATE / UPDATE
  ======================= */
  const handleSubmit = async () => {
   if (!form.name.trim()) {
  setError("Nama kategori wajib diisi")
  return
}


    try {
      setLoading(true)
      setError('')
      setFieldError(null)

      const url = editingCategory
        ? `/api/categories/${editingCategory.id}`
        : '/api/categories'

      const method = editingCategory ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.message?.toLowerCase().includes("nama")) {
          setFieldError("name")
        }
        throw new Error(data.message)
      }

      await fetchCategories()
      setShowModal(false)
      setEditingCategory(null)
      setForm({ name: "" })

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* =======================
     DELETE
  ======================= */
  const deleteCategory = async (id: string) => {
  if (!confirm("Hapus kategori ini?")) return

  try {
    setLoading(true)

    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE"
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.message)

    setCategories(prev => prev.filter(c => c.id !== id))
  } catch (err: any) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}


  return (
  <div className="space-y-6 p-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Kategori</h1>
        <p className="text-gray-600 mt-1">Kelola semua kategori produk</p>
      </div>

      <button
        onClick={() => {
          setEditingCategory(null)
          setForm({ name: "" })
          setError('')
          setShowModal(true)
        }}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
      >
        <FiPlus className="w-5 h-5" />
        Tambah Kategori
      </button>
    </div>

    {/* Error */}
    {error && (
      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
        {error}
      </div>
    )}

    {/* Table Card */}
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

      {/* Search */}
      <div className="p-6 border-b border-gray-200">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari kategori..."
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
          <div className="p-8 text-center text-gray-500">
            Memuat data...
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {searchQuery ? 'Tidak ada hasil pencarian' : 'Belum ada kategori'}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                  Nama Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">

                  {/* Nama */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {category.name}
                  </td>

                  {/* Aksi */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">

                      {/* EDIT */}
                      <button
                        onClick={() => {
                          setEditingCategory(category)
                          setForm({ name: category.name })
                          setError('')
                          setShowModal(true)
                        }}
                        disabled={loading}
                        className="p-2 text-blue-600 hover:bg-blue-50 disabled:opacity-50 rounded-lg transition-colors"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => deleteCategory(category.id)}
                        disabled={loading}
                        className="p-2 text-red-600 hover:bg-red-50 disabled:opacity-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    {/* MODAL */}
{showModal && (
  <>
    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      onClick={() => setShowModal(false)}
    />

    {/* Modal */}
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6">
          {editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}
        </h2>

        {/* FORM */}
        <div className="space-y-4">

          {/* NAMA KATEGORI */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Kategori <span className="text-red-500">*</span>
            </label>

            <input
              value={form.name}
              onChange={(e) => {
  setForm({ ...form, name: e.target.value })
  setFieldError(null)
  setError('')
}}
              placeholder="Contoh: Susu UHT"
              disabled={loading}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-all ${
                fieldError === "name"
                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
            />

            {/* ERROR FIELD */}
            {fieldError === "name" && (
              <p className="text-sm text-red-500 mt-2">
                Nama kategori sudah digunakan
              </p>
            )}
          </div>

        </div>

        {/* BUTTON */}
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">

          {/* BATAL */}
          <button
            type="button"
            onClick={() => {
  setShowModal(false)
  setEditingCategory(null)
  setForm({ name: "" })
  setError('')
            }}
            disabled={loading}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all disabled:opacity-50"
          >
            Batal
          </button>

          {/* SIMPAN */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !form.name}
            className="px-8 py-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl font-semibold hover:from-gray-800 hover:to-black disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></span>
                Menyimpan...
              </>
            ) : (
              'Simpan Kategori'
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
