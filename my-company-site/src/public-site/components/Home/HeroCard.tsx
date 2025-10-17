/*import { Link } from "react-router-dom"

export default function HeroCard() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-64 px-1 text-center text-white"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1500&q=80')`,
      }}
    >
      {/* Overlay for readability *}
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
*/

import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function HeroCard() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden text-white flex items-center justify-center">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="images/robotics-bg.mp4" 
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          Building a{" "}
          <span className="text-blue-400">Smarter</span>,{" "}
          <span className="text-green-400">Safer</span>, and{" "}
          <span className="text-yellow-400">Greener</span> Tomorrow —{" "}
          <span className="block mt-2 text-white">One Innovation at a Time.</span>
        </motion.h1>

        <p className="text-lg md:text-xl text-gray-200 mb-10">
          From intelligent surveillance to futuristic farms, Anjonix Global delivers seamless tech, 
          education, and agricultural solutions built for your success.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-transparent border-2 border-blue-600 hover:text-blue-400 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold"
          >
            Sign Up
          </Link>
          <Link
            to="/contact"
            className="bg-yellow-500 hover:bg-transparent border-2 border-yellow-500 hover:text-yellow-400 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
