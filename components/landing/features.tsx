import Container from "../shared/container"

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-bold text-lg">Produk Fresh</h3>
            <p>Susu langsung dari supplier terpercaya.</p>
          </div>

          <div>
            <h3 className="font-bold text-lg">Pengiriman Cepat</h3>
            <p>Order diproses dalam waktu singkat.</p>
          </div>

          <div>
            <h3 className="font-bold text-lg">Harga Terjangkau</h3>
            <p>Kualitas terbaik dengan harga bersahabat.</p>
          </div>
        </div>
      </Container>
    </section>
  )
}