// HeroCardCareers.jsx
import { motion } from "framer-motion";

export default function HeroCardCareers() {
  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden text-white">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/network-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 w-screen"
      >
        <motion.h1
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          Build the Future <br />
          <span className="text-blue-400">With Purpose</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
        >
          At <span className="font-semibold text-blue-400">Anjonix Global</span>, we don’t just
          work — we build, learn, and innovate with impact. Join a diverse team shaping Africa’s
          digital, agricultural, and educational transformation through{" "}
          <span className="font-medium text-white">intelligence, creativity, and bold ambition</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="/open-roles"
            className="bg-blue-600 hover:bg-transparent border-2 border-blue-600 hover:text-blue-400 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300 font-semibold"
          >
            Explore Careers
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
