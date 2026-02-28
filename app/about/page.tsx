import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import Container from '@/components/shared/container'
import { FiAward, FiHeart, FiShield, FiTruck, FiUsers, FiPhone } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'

const features = [
  {
    icon: FiShield,
    title: '100% Original',
    description: 'Semua produk dijamin keaslian dan kualitasnya langsung dari produsen terpercaya',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FiTruck,
    title: 'Pengiriman Cepat',
    description: 'Pesanan diproses dan dikirim dalam 24 jam ke seluruh Indonesia',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: FiHeart,
    title: 'Kualitas Terjamin',
    description: 'Kami hanya menjual produk dengan standar kualitas tertinggi',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: FiAward,
    title: 'Bersertifikat',
    description: 'Semua produk memiliki sertifikasi BPOM, Halal, dan SNI',
    color: 'from-orange-500 to-amber-500',
  },
]

const stats = [
  { value: '10,000+', label: 'Pelanggan Setia' },
  { value: '50+', label: 'Jenis Produk' },
  { value: '5 Tahun', label: 'Pengalaman' },
  { value: '4.9/5', label: 'Rating Pelanggan' },
]

const team = [
  {
    name: 'Wildan Devanata',
    role: 'Founder & CEO',
    image: '👨‍💼',
  },
  {
    name: 'Team Member',
    role: 'Operations Manager',
    image: '👨‍💼',
  },
  {
    name: 'Team Member',
    role: 'Customer Service',
    image: '👩‍💼',
  },
  {
    name: 'Team Member',
    role: 'Quality Control',
    image: '👨‍🔬',
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-32 pb-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-lg mb-6">
              <HiSparkles className="text-yellow-500 w-5 h-5 animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tentang Toko Susu Kita
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Menyediakan Susu Berkualitas
              </span>
              <br />
              <span className="text-gray-900">untuk Keluarga Indonesia</span>
            </h1>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Sejak 2020, kami berkomitmen untuk menyediakan produk susu dan dairy berkualitas premium
              dengan harga terjangkau untuk seluruh keluarga Indonesia.
            </p>
          </div>
        </Container>
      </div>

      {/* Stats Section */}
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Story Section */}
      <div className="bg-gray-50 py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Cerita Kami
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Toko Susu Kita dimulai dari passion untuk menyediakan produk susu berkualitas tinggi
                  yang mudah diakses oleh semua keluarga Indonesia. Kami percaya bahwa setiap orang
                  berhak mendapatkan nutrisi terbaik untuk menunjang kesehatan dan tumbuh kembang.
                </p>
                <p>
                  Dengan pengalaman lebih dari 5 tahun di industri dairy, kami telah melayani ribuan
                  pelanggan di seluruh Indonesia. Kepercayaan pelanggan adalah prioritas utama kami,
                  dan kami terus berinovasi untuk memberikan pengalaman berbelanja yang terbaik.
                </p>
                <p>
                  Semua produk kami dipilih dengan cermat dari produsen terpercaya dan telah melewati
                  kontrol kualitas yang ketat. Kami hanya menjual produk yang akan kami berikan kepada
                  keluarga kami sendiri.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-3xl opacity-20" />
              <div className="relative bg-white rounded-2xl border border-gray-200 p-8">
                <div className="text-6xl mb-6 text-center">🥛</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Visi Kami</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Menjadi toko susu online terpercaya #1 di Indonesia yang menyediakan produk
                  berkualitas premium dengan harga terjangkau untuk seluruh keluarga Indonesia.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Features Section */}
      <Container>
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Kami berkomitmen memberikan yang terbaik untuk pelanggan kami
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all transform hover:-translate-y-2"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </Container>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tim Kami
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Bersama-sama kami bekerja untuk memberikan pelayanan terbaik
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Contact CTA */}
      <Container>
        <div className="py-16">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full" />
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full" />
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full" />
            </div>

            <div className="relative z-10">
              <FiPhone className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ada Pertanyaan?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Tim customer service kami siap membantu Anda. Hubungi kami kapan saja!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+6281234567890"
                  className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-gray-100 transition-colors"
                >
                  Hubungi via Telepon
                </a>
                <a
                  href="mailto:info@tokosusu.com"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Kirim Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  )
}
