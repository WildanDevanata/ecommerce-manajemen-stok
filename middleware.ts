import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const role = req.auth?.user?.role

  const isApiRoute = nextUrl.pathname.startsWith("/api")
  const isAdminRoute = nextUrl.pathname.startsWith("/admin")
  const isAuthRoute = nextUrl.pathname.startsWith("/signin") || nextUrl.pathname.startsWith("/signup")

  // 1. Izinkan jika itu API auth atau bukan rute yang diproteksi
  if (isApiRoute) return NextResponse.next()

  // 2. Jika user mencoba masuk ke /admin
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/signin", nextUrl))
    }
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl))
    }
  }

  // 3. Jika sudah login, jangan biarkan masuk ke halaman login lagi
  if (isAuthRoute && isLoggedIn) {
    const redirectUrl = role === "ADMIN" ? "/admin" : "/"
    return NextResponse.redirect(new URL(redirectUrl, nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  // Gunakan matcher yang lebih luas agar bisa menangkap logika auth
  matcher: ["/admin/:path*", "/signin", "/signup"]
}