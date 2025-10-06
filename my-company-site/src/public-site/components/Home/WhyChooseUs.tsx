import { FaBrain, FaMapMarkerAlt, FaCogs } from "react-icons/fa";

const items = [
  { icon: <FaBrain />, label: "AI-Powered" },
  { icon: <FaMapMarkerAlt />, label: "Local Expertise" },
  { icon: <FaCogs />, label: "End-to-End Solutions" }
];

export default function WhyChooseUsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-8">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center space-x-4 p-4 bg-white shadow rounded-xl">
          <div className="text-2xl">{item.icon}</div>
          <h3 className="text-lg font-semibold">{item.label}</h3>
        </div>
      ))}
    </div>
  );
}
