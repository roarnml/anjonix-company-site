import { motion } from "framer-motion";

export default function PartnerCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative text-center overflow-hidden rounded-3xl shadow-2xl mb-24 py-20 px-6 md:px-12"
    >
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-[url('/images/tech-bg.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-700/80 to-indigo-800/90"></div>
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      {/* Glow Effects */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
        >
          Let’s <span className="text-blue-300">Build the Future</span> — Together
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed"
        >
          Join the <span className="font-semibold text-white">Anjonix Global</span> partner network and
          co-create breakthrough technologies, educational systems, and sustainable agricultural ecosystems.
        </motion.p>

        <motion.a
          href="/partner/signup"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.6)" }}
          whileTap={{ scale: 0.98 }}
          className="inline-block bg-blue-500 hover:bg-blue-600 hover:text-white hover:underline text-white px-10 py-4 rounded-xl font-semibold text-lg tracking-wide transition-all duration-300 shadow-md border border-blue-300"
        >
          Become a Partner
        </motion.a>
      </div>

      {/* Animated Accent Line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400"
      />
    </motion.section>
  );
}
