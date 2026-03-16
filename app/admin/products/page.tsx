'use client'

import { useState, useEffect } from 'react'
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi'

type Product = {
  id: string
  sku: string
  name: string
  category: string
  price: number
  stock: number
  image: string
}

export default function ProductsPage() {

  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])

  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [form, setForm] = useState({
    sku: "",
    name: "",
    category: "",
    price: 0,
    stock: 0
  })

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`
  }

  /* =======================
     CREATE
  ======================= */

  const createProduct = async () => {

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })

    const newProduct = await res.json()

    setProducts([...products, newProduct])
    setShowModal(false)
  }

  /* =======================
     UPDATE
  ======================= */

  const updateProduct = async () => {

  if (!editingProduct) return

  const res = await fetch(`/api/products/${editingProduct.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  })

  if (!res.ok) {
    alert("Update gagal")
    return
  }

  // reload data dari server
  const data = await fetch('/api/products').then(res => res.json())
  setProducts(data)

  setEditingProduct(null)
  setShowModal(false)
}

  /* =======================
     DELETE
  ======================= */

  const deleteProduct = async (id: string) => {

    const confirmDelete = confirm("Hapus produk ini?")
    if (!confirmDelete) return

    await fetch(`/api/products/${id}`, {
      method: "DELETE"
    })

    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Produk</h1>
          <p className="text-gray-600 mt-1">Kelola semua produk dalam sistem</p>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null)
            setForm({ sku: "", name: "", category: "", price: 0, stock: 0 })
            setShowModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Tambah Produk
        </button>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200">

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
            />

          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Nama Produk</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Harga</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Stok</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">

              {filteredProducts.map((product) => (

                <tr key={product.id} className="hover:bg-gray-50">

                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {product.sku}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                        {product.image}
                      </div>

                      <span className="text-sm font-medium text-gray-900">
                        {product.name}
                      </span>

                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {formatCurrency(product.price)}
                  </td>

                  <td className="px-6 py-4">

                    <span className="text-sm font-medium text-gray-900">
                      {product.stock} unit
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex gap-2">

                      {/* EDIT */}
                      <button
                        onClick={() => {
                          setEditingProduct(product)
                          setForm(product)
                          setShowModal(true)
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* MODAL */}
      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-96 space-y-4">

            <h2 className="text-lg font-bold">
              {editingProduct ? "Edit Produk" : "Tambah Produk"}
            </h2>

            <input
              placeholder="SKU"
              value={form.sku}
              onChange={(e)=>setForm({...form, sku:e.target.value})}
              className="w-full border p-2 rounded"
            />

            <input
              placeholder="Nama Produk"
              value={form.name}
              onChange={(e)=>setForm({...form, name:e.target.value})}
              className="w-full border p-2 rounded"
            />

            <input
              placeholder="Kategori"
              value={form.category}
              onChange={(e)=>setForm({...form, category:e.target.value})}
              className="w-full border p-2 rounded"
            />

            <input
              type="number"
              placeholder="Harga"
              value={form.price}
              onChange={(e)=>setForm({...form, price:Number(e.target.value)})}
              className="w-full border p-2 rounded"
            />

            <input
              type="number"
              placeholder="Stok"
              value={form.stock}
              onChange={(e)=>setForm({...form, stock:Number(e.target.value)})}
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-end gap-2">

              <button
                onClick={()=>setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Batal
              </button>

              <button
                onClick={editingProduct ? updateProduct : createProduct}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Simpan
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}