import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

type CaseStudy = {
  title: string;
  description: string;
  client: string;
  impact: string;
  imageUrl: string;
};
const caseStudies: CaseStudy[] = [
  {
    title: 'Smart School Transformation',
    description:
      'We deployed a fully digital ecosystem including smart boards, biometric systems, and e-learning modules for a regional school district.',
    client: 'Unity High School, Lagos',
    impact: 'Increased student engagement by 65% within 6 months.',
    imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80', // Classroom with tech
  },
  {
    title: 'AI-Powered Farm Management',
    description:
      'Implemented precision farming tools including drone analysis and IoT sensors for an agro-allied company.',
    client: 'GreenHarvest Farms, Kaduna',
    impact: 'Boosted crop yield by 40% and reduced manual labor by 60%.',
    imageUrl: 'https://images.unsplash.com/photo-1601171762745-71734e8f1d08?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Drone over farm
  },
  {
    title: 'Enterprise Cybersecurity Deployment',
    description:
      'Deployed an AI-driven threat detection and response system across a financial institution.',
    client: 'FinSecure Bank, Abuja',
    impact: 'Reduced incident response time from hours to minutes.',
    imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80', // Cybersecurity tech image
  },
];


export default function CaseStudiesCard() {
  return (
    <section className="py-16 bg-gray-50" id="case-studies">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Real Impact. Real Results.
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Here’s how we’re driving change across sectors using smart, scalable technologies.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              <img
                src={study.imageUrl}
                alt={study.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{study.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{study.description}</p>
                <div className="text-sm text-blue-600 font-medium mb-2">
                  <FaCheckCircle className="inline-block mr-1 text-green-500" />
                  Client: {study.client}
                </div>
                <p className="text-sm text-gray-700 italic">Impact: {study.impact}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
