import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
        {/* Fallback image if video fails */}
        <img src="/images/hero-bg.jpg" alt="Background" />
      </video>

      {/* Overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* Decorative animated bubbles (optional) */}
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col justify-center items-center text-center h-full px-6 sm:px-10 md:px-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6"
        >
          Driving Innovation at the Intersection of <br />
          <span className="text-blue-400">Technology</span>,{" "}
          <span className="text-green-400">Agriculture</span>, and{" "}
          <span className="text-yellow-300">Education</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-white text-base md:text-lg mb-8 max-w-3xl"
        >
          <h2 className="text-2xl font-bold mb-4 font-mono">
            Contact Information
          </h2>
          <p>
            Email:{" "}
            <a
              href="mailto:enquiry@anjonixgloballimited.com"
              className="text-blue-300 hover:underline"
            >
              enquiry@anjonixgloballimited.com
            </a>
            <br />
            Phone:{" "}
            <a
              href="tel:+2349079028605"
              className="text-blue-300 hover:underline"
            >
              +234 907 902 8605
            </a>
            <br />
            Address: <br />
            87, Idiroko Road, Ajenifuja Complex, Oju-ore, Ota, Ogun State, Nigeria.
            <br />
            Purity Alpha Workspace 45, Opebi Road, Ikeja
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="/solutions"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
          >
            Explore Solutions
          </a>
          <a
            href="mailto:enquiry@anjonixgloballimited.com"
            className="border border-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white hover:text-black transition"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
