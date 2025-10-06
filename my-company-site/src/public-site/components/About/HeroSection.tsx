// HeroSection.tsx

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 px-6 sm:px-10 md:px-20 overflow-hidden">
      {/* Background Animation Bubbles */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6"
        >
          Driving Innovation at the Intersection of <br />
          <span className="text-blue-600">Technology</span>,{" "}
          <span className="text-green-600">Agriculture</span>, and{" "}
          <span className="text-yellow-500">Education</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-600 mb-8"
        >
          <h1 className="text-2xl font-bold mb-4 font-mono">
            Contact Information
          </h1>
          Email: 
          <a
            href="mailto:enquiry@anjonixgloballimited.com" className="text-blue-600 hover:underline"> enquiry@anjonixgloballimited.com</a>
          <br />
          Phone: 
          <a href="tel:+8801712345678" className="text-blue-600 hover:underline"> +234 907 902 8605 </a>
          <br />
          <blockquote>
          Address: 
            <br /> 87, Idiroko Road, Ajenifuja Complex, Oju-ore, Ota, Ogun State, Nigeria.
            <br /> Purity Alpha Workspace 45, Opebi Road, Ikeja
          </blockquote>


        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center gap-4"
        >
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
            Explore Solutions
          </button>
          {/*<button className="border border-gray-300 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-100 transition">
            Contact Us
          </button>*/}
        </motion.div>
      </div>
    </section>
  );
}
