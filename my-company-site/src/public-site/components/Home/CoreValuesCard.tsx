import { motion } from "framer-motion";
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
