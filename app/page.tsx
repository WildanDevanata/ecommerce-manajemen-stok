import Hero from "@/components/landing/hero"
import Features from "@/components/landing/features"
import PopularProducts from "@/components/landing/populerproducts"
import CTA from "@/components/landing/cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <PopularProducts />
      <CTA />
    </>
  )
}