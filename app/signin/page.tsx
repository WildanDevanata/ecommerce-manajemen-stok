import { LoginGoogleButton } from '@/components/shared/login-button'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In - Toko Susu Kita',
  description: 'Sign in to your account to access exclusive features and personalized shopping experience.',
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl">
              <span className="text-3xl">🥛</span>
            </div>
          </Link>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Selamat Datang Kembali
          </h2>
          <p className="mt-2 text-gray-600">
            Belum punya akun?{' '}
            <Link
              href="/auth/signup"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Daftar di sini
            </Link>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign In Your Account</h3>
            <p className="text-sm text-gray-600">
              Gunakan akun Google Anda untuk masuk dengan cepat dan aman
            </p>
          </div>

          <LoginGoogleButton />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  Atau gunakan email
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/auth/signin"
              className="w-full flex items-center justify-center px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              Sign in with Email
            </Link>
          </div>

          {/* Benefits */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-900 mb-3">Keuntungan Sign In:</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Checkout lebih cepat</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Lacak pesanan dengan mudah</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Dapatkan penawaran eksklusif</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Simpan wishlist produk favorit</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Dengan masuk, Anda menyetujui{' '}
          <Link href="/terms" className="font-semibold text-blue-600 hover:text-blue-700">
            Syarat & Ketentuan
          </Link>{' '}
          dan{' '}
          <Link href="/privacy" className="font-semibold text-blue-600 hover:text-blue-700">
            Kebijakan Privasi
          </Link>
        </p>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
