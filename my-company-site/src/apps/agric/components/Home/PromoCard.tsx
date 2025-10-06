// src/components/LandPromoSection.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import promoVideo from "../../images/arces.mp4"; // your uploaded file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';

export default function LandPromoSection() {
  const [muted, setMuted] = useState(true);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={promoVideo}
        autoPlay
        loop
        muted={muted}
        playsInline
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-4xl sm:text-6xl font-bold mb-6"
        >
          <FontAwesomeIcon icon={faSeedling} /> Own a Piece of the Future
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="text-lg sm:text-2xl max-w-2xl mb-8"
        >
          We’re offering <span className="text-green-400 font-bold">100 Acres </span> 
          of fertile farmland over the next 3 months. Don’t miss this opportunity!
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
        <a
          href="/agric/invest?promo=1"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition"
        >
          Buy Now
        </a>

          <a
            href="/agric/promo-details"
            className="px-6 py-3 border border-green-500 text-green-400 hover:bg-green-500 hover:text-white rounded-full transition"
          >
            Learn More
          </a>
        </motion.div>

        {/* Audio Toggle */}
        <button
          onClick={() => setMuted(!muted)}
          className="absolute bottom-6 right-6 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition"
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>
    </section>
  );
}
