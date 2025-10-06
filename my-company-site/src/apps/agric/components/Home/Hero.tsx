// components/Hero.tsx
import { Button } from "../ui/button";
import { motion } from "framer-motion";
//import Image from "next/image";
import heroImg from "../../../../assets/tech/hero-tech.jpg"; // Replace with your actual image

export default function Hero() {
  return (
    <section className="bg-white pt-24 pb-12 px-6 md:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            Transforming Learning & Services<br />with <span className="text-blue-600">Tech Innovation</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            We build digital tools that power smart education, efficient services, and tech-enabled growth — tailored for institutions and communities.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button className="text-white bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-600">
              Explore Solutions
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full h-80 md:h-[400px]"
        >
            <img
                src={heroImg}
                alt="Hero Illustration"
                className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent opacity-50 rounded-lg"></div>
        </motion.div>
      </div>

      <motion.div
        className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-blue-100 opacity-40 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
    </section>
  );
}