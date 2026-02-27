import "./globals.css"
import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        {/* <Navbar /> */}
        {children}
        <Footer />
      </body>
    </html>
  )
}