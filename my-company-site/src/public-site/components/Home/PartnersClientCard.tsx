import { motion } from "framer-motion";

const logos = [
  "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png",         // Apple
  "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png",       // Amazon
  "https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png",       // Google
  "https://1000logos.net/wp-content/uploads/2017/04/Microsoft-Logo.png",     // Microsoft
  "https://1000logos.net/wp-content/uploads/2021/10/Meta-Logo.png",
  "https://1000logos.net/wp-content/uploads/2023/06/Starlink-Aviation-Logo.png"
];


export default function PartnersClientsCard() {
  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold text-black text-center mb-6">Our Partners & Clients</h2>
      <div className="flex overflow-x-auto space-x-6 justify-center">
        {logos.map((logo, idx) => (
          <motion.img
            key={idx}
            src={logo}
            alt={`Logo ${idx}`}
            className="h-16"
            whileHover={{ scale: 1.1 }}
          />
        ))}
      </div>
    </div>
  );
}
