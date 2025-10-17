//import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaLeaf, FaChalkboardTeacher, FaHandshake } from "react-icons/fa";

export default function InnovationHub() {
  return (
    <div className="bg-gray-50 text-gray-800 overflow-hidden">

      {/* 🎥 HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center text-center text-white">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        >
          <source src="/videos/network-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Content */}
        <motion.div
          className="relative z-10 px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Building Tomorrow’s Solutions, Today
          </h1>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            The Anjonix Innovation Hub is where education, agriculture, and technology
            intersect to engineer sustainable futures for Africa — and beyond.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/collaborate"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-md text-white font-semibold"
            >
              Join Our Network
            </a>
            <a
              href="/pitch-idea"
              className="border border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-gray-900 transition"
            >
              Pitch an Idea
            </a>
          </div>
        </motion.div>
      </section>

      {/* 🧬 ABOUT THE HUB */}
      <section className="py-20 px-6 md:px-16 bg-white text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          A Cross-Tribal Innovation Engine
        </motion.h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-12">
          The Innovation Hub connects brilliant educators, engineers, and agricultural
          pioneers to co-create transformative solutions. We believe in innovation
          that’s inclusive, ethical, and rooted in real-world impact.
        </p>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-gray-100 p-8 rounded-xl hover:shadow-lg transition">
            <FaChalkboardTeacher size={40} className="text-blue-500 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Education</h3>
            <p>
              Building AI-enhanced learning systems that empower teachers and make
              education accessible to every student.
            </p>
          </div>
          <div className="bg-gray-100 p-8 rounded-xl hover:shadow-lg transition">
            <FaLeaf size={40} className="text-green-500 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Agriculture</h3>
            <p>
              Designing smart irrigation systems, drone farming, and data-driven
              agricultural analytics for African farms.
            </p>
          </div>
          <div className="bg-gray-100 p-8 rounded-xl hover:shadow-lg transition">
            <FaRobot size={40} className="text-yellow-500 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Technology</h3>
            <p>
              Pioneering AI, IoT, and clean energy systems that redefine how
              communities connect, grow, and thrive.
            </p>
          </div>
        </div>
      </section>

      {/* 🔬 LABS SECTION */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <h2 className="text-3xl font-bold text-center mb-12">Our Innovation Labs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "EdTech Lab",
              desc: "Developing digital classrooms and AI tutors for next-generation learning.",
              img: "/images/edtech-lab.jpg",
            },
            {
              title: "AgriTech Lab",
              desc: "Creating drone-assisted farming and precision irrigation systems.",
              img: "/images/agritech-lab.jpg",
            },
            {
              title: "GreenTech Lab",
              desc: "Advancing renewable energy and sustainable smart city solutions.",
              img: "/images/greentech-lab.jpg",
            },
            {
              title: "AI & Data Lab",
              desc: "Harnessing predictive analytics and machine learning for social good.",
              img: "/images/ai-lab.jpg",
            },
          ].map((lab, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-transform"
              whileHover={{ y: -8 }}
            >
              <img
                src={lab.img}
                alt={lab.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">{lab.title}</h3>
                <p className="text-gray-300 text-sm">{lab.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🚀 PROJECT HIGHLIGHTS */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Recent Breakthroughs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Solar IoT Farm Network",
              desc: "Remote monitoring of soil moisture, yield, and weather via IoT sensors.",
              img: "/images/solar-farm.jpg",
              link: "#",
            },
            {
              title: "AI Tutor Platform",
              desc: "Personalized learning engine for rural and urban classrooms.",
              img: "/images/ai-tutor.jpg",
              link: "#",
            },
            {
              title: "Smart Grid Energy System",
              desc: "Decentralized microgrids powering remote communities sustainably.",
              img: "/images/smart-grid.jpg",
              link: "#",
            },
          ].map((proj, idx) => (
            <motion.a
              href={proj.link}
              key={idx}
              className="block bg-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <img src={proj.img} alt={proj.title} className="h-48 w-full object-cover" />
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">{proj.title}</h3>
                <p className="text-gray-600 text-sm">{proj.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* 🤝 COLLABORATION */}
      <section className="py-20 px-6 bg-blue-50 text-center">
        <FaHandshake size={50} className="mx-auto text-blue-600 mb-6" />
        <h2 className="text-3xl font-bold mb-4">Collaborate With Us</h2>
        <p className="max-w-2xl mx-auto text-gray-700 mb-8">
          Whether you’re a researcher, startup founder, or government partner, we believe
          progress happens faster together. Let’s co-create scalable solutions that make
          lasting impact.
        </p>
        <a
          href="/contact"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition"
        >
          Partner With Anjonix
        </a>
      </section>

      {/* 🧑‍🤝‍🧑 PARTNERS */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">Trusted by Innovators Worldwide</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
          <img src="/logos/nitda.png" alt="NITDA" className="h-12" />
          <img src="/logos/unesco.png" alt="UNESCO" className="h-12" />
          <img src="/logos/microsoft.png" alt="Microsoft" className="h-12" />
          <img src="/logos/afdb.png" alt="AfDB" className="h-12" />
        </div>
      </section>

      {/* 🌱 FOOTER CTA */}
      <section className="bg-gray-900 text-white text-center py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Innovation isn’t a department — it’s our DNA.
        </h2>
        <p className="text-gray-400 mb-8">
          Join the Anjonix Innovation Hub today and help us build a smarter, greener
          Africa.
        </p>
        <a
          href="/join-hub"
          className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-md font-semibold"
        >
          Join the Hub
        </a>
      </section>
    </div>
  );
}
