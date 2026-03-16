import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {

  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // jika belum login
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", nextUrl))
  }

  // jika masuk halaman admin tapi bukan admin
  if (
    nextUrl.pathname.startsWith("/admin") &&
    req.auth?.user?.role !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

})
export const config = {
  matcher: ["/admin/:path*"]
}