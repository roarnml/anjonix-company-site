/*import { motion } from "framer-motion";
import { FaLightbulb, FaLeaf, FaGlobeAfrica, FaChartLine, FaHandsHelping } from "react-icons/fa";

export default function CoreValuesCard() {
  const values = [
    { icon: <FaLightbulb />, title: "Innovation" },
    { icon: <FaHandsHelping />, title: "Impact" },
    { icon: <FaLeaf />, title: "Sustainability" },
    { icon: <FaChartLine />, title: "Scalability" },
    { icon: <FaGlobeAfrica />, title: "African Empowerment" }
  ];

  return (
    <div className="grid grid-cols-2 text-black md:grid-cols-5 gap-6 p-6">
      {values.map((value, idx) => (
        <motion.div
          key={idx}
          className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center justify-center text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-3xl mb-2">{value.icon}</div>
          <h3 className="font-semibold text-lg">{value.title}</h3>
        </motion.div>
      ))}
    </div>
  );
}
*/


import { motion } from "framer-motion"
import { FaLightbulb, FaLeaf, FaGlobeAfrica, FaChartLine, FaHandsHelping } from "react-icons/fa"

export default function MissionPulseSection() {
  const values = [
    { icon: <FaLightbulb />, title: "Innovation" },
    { icon: <FaHandsHelping />, title: "Impact" },
    { icon: <FaLeaf />, title: "Sustainability" },
    { icon: <FaChartLine />, title: "Scalability" },
    { icon: <FaGlobeAfrica />, title: "African Empowerment" },
  ]

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-100 py-20 px-6 text-center">
      {/* Heading and Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          We Connect <span className="text-blue-600">Innovation</span> With <span className="text-green-600">Impact</span>.
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          At Anjonix Global, our mission is simple — to empower businesses, individuals, and communities 
          with cutting-edge solutions in technology and agriculture. Whether it’s securing your assets, 
          automating your processes, or shaping the next generation of innovators, we bring ideas to life 
          with speed, simplicity, and style.
        </p>
      </motion.div>

      {/* Core Values Pulse Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
        {values.map((value, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.08, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300"
          >
            <div className="text-4xl text-blue-600 mb-3">{value.icon}</div>
            <h3 className="font-semibold text-lg text-gray-800">{value.title}</h3>
          </motion.div>
        ))}
      </div>

      {/* Background Pulse Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />
      </div>
    </section>
  )
}
