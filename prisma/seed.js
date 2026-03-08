import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()
// Helper function to create slug from string
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

async function main() {
  console.log('🌱 Starting seed...')

  // ============================================
  // 1. CREATE USERS
  // ============================================
  console.log('👤 Creating users...')

  const hashedPassword = await bcrypt.hash('password123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@tokosusu.com' },
    update: {},
    create: {
      email: 'admin@tokosusu.com',
      name: 'Admin Toko Susu',
      password: hashedPassword,
      role: 'ADMIN',
      phone: '081234567890',
      address: 'Jl. Raya Magetan No. 123',
      city: 'Magetan',
      province: 'Jawa Timur',
      postalCode: '63319',
      emailVerified: new Date(),
    },
  })

  const customer1 = await prisma.user.upsert({
    where: { email: 'ahmad.pratama@gmail.com' },
    update: {},
    create: {
      email: 'ahmad.pratama@gmail.com',
      name: 'Ahmad Pratama',
      password: hashedPassword,
      role: 'CUSTOMER',
      phone: '081234567891',
      address: 'Jl. Sudirman No. 45',
      city: 'Surabaya',
      province: 'Jawa Timur',
      postalCode: '60271',
      emailVerified: new Date(),
    },
  })

  const customer2 = await prisma.user.upsert({
    where: { email: 'siti.nurhaliza@gmail.com' },
    update: {},
    create: {
      email: 'siti.nurhaliza@gmail.com',
      name: 'Siti Nurhaliza',
      password: hashedPassword,
      role: 'CUSTOMER',
      phone: '081234567892',
      address: 'Jl. Gatot Subroto No. 78',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postalCode: '12190',
      emailVerified: new Date(),
    },
  })

  const customer3 = await prisma.user.upsert({
    where: { email: 'budi.santoso@gmail.com' },
    update: {},
    create: {
      email: 'budi.santoso@gmail.com',
      name: 'Budi Santoso',
      password: hashedPassword,
      role: 'CUSTOMER',
      phone: '081234567893',
      address: 'Jl. Diponegoro No. 12',
      city: 'Bandung',
      province: 'Jawa Barat',
      postalCode: '40115',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Users created')

  // ============================================
  // 2. CREATE CATEGORIES
  // ============================================
  console.log('📁 Creating categories...')

  const categories = [
    {
      name: 'Susu Segar',
      slug: 'susu-segar',
      description: 'Susu segar langsung dari peternakan pilihan dengan kualitas terbaik',
      icon: '🥛',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
    },
    {
      name: 'Susu UHT',
      slug: 'susu-uht',
      description: 'Susu ultra high temperature dengan berbagai varian rasa',
      icon: '📦',
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
    },
    {
      name: 'Yogurt',
      slug: 'yogurt',
      description: 'Yogurt sehat dengan probiotik untuk pencernaan yang lebih baik',
      icon: '🥄',
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      name: 'Keju',
      slug: 'keju',
      description: 'Berbagai jenis keju berkualitas untuk kebutuhan masakan Anda',
      icon: '🧀',
      gradient: 'from-orange-500 to-amber-500',
      bgColor: 'from-orange-50 to-amber-50',
    },
    {
      name: 'Susu Formula',
      slug: 'susu-formula',
      description: 'Susu formula dengan nutrisi lengkap untuk tumbuh kembang bayi',
      icon: '🍼',
      gradient: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50',
    },
    {
      name: 'Minuman Susu',
      slug: 'minuman-susu',
      description: 'Minuman susu siap minum dengan berbagai varian rasa',
      icon: '🥤',
      gradient: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50',
    },
  ]

  const createdCategories = []
  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
    createdCategories.push(category)
  }

  console.log('✅ Categories created')

  // ============================================
  // 3. CREATE PRODUCTS
  // ============================================
  console.log('📦 Creating products...')

  const products = [
    {
      name: 'Susu Segar Full Cream 1L',
      slug: 'susu-segar-full-cream-1l',
      description: 'Susu segar full cream dengan kandungan nutrisi lengkap. Langsung dari peternakan pilihan untuk menjaga kesegaran dan kualitas.',
      price: 25000,
      compareAtPrice: 29411.76, // Price before 15% discount
      discount: 15,
      stock: 45,
      minStock: 10,
      weight: 1000,
      sku: 'SSG-001',
      images: ['/images/products/susu-segar-1l.jpg'],
      categoryId: createdCategories[0].id, // Susu Segar
      isActive: true,
      isFeatured: true,
      sold: 328,
      rating: 4.9,
    },
    {
      name: 'Susu UHT Cokelat 250ml',
      slug: 'susu-uht-cokelat-250ml',
      description: 'Susu UHT rasa cokelat yang nikmat dan bergizi. Dikemas praktis untuk dibawa kemana-mana.',
      price: 8000,
      compareAtPrice: 8888.89, // Price before 10% discount
      discount: 10,
      stock: 120,
      minStock: 20,
      weight: 250,
      sku: 'UHT-001',
      images: ['/images/products/uht-coklat.jpg'],
      categoryId: createdCategories[1].id, // Susu UHT
      isActive: true,
      isFeatured: true,
      sold: 567,
      rating: 4.8,
    },
    {
      name: 'Greek Yogurt Original 200ml',
      slug: 'greek-yogurt-original-200ml',
      description: 'Greek yogurt original dengan probiotik tinggi. Baik untuk pencernaan dan kesehatan tubuh.',
      price: 15000,
      compareAtPrice: null,
      discount: 0,
      stock: 30,
      minStock: 10,
      weight: 200,
      sku: 'YGT-001',
      images: ['/images/products/greek-yogurt.jpg'],
      categoryId: createdCategories[2].id, // Yogurt
      isActive: true,
      isFeatured: false,
      sold: 234,
      rating: 4.7,
    },
    {
      name: 'Keju Cheddar Premium 200gr',
      slug: 'keju-cheddar-premium-200gr',
      description: 'Keju cheddar premium dengan rasa yang gurih dan tekstur yang lembut. Cocok untuk berbagai masakan.',
      price: 35000,
      compareAtPrice: 43750, // Price before 20% discount
      discount: 20,
      stock: 4,
      minStock: 5,
      weight: 200,
      sku: 'KJU-001',
      images: ['/images/products/keju-cheddar.jpg'],
      categoryId: createdCategories[3].id, // Keju
      isActive: true,
      isFeatured: true,
      sold: 189,
      rating: 4.9,
    },
    {
      name: 'Susu Segar Low Fat 1L',
      slug: 'susu-segar-low-fat-1l',
      description: 'Susu segar dengan kandungan lemak rendah. Cocok untuk yang sedang menjaga berat badan.',
      price: 28000,
      compareAtPrice: null,
      discount: 0,
      stock: 67,
      minStock: 10,
      weight: 1000,
      sku: 'SSG-002',
      images: ['/images/products/susu-segar-lowfat.jpg'],
      categoryId: createdCategories[0].id, // Susu Segar
      isActive: true,
      isFeatured: false,
      sold: 412,
      rating: 4.6,
    },
    {
      name: 'Yogurt Rasa Buah 150ml',
      slug: 'yogurt-rasa-buah-150ml',
      description: 'Yogurt dengan berbagai pilihan rasa buah. Segar dan menyehatkan untuk camilan sehari-hari.',
      price: 12000,
      compareAtPrice: 12631.58, // Price before 5% discount
      discount: 5,
      stock: 88,
      minStock: 15,
      weight: 150,
      sku: 'YGT-002',
      images: ['/images/products/yogurt-buah.jpg'],
      categoryId: createdCategories[2].id, // Yogurt
      isActive: true,
      isFeatured: false,
      sold: 523,
      rating: 4.8,
    },
    {
      name: 'Susu UHT Strawberry 250ml',
      slug: 'susu-uht-strawberry-250ml',
      description: 'Susu UHT rasa strawberry yang manis dan segar. Disukai anak-anak dan dewasa.',
      price: 8000,
      compareAtPrice: null,
      discount: 0,
      stock: 95,
      minStock: 20,
      weight: 250,
      sku: 'UHT-002',
      images: ['/images/products/uht-strawberry.jpg'],
      categoryId: createdCategories[1].id, // Susu UHT
      isActive: true,
      isFeatured: false,
      sold: 445,
      rating: 4.7,
    },
    {
      name: 'Keju Mozarella 250gr',
      slug: 'keju-mozarella-250gr',
      description: 'Keju mozarella premium untuk pizza dan pasta. Mudah meleleh dan memberikan rasa yang lezat.',
      price: 42000,
      compareAtPrice: 49411.76, // Price before 15% discount
      discount: 15,
      stock: 3,
      minStock: 5,
      weight: 250,
      sku: 'KJU-002',
      images: ['/images/products/keju-mozarella.jpg'],
      categoryId: createdCategories[3].id, // Keju
      isActive: true,
      isFeatured: false,
      sold: 156,
      rating: 4.9,
    },
    {
      name: 'Susu Formula Bayi 400gr',
      slug: 'susu-formula-bayi-400gr',
      description: 'Susu formula dengan nutrisi lengkap untuk tumbuh kembang bayi. Mudah dicerna dan aman.',
      price: 125000,
      compareAtPrice: null,
      discount: 0,
      stock: 25,
      minStock: 10,
      weight: 400,
      sku: 'FRM-001',
      images: ['/images/products/susu-formula.jpg'],
      categoryId: createdCategories[4].id, // Susu Formula
      isActive: true,
      isFeatured: true,
      sold: 278,
      rating: 4.8,
    },
    {
      name: 'Susu Segar Cokelat 1L',
      slug: 'susu-segar-cokelat-1l',
      description: 'Susu segar dengan perasa cokelat alami. Nikmat dan bergizi untuk seluruh keluarga.',
      price: 27000,
      compareAtPrice: null,
      discount: 0,
      stock: 52,
      minStock: 10,
      weight: 1000,
      sku: 'SSG-003',
      images: ['/images/products/susu-segar-cokelat.jpg'],
      categoryId: createdCategories[0].id, // Susu Segar
      isActive: true,
      isFeatured: false,
      sold: 298,
      rating: 4.7,
    },
    {
      name: 'Susu UHT Vanilla 250ml',
      slug: 'susu-uht-vanilla-250ml',
      description: 'Susu UHT dengan rasa vanilla yang lembut. Praktis dan tahan lama.',
      price: 8000,
      compareAtPrice: null,
      discount: 0,
      stock: 110,
      minStock: 20,
      weight: 250,
      sku: 'UHT-003',
      images: ['/images/products/uht-vanilla.jpg'],
      categoryId: createdCategories[1].id, // Susu UHT
      isActive: true,
      isFeatured: false,
      sold: 387,
      rating: 4.6,
    },
    {
      name: 'Yogurt Drink Mangga 200ml',
      slug: 'yogurt-drink-mangga-200ml',
      description: 'Minuman yogurt rasa mangga yang segar. Mudah diminum dan menyegarkan.',
      price: 10000,
      compareAtPrice: null,
      discount: 0,
      stock: 75,
      minStock: 15,
      weight: 200,
      sku: 'YGT-003',
      images: ['/images/products/yogurt-mangga.jpg'],
      categoryId: createdCategories[2].id, // Yogurt
      isActive: true,
      isFeatured: false,
      sold: 412,
      rating: 4.7,
    },
  ]

  const createdProducts = []
  for (const prod of products) {
    const product = await prisma.product.create({
      data: prod,
    })
    createdProducts.push(product)
  }

  console.log('✅ Products created')

  // ============================================
  // 4. CREATE CARTS
  // ============================================
  console.log('🛒 Creating carts...')

  // Create cart for customer1 with 3 items
  const cart1 = await prisma.cart.create({
    data: {
      userId: customer1.id,
      items: {
        create: [
          {
            productId: createdProducts[0].id, // Susu Segar Full Cream
            quantity: 2,
          },
          {
            productId: createdProducts[2].id, // Greek Yogurt
            quantity: 3,
          },
          {
            productId: createdProducts[3].id, // Keju Cheddar
            quantity: 1,
          },
        ],
      },
    },
  })

  // Create empty cart for customer2
  await prisma.cart.create({
    data: {
      userId: customer2.id,
    },
  })

  console.log('✅ Carts created')

  // ============================================
  // 5. CREATE ORDERS
  // ============================================
  console.log('📋 Creating orders...')

  // Order 1 - Completed order
  const order1 = await prisma.order.create({
    data: {
      orderNumber: 'TR-2024-0156',
      userId: customer1.id,
      customerName: customer1.name,
      customerEmail: customer1.email,
      customerPhone: customer1.phone,
      subtotal: 92500,
      shippingCost: 15000,
      tax: 0,
      discount: 0,
      total: 107500,
      status: 'DELIVERED',
      paymentStatus: 'PAID',
      paymentMethod: 'Transfer Bank',
      shippingAddress: customer1.address,
      shippingCity: customer1.city,
      shippingProvince: customer1.province,
      shippingPostalCode: customer1.postalCode,
      shippingCourier: 'JNE',
      shippingService: 'REG',
      trackingNumber: 'JNE1234567890',
      items: {
        create: [
          {
            productId: createdProducts[0].id,
            productName: createdProducts[0].name,
            productImage: createdProducts[0].images[0],
            quantity: 2,
            price: 25000,
            subtotal: 50000,
          },
          {
            productId: createdProducts[1].id,
            productName: createdProducts[1].name,
            productImage: createdProducts[1].images[0],
            quantity: 3,
            price: 8000,
            subtotal: 24000,
          },
          {
            productId: createdProducts[4].id,
            productName: createdProducts[4].name,
            productImage: createdProducts[4].images[0],
            quantity: 1,
            price: 28000,
            subtotal: 28000,
          },
        ],
      },
    },
  })

  // Order 2 - Pending order
  const order2 = await prisma.order.create({
    data: {
      orderNumber: 'TR-2024-0155',
      userId: customer2.id,
      customerName: customer2.name,
      customerEmail: customer2.email,
      customerPhone: customer2.phone,
      subtotal: 125000,
      shippingCost: 0, // Free shipping
      tax: 0,
      discount: 0,
      total: 125000,
      status: 'PROCESSING',
      paymentStatus: 'PAID',
      paymentMethod: 'E-Wallet',
      shippingAddress: customer2.address,
      shippingCity: customer2.city,
      shippingProvince: customer2.province,
      shippingPostalCode: customer2.postalCode,
      shippingCourier: 'JNT',
      shippingService: 'Express',
      items: {
        create: [
          {
            productId: createdProducts[8].id,
            productName: createdProducts[8].name,
            productImage: createdProducts[8].images[0],
            quantity: 1,
            price: 125000,
            subtotal: 125000,
          },
        ],
      },
    },
  })

  console.log('✅ Orders created')

  // ============================================
  // 6. CREATE STOCK HISTORIES
  // ============================================
  console.log('📊 Creating stock histories...')

  await prisma.stockHistory.create({
    data: {
      productId: createdProducts[0].id,
      type: 'IN',
      quantity: 100,
      beforeStock: 0,
      afterStock: 100,
      notes: 'Initial stock',
      userId: admin.id,
    },
  })

  await prisma.stockHistory.create({
    data: {
      productId: createdProducts[0].id,
      type: 'OUT',
      quantity: 2,
      beforeStock: 100,
      afterStock: 98,
      notes: 'Order #TR-2024-0156',
      userId: null,
    },
  })

  console.log('✅ Stock histories created')

  // ============================================
  // 7. CREATE SETTINGS
  // ============================================
  console.log('⚙️ Creating settings...')

  const settings = [
    {
      key: 'store_name',
      value: 'Toko Susu Kita',
      description: 'Nama toko',
    },
    {
      key: 'store_email',
      value: 'info@tokosusu.com',
      description: 'Email toko',
    },
    {
      key: 'store_phone',
      value: '+62 812-3456-7890',
      description: 'Telepon toko',
    },
    {
      key: 'store_address',
      value: 'Jl. Raya Magetan No. 123, Magetan, Jawa Timur 63319',
      description: 'Alamat toko',
    },
    {
      key: 'free_shipping_min',
      value: '100000',
      description: 'Minimal belanja untuk gratis ongkir',
    },
    {
      key: 'shipping_cost',
      value: '15000',
      description: 'Biaya pengiriman standar',
    },
  ]

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }

  console.log('✅ Settings created')

  console.log('')
  console.log('🎉 Seed completed successfully!')
  console.log('')
  console.log('📊 Summary:')
  console.log('   - Users: 4 (1 admin, 3 customers)')
  console.log('   - Categories: 6')
  console.log('   - Products: 12')
  console.log('   - Carts: 2 (1 with items, 1 empty)')
  console.log('   - Orders: 2 (1 delivered, 1 processing)')
  console.log('   - Settings: 6')
  console.log('')
  console.log('👤 Login credentials:')
  console.log('   Admin: admin@tokosusu.com / password123')
  console.log('   Customer: ahmad.pratama@gmail.com / password123')
  console.log('   Customer: siti.nurhaliza@gmail.com / password123')
  console.log('   Customer: budi.santoso@gmail.com / password123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
