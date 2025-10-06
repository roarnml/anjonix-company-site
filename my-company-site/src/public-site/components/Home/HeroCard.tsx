import { Link } from "react-router-dom"

export default function HeroCard() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-64 px-1 text-center text-white"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1500&q=80')`,
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to <span className="text-blue-400">Anjonix Global Limited</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Our goal is to provide cutting-edge services, high-quality products, and specialized training to individuals and businesses looking to harness the power of technology and sustainable agriculture
        </p>
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link
            to="/tech"
            className="bg-blue-600 text-white hover:border-blue-600 hover:border-2 hover:text-blue-600 hover:bg-transparent px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Explore Tech
          </Link>
          <Link
            to="/agric"
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition hover:border-green-600 hover:border-2 hover:text-green-600 hover:bg-transparent"
          >
            Explore Agriculture
          </Link>
          <Link
            to="/edu"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition hover:border-indigo-600 hover:border-2 hover:text-indigo-600 hover:bg-transparent"
          >
            Explore Education
          </Link>
        </div>
      </div>
    </section>
  )
}
