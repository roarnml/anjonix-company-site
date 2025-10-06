import MilestonesSection from "../components/About/MilestonesSection";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCogs, FaSeedling, FaChalkboardTeacher } from "react-icons/fa";
import HeroSection from "../components/About/HeroSection";


const milestonesData = [
  { id: 1, text: "5000+ students across 40+ schools" },
  { id: 2, text: "Tech installations in 10+ Nigerian regions" },
  { id: 3, text: "Powered numerous farms and agribusinesses" },
  { id: 4, text: "Smart solutions for cities and remote areas" },
];

// Core Values Data
/*const coreValues = [
  {
    title: "Innovation",
    description: "We build for the future using AI, IoT, and automation.",
  },
  {
    title: "Accessibility",
    description:
      "Solutions for both underserved and urban communities.",
  },
  {
    title: "Integrity",
    description: "Transparency and ethical operations.",
  },
  {
    title: "Collaboration",
    description: "Strong partnerships and teamwork.",
  },
  {
    title: "Impact",
    description: "We aim for meaningful change, not just profits.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};*/

const coreValues = [
  "Innovation",
  "Accessibility",
  "Integrity",
  "Collaboration",
  "Impact",
];

// Services
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

export default function About() {
  /*const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    fetch("/api/milestones") // Replace with your endpoint
      .then((res) => res.json())
      .then((data) => setMilestones(data))
      .catch((err) => console.error("Failed to load milestones", err));
  }, []);*/
  const [heights, setHeights] = useState<number[]>(
    Array(coreValues.length).fill(200)
  );

  // Randomize graph heights every 1s
  useEffect(() => {
    const interval = setInterval(() => {
      const newHeights = coreValues.map(() =>
        Math.floor(Math.random() * 200) + 50
      );
      setHeights(newHeights);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
  <div className="px-6 py-12 max-w-5xl mx-auto">
    <HeroSection />
    <section className="mb-16">
      <motion.h2
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        What We Do
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg p-6 rounded-xl text-center border hover:border-blue-500 transition duration-300 group"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="mb-4 text-blue-600 group-hover:animate-bounce">
              {service.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>


    {/*<motion.section
      className="mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-2xl sm:text-3xl font-semibold mb-6 text-center sm:text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Core Values
      </motion.h2>

      <motion.ul className="space-y-4 text-gray-700 text-base sm:text-lg">
        {coreValues.map((value, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            className="flex items-start gap-2"
          >
            <span className="text-blue-600 mt-1 font-bold">•</span>
            <span>
              <strong>{value.title}:</strong> {value.description}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>*/}
    <section className="mb-12 text-center">
      <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
      <div className="flex justify-center items-end gap-6 h-64 px-4">
        {coreValues.map((value, idx) => (
          <div key={value} className="flex flex-col items-center">
            <motion.div
              className="w-8 rounded-t-md bg-blue-500"
              animate={{ height: `${heights[idx]}px` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <p className="mt-2 text-sm font-medium">{value}</p>
          </div>
        ))}
      </div>
    </section>


    {/* Other sections */}
    <MilestonesSection milestones={milestonesData} />

    <p className="text-center text-blue-600 font-medium">
      Join us in building a smarter Africa.
    </p>
  </div>
)};
