import { motion } from 'framer-motion';
import { FaLightbulb, FaTools, FaRocket, FaChartLine } from 'react-icons/fa';

const steps = [
  {
    title: 'Step 1: Discover Needs',
    description: 'We engage with clients to deeply understand their unique challenges and objectives.',
    icon: <FaLightbulb size={30} />,
  },
  {
    title: 'Step 2: Design Solution',
    description: 'We architect tailored technology, agriculture, or educational solutions with scalability in mind.',
    icon: <FaTools size={30} />,
  },
  {
    title: 'Step 3: Deploy & Train',
    description: 'We deploy systems, train users, and provide ongoing support for effective usage.',
    icon: <FaRocket size={30} />,
  },
  {
    title: 'Step 4: Monitor & Optimize',
    description: 'Continuous performance monitoring and optimization ensure long-term success.',
    icon: <FaChartLine size={30} />,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">How It Works</h2>
        <p className="text-gray-600 mb-12">
          Our streamlined process ensures high-impact results from discovery to deployment and beyond.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              <div className="flex justify-center mb-4 text-blue-600">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
