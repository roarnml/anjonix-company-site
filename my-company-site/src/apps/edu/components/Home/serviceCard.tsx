import React from "react";

type Service = {
  icon: string; // Emoji or icon component
  title: string;
  description: string;
};

const ServiceCard: React.FC<Service> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transform hover:scale-[1.02] transition duration-300 ease-in-out">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <a href="#" className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
        Learn More →
      </a>
    </div>
  );
};

export default ServiceCard;
