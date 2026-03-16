"use client"

import { LoginGoogleButton } from "@/components/shared/login-button"
import Link from "next/link"
import { Metadata } from "next"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignInPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      alert("Email atau password salah")
      return
    }

    const session = await fetch("/api/auth/session").then(res => res.json())

    if (session?.user?.role === "ADMIN") {
      router.push("/admin")
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">

      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-md w-full relative z-10">

        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
              <span className="text-3xl">🥛</span>
            </div>
          </Link>

          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Selamat Datang Kembali
          </h2>

          <p className="mt-2 text-gray-600">
            Belum punya akun?{" "}
            <Link href="/auth/signup" className="text-blue-600 font-semibold">
              Daftar di sini
            </Link>
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border p-8">

          <h3 className="text-lg font-semibold mb-2">
            Sign In Your Account
          </h3>

          <p className="text-sm text-gray-600 mb-6">
            Gunakan Google atau email untuk masuk
          </p>

          {/* Google Login */}
          <LoginGoogleButton />

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">
                or Login with Email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">

            <div>
              <label className="text-sm font-semibold text-gray-800">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-lg bg-pink-100 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-800">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-lg bg-pink-100 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember Me
              </label>

              <Link
                href="/forgot-password"
                className="text-blue-600 font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg hover:opacity-90"
            >
              Login
            </button>

            {/* Signup */}
            <p className="text-center text-sm text-gray-600">
              Not registered yet?{" "}
              <Link
                href="/auth/signup"
                className="text-blue-600 font-semibold"
              >
                Create an account
              </Link>
            </p>

          </form>

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Dengan masuk Anda menyetujui{" "}
          <Link href="/terms" className="text-blue-600 font-semibold">
            Syarat & Ketentuan
          </Link>{" "}
          dan{" "}
          <Link href="/privacy" className="text-blue-600 font-semibold">
            Kebijakan Privasi
          </Link>
        </p>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-gray-600">
            ← Kembali ke Beranda
          </Link>
        </div>

      </div>
    </div>
  )
}