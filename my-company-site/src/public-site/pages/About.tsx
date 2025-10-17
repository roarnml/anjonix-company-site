import MilestonesSection from "../components/About/MilestonesSection";
import HeroSection from "../components/About/HeroSection";
import { motion } from "framer-motion";
import { FaCogs, FaSeedling, FaChalkboardTeacher } from "react-icons/fa";
import { useEffect, useState } from "react";
import Tooltip from "../components/Tooltip"; // Optional tooltip component

const coreValues = [
  { title: "Innovation", description: "We build for the future using AI, IoT, and automation." },
  { title: "Accessibility", description: "Solutions for both underserved and urban communities." },
  { title: "Integrity", description: "Transparency and ethical operations." },
  { title: "Collaboration", description: "Strong partnerships and teamwork." },
  { title: "Impact", description: "We aim for meaningful change, not just profits." },
];

const services = [
  {
    icon: <FaCogs size={30} />,
    title: "Technology Services & Smart Systems",
    description:
      "AI-powered solutions, smart homes, solar systems, and robust IT infrastructure tailored to African needs.",
  },
  {
    icon: <FaSeedling size={30} />,
    title: "Agricultural Innovation",
    description:
      "From land sale and setup to smart irrigation and data-driven farming – we transform African agriculture.",
  },
  {
    icon: <FaChalkboardTeacher size={30} />,
    title: "Smart Education Solutions",
    description:
      "Empowering institutions with digital classrooms, e-learning platforms, and interactive training systems.",
  },
];

const milestonesData = [
  { id: 1, text: "5000+ students across 40+ schools" },
  { id: 2, text: "Tech installations in 10+ Nigerian regions" },
  { id: 3, text: "Powered numerous farms and agribusinesses" },
  { id: 4, text: "Smart solutions for cities and remote areas" },
];

export default function About() {
  const [heights, setHeights] = useState<number[]>(Array(coreValues.length).fill(150));

  // Animate core values bars
  useEffect(() => {
    const interval = setInterval(() => {
      const newHeights = coreValues.map(() => Math.floor(Math.random() * 200) + 100);
      setHeights(newHeights);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <section className="py-20 px-6 bg-gray-50">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          What We Do
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 flex flex-col items-center text-center group"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <div className="text-blue-600 mb-4 text-5xl group-hover:animate-bounce">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 text-sm md:text-base">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-4xl font-bold mb-12">Our Core Values</h2>
        <div className="flex justify-center items-end gap-8 h-72 px-4 md:px-0">
          {coreValues.map((value, idx) => (
            <div key={value.title} className="flex flex-col items-center group relative">
              <motion.div
                className="w-10 rounded-t-md bg-blue-500 cursor-pointer"
                animate={{ height: `${heights[idx]}px` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <p className="mt-3 font-semibold">{value.title}</p>
              <Tooltip content={value.description} /> {/* Optional hover tooltip */}
            </div>
          ))}
        </div>
      </section>

      {/* Milestones Section */}
      <MilestonesSection milestones={milestonesData} />

      {/* CTA Section */}
      <section className="py-16 text-center">
        <motion.p
          className="text-2xl md:text-3xl text-blue-600 font-semibold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Join us in building a smarter Africa.
        </motion.p>
        <motion.a
          href="mailto:enquiry@anjonixgloballimited.com"
          className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-transparent hover:text-blue-600 border-2 border-blue-600 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Reach Out Today
        </motion.a>
      </section>
    </div>
  );
}
