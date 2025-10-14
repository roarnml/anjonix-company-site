/*import { Link } from "react-router-dom"

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
*/

import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function SpotlightFeature() {
  return (
    <section className="relative py-24 px-6 text-white overflow-hidden bg-gray-900">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="images/tech-bg.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <motion.h2
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          Where <span className="text-blue-400">Curiosity</span> Becomes{" "}
          <span className="text-green-400">Creation</span>.
        </motion.h2>

        <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto mb-10">
          Our robotics and smart-embedding training labs are unlike anything else — hands-on, visionary, 
          and built to inspire the next generation of creators. Students don’t just learn; they build, 
          test, and innovate in real time.
        </p>

        <Link
          to="/innovation-hub"
          className="inline-block bg-blue-600 hover:bg-transparent border-2 border-blue-600 text-white hover:text-blue-400 font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-md"
        >
          Explore the Hub →
        </Link>
      </motion.div>

      {/* Ambient Motion Orbs */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-green-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse delay-700" />
    </section>
  )
}
