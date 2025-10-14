

/*import edu from "../../../assets/public-site/components/Home/edu.jpg"
import tech from "../../../assets/public-site/components/Home/tech.jpg"
import agric from "../../../assets/public-site/components/Home/agric.png"
export default function OfferingCard() {
  const offerings = [
    {
      title: "Tech Solutions",
      description: "Anjonix Technology provides cutting-edge solutions to enhance security, energy efficiency, and digital connectivity. Anjonix Technology is dedicated to delivering smart, efficient, and future-ready technology solutions for homes, businesses, and institutions.",
      color: "from-blue-600 to-blue-800",
      image: tech, // Replace with actual image paths
    },
    {
      title: "Smart Agriculture",
      description: "Anjonix Agric-Investment is committed to modernizing agriculture through technology-driven solutions that ensure higher yields, lower costs, sustainable farming practices and agricultural investments through innovative farming techniques, agribusiness solutions, and high-quality farm products.",
      color: "from-green-600 to-green-800",
      image: agric, // Replace with actual image paths
    },
    {
      title: "Smart School Solutions",
      description: " We specialize in delivering innovative services, premium products and specialized trainings designed to help individuals and organizations looking to leverage technology effectively. We prioritize excellence and innovation as we work to promote digital transformation and long term value across educational and organizational systems. ",
      color: "from-indigo-600 to-indigo-800",
      image: edu, // Adjust path as necessary
    }
  ];

  return (
    <section className="py-16 px-6 bg-gray-100 w-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Our Core Offerings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-screen mx-auto">
        {offerings.map((offering, index) => (
          <div
            key={index}
            className="relative h-64 rounded-xl overflow-hidden shadow-lg group"
            style={{ backgroundImage: `url(${offering.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-2xl font-bold mb-1">{offering.title}</h3>
              <p className="text-sm">{offering.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
*/

import { motion } from "framer-motion"
import edu from "../../../assets/public-site/components/Home/edu.jpg"
import tech from "../../../assets/public-site/components/Home/tech.jpg"
import agric from "../../../assets/public-site/components/Home/agric.png"

export default function WhatWeDoSection() {
  const offerings = [
    {
      title: "Tech Solutions",
      description:
        "Smart surveillance, custom automation, and enterprise-grade IT support that keep your systems alive and your mind at ease.",
      color: "from-blue-600 to-blue-800",
      image: tech,
    },
    {
      title: "Education & Training",
      description:
        "Robotics, embedded systems, and web development courses that make learning fun, practical, and future-proof.",
      color: "from-indigo-600 to-indigo-800",
      image: edu,
    },
    {
      title: "Agriculture & Investment",
      description:
        "From agri-tech tools to secure farmland investment opportunities, we make the future of farming digital, safe, and profitable.",
      color: "from-green-600 to-green-800",
      image: agric,
    },
  ]

  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          🧠 What We Do
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          We turn ideas into intelligent ecosystems — blending technology, education, and agriculture to build
          a connected future that works for everyone.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {offerings.map((offering, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            className={`relative h-80 rounded-2xl overflow-hidden shadow-xl cursor-pointer group bg-gradient-to-br ${offering.color}`}
          >
            {/* Background Image */}
            <img
              src={offering.image}
              alt={offering.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-40 transition duration-500"
            />

            {/* Overlay and Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:opacity-90 transition duration-500"></div>
            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white transition-all duration-500 group-hover:translate-y-[-5px]">
              <h3 className="text-2xl font-bold mb-2">{offering.title}</h3>
              <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                {offering.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Animated Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700" />
    </section>
  )
}
