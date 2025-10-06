import React from "react";
import ServiceCard from "./serviceCard";

const services = [
  {
    icon: "💻",
    title: "Tech Solutions",
    description: "Web & mobile apps, AI tools, cloud solutions, and digital transformation systems.",
  },
  {
    icon: "🔋",
    title: "Smart Energy Systems",
    description: "Solar, inverter setups, and energy automation for sustainable operations.",
  },
  {
    icon: "🛡️",
    title: "Cybersecurity & Surveillance",
    description: "Protective surveillance, audits, and threat detection for safety and compliance.",
  },
  {
    icon: "🎓",
    title: "Training & Certification",
    description: "Up-skilling programs in tech, energy, and IT tailored for youths and professionals.",
  },
  {
    icon: "🏫",
    title: "Smart Education Systems",
    description: "Smart classrooms, CBT platforms, e-learning systems for schools and institutions.",
  },
  {
    icon: "🌐",
    title: "Digital Presence Services",
    description: "Branding, web design, SEO and digital marketing to grow your online reach.",
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Our Core Services</h2>
          <p className="mt-4 text-lg text-gray-600">
            Powerful digital, energy, and educational solutions for modern institutions and businesses.
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
