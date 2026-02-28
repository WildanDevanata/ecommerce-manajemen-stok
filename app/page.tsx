import Hero from "@/components/landing/hero"
import Features from "@/components/landing/features"
import PopularProducts from "@/components/landing/populerproducts"
import CTA from "@/components/landing/cta"
import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <PopularProducts />
      <CTA />
      <Footer />
    </>
  )
}