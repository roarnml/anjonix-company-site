/*import { useState } from "react";

export default function NewsletterSignupCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending to backend
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section className=" bg-gradient-to-r from-blue-50 to-blue-100 py-12 rounded-lg shadow-md text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Join Our Community
        </h2>
        <p className="text-gray-600 mb-6">
          Stay updated on the latest innovations, success stories, and tech opportunities from Anjonix. Get insights, tips, and exclusive content.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        ) : (
          <div className="text-green-600 font-medium text-lg">
            🎉 Thank you for subscribing!
          </div>
        )}
      </div>
    </section>
  );
}
*/

import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function FinalCTA() {
  return (
    <section className="relative w-screen py-24 px-6 text-center bg-gradient-to-br from-blue-900 via-black to-green-800 text-white overflow-hidden">
      {/* Floating background orbs for futuristic flair */}
      <div className="absolute top-10 left-20 w-[250px] h-[250px] bg-blue-500/30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-20 w-[300px] h-[300px] bg-green-400/30 blur-3xl rounded-full animate-pulse delay-500"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 max-w-3xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight"
        >
          Ready to Build the Future With Us?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gray-200 text-lg md:text-xl max-w-2xl"
        >
          Join a community of innovators and investors who believe in a smarter, safer, and greener tomorrow.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-wrap justify-center gap-6 mt-4"
        >
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-transparent hover:border hover:border-blue-500 hover:text-blue-400 transition-all"
          >
            Sign Up
          </Link>
          <Link
            to="/demo"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-transparent hover:border hover:border-green-400 hover:text-green-300 transition-all"
          >
            Schedule a Demo
          </Link>
          <Link
            to="/contact"
            className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-transparent hover:border hover:border-white hover:text-white transition-all"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>

      {/* Subtle animated lines at the bottom for motion energy */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-400 to-blue-500"
        animate={{ backgroundPositionX: ["0%", "100%"] }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        style={{ backgroundSize: "200% 100%" }}
      />
    </section>
  )
}
