import { motion } from 'framer-motion';
import { FaApple, FaAndroid } from 'react-icons/fa';

type AppShowcase = {
  name: string;
  description: string;
  features: string[];
  imageUrl: string;
  iosLink?: string;
  androidLink?: string;
};

const apps: AppShowcase[] = [
  {
    name: 'Smart School App',
    description: 'A seamless app for parents, students, and teachers to interact, track progress, and access digital learning resources.',
    features: ['E-Learning', 'Student Progress Tracking', 'Secure Messaging'],
    imageUrl: 'https://images.unsplash.com/photo-1738640679960-58d445857945?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // School + tablet
    iosLink: '#',
    androidLink: '#',
  },
  {
    name: 'AgroSmart Manager',
    description: 'Empowering farmers with precision tools, weather updates, market trends, and AI-based crop advisory.',
    features: ['Farm Mapping', 'Real-Time Alerts', 'AI Crop Advisor'],
    imageUrl: 'https://images.unsplash.com/photo-1729860646385-3e71fb29ff04?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Farming tech + app
    iosLink: '#',
    androidLink: '#',
  },
  {
    name: 'Anjonix Utilities',
    description: 'Control smart home systems, manage energy consumption, and monitor security – all from your palm.',
    features: ['Smart Device Control', 'Energy Analytics', 'Security Monitor'],
    imageUrl: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1200&q=80', // Smart home UI
    iosLink: '#',
    androidLink: '#',
  },
];


export default function MobileAppShowcaseCard() {
  return (
    <section className="py-20 bg-white" id="mobile-apps">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Explore Our Mobile Apps
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Access powerful tools and services on the go — built for convenience, speed, and impact.
        </p>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 border border-gray-100 rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              <img
                src={app.imageUrl}
                alt={app.name}
                className="w-full h-56 object-contain p-6 bg-white"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{app.name}</h3>
                <p className="text-sm text-gray-600 my-3">{app.description}</p>
                <ul className="text-sm text-gray-700 mb-4 space-y-1">
                  {app.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
                <div className="flex space-x-4">
                  {app.androidLink && (
                    <a
                      href={app.androidLink}
                      className="inline-flex items-center px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                    >
                      <FaAndroid className="mr-2" /> Android
                    </a>
                  )}
                  {app.iosLink && (
                    <a
                      href={app.iosLink}
                      className="inline-flex items-center px-3 py-1 text-sm text-white bg-gray-800 rounded hover:bg-black"
                    >
                      <FaApple className="mr-2" /> iOS
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
