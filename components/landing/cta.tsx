import Container from "../shared/container"
import Link from "next/link"

export default function CTA() {
  return (
    <section className="py-20 text-center">
      <Container>
        <h2 className="text-3xl font-bold mb-4">
          Mulai Belanja Sekarang
        </h2>

        <Link
          href="/products"
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Belanja
        </Link>
      </Container>
    </section>
  )
}