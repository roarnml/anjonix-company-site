import { Link } from "react-router-dom"

export default function CTASection() {
  return (
    <section className="py-16 px-6 text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Partner with Us</h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-6">
        Whether you're a business, institution, or individual — let's build solutions together that make impact.
      </p>
      <Link
        to="/partners"
        className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Become a Partner
      </Link>
    </section>
  )
}
