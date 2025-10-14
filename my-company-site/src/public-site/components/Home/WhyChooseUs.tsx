import { motion } from "framer-motion"
import { FaShieldAlt, FaChartLine, FaCogs, FaHandsHelping } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function WhyChooseAnjonix() {
  const features = [
    {
      icon: <FaShieldAlt className="text-blue-500" />,
      title: "Airtight Security",
      description: "Smart surveillance and defense-grade protection that keeps your assets secure and your operations uninterrupted."
    },
    {
      icon: <FaChartLine className="text-green-500" />,
      title: "Progressive Investment",
      description: "Transparent, safe, and future-ready agric ventures that grow your wealth sustainably."
    },
    {
      icon: <FaCogs className="text-indigo-500" />,
      title: "Seamless Automation",
      description: "Powered by AI, designed for humans — we simplify complexity so you can focus on impact."
    },
    {
      icon: <FaHandsHelping className="text-yellow-500" />,
      title: "Trusted Support",
      description: "We walk the journey with you — from concept to deployment and beyond."
    }
  ]

  return (
    <section className="relative bg-gradient-to-b from-gray-100 to-white py-20 px-6 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
          Why Choose <span className="text-blue-600">Anjonix?</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-700">
          One Team. Infinite Possibilities.
        </p>
      </motion.div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        viewport={{ once: true }}
        className="mt-14 flex justify-center"
      >
        <Link
          to="/about"
          className="bg-blue-600 hover:bg-transparent border-2 border-blue-600 text-white hover:text-blue-600 font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-md"
        >
          Discover How →
        </Link>
      </motion.div>

      {/* Ambient Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500" />
    </section>
  )
}
