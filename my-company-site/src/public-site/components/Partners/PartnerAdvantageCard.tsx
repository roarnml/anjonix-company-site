import { motion } from "framer-motion";

export default function PartnerAdvantageCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-10 overflow-hidden w-screen mx-auto"
    >
      {/* Decorative background gradient */}
      <div className="absolute inset-0 bg-[url('/images/tech-bg.jpg')] bg-cover bg-center opacity-10 blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-green-50/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">
          Why Partner With <span className="text-blue-700">Anjonix</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          {/* Card Items */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/70 border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">🚀 Market Expansion</h3>
            <p className="text-gray-700 leading-relaxed">
              Access emerging markets across Africa with localized expertise and strategic insight.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/70 border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-green-600 mb-2">🤝 Co-Innovation</h3>
            <p className="text-gray-700 leading-relaxed">
              Co-develop cutting-edge solutions in AI, IoT, and digital education for real-world impact.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/70 border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-yellow-600 mb-2">🌍 Brand Visibility</h3>
            <p className="text-gray-700 leading-relaxed">
              Amplify your presence through our extensive innovation ecosystem and media network.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/70 border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-purple-600 mb-2">🔬 Research & Impact</h3>
            <p className="text-gray-700 leading-relaxed">
              Collaborate on R&D programs that deliver measurable social and technological change.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Subtle glow effects */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-300/30 rounded-full blur-3xl"></div>
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-green-300/30 rounded-full blur-3xl"></div>
    </motion.div>
  );
}
