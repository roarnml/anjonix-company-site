import { motion } from "framer-motion"
import bgImage from "../../../assets/tech/tech-bg2.jpg" // 🖼️ Replace with your background image

export default function AboutAnjonix() {
  return (
    <section
      className="relative w-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center flex flex-col items-center justify-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold tracking-wide mb-6 bg-gradient-to-r from-blue-400 to-green-300 bg-clip-text text-transparent"
        >
          Innovation. Integrity. Impact.
        </motion.h2>

        {/* Body Copy */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-gray-200 mb-10"
        >
          Founded on the belief that technology and agriculture can evolve together, 
          <span className="font-semibold text-white"> Anjonix Global Limited </span> 
          delivers holistic solutions that bridge the digital divide. 
          From smart surveillance systems to sustainable farmlands, 
          we’re shaping the future — one bold, intelligent idea at a time.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="w-24 h-[3px] bg-gradient-to-r from-green-400 to-blue-500 mb-10"
        />

        {/* Mini-quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="italic text-gray-300 text-xl font-medium"
        >
          “If you don’t do it, who will? Why not do it — and do it better.”
        </motion.blockquote>
      </div>

      {/* Decorative floating lights */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-[250px] h-[250px] bg-green-400/30 rounded-full blur-3xl animate-pulse delay-700" />
    </section>
  )
}
