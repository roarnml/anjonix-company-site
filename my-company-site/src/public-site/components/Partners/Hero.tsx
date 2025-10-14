import { motion } from "framer-motion"
import bgPartners from "../../../assets/public-site/components/Partners/partners-bg.jpg" // Replace with your actual background image

export default function PartnersHero() {
  return (
    <section
      className="relative w-screen bg-cover bg-center text-white overflow-hidden"
      style={{ backgroundImage: `url(${bgPartners})` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      {/* Floating light orbs for subtle motion */}
      <div className="absolute top-20 left-10 w-[250px] h-[250px] bg-green-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-16 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent"
        >
          Our Trusted Partners
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-3xl"
        >
          Innovation thrives on collaboration.
          <br className="hidden md:block" />
          At <span className="font-semibold text-white">Anjonix Global</span>, we believe the best breakthroughs happen when bright minds unite.
          That’s why we proudly collaborate with leading institutions, companies, and innovators across technology, education, and agriculture — driving sustainable progress for communities across Africa and beyond.
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 w-24 h-[3px] bg-gradient-to-r from-blue-400 to-green-300 rounded-full"
        />
      </div>
    </section>
  )
}
