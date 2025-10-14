/*export default function TestimonialsCard() {
  const testimonials = [
    {
      name: "Grace U.",
      role: "School Principal",
      quote: "Anjonix transformed our school with their digital tools. Our students now learn better and faster."
    },
    {
      name: "Ahmed B.",
      role: "Farmer",
      quote: "Thanks to Anjonix's farm automation, I’ve doubled my harvest and reduced costs."
    }
  ];

  return (
    <div className="bg-white py-10 px-6 text-black">
      <h2 className="text-2xl font-bold text-center mb-6">What People Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, idx) => (
          <div key={idx} className="p-4 border rounded-lg">
            <p className="italic text-gray-700">"{t.quote}"</p>
            <p className="mt-2 text-sm font-semibold text-blue-700">{t.name}, <span className="text-gray-500">{t.role}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
*/

import { motion } from "framer-motion"
import { useState } from "react"
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa"

export default function TestimonialsCard() {
  const testimonials = [
    {
      name: "Grace U.",
      role: "School Principal",
      quote:
        "Anjonix transformed our school with their digital tools. Our students now learn better and faster — it’s a whole new experience.",
    },
    {
      name: "Ahmed B.",
      role: "Farmer",
      quote:
        "Thanks to Anjonix's farm automation, I’ve doubled my harvest and reduced costs. It’s like having a full team of experts in one system.",
    },
    {
      name: "Chidera L.",
      role: "Tech Trainee",
      quote:
        "The robotics lab was mind-blowing! I learned by actually *building* things. Anjonix gave me the spark to pursue real innovation.",
    },
    {
      name: "Okon J.",
      role: "Business Owner",
      quote:
        "Our security and automation setup is world-class now. Anjonix didn’t just deliver tech — they delivered peace of mind.",
    },
  ]

  const [index, setIndex] = useState(0)

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[index]

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center mb-10 text-gray-900"
      >
        In Their <span className="text-blue-600">Words</span>
      </motion.h2>

      <div className="max-w-3xl mx-auto relative flex flex-col items-center text-center">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl px-8 py-10 max-w-xl"
        >
          <FaQuoteLeft className="text-blue-400 text-3xl mx-auto mb-4 opacity-70" />
          <p className="text-lg italic text-gray-700 mb-6 leading-relaxed">
            “{current.quote}”
          </p>
          <h3 className="font-bold text-gray-900">{current.name}</h3>
          <p className="text-sm text-blue-600">{current.role}</p>
        </motion.div>

        {/* Navigation Arrows */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-full bg-gray-300 hover:bg-blue-500 hover:text-white transition"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextTestimonial}
            className="p-3 rounded-full bg-gray-300 hover:bg-blue-500 hover:text-white transition"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Floating background glow */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-400/30 rounded-full blur-3xl mix-blend-multiply animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-green-400/20 rounded-full blur-3xl mix-blend-multiply animate-pulse delay-500" />
    </section>
  )
}
