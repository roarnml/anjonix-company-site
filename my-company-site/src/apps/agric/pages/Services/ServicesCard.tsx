/*import React from "react";
import Card from "../../components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode; // optional (could use lucide-react icons)
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <Card>
      <div className="flex items-start gap-4">
        {icon && <div className="text-green-600 text-3xl">{icon}</div>}
        <div>
          <h2 className="text-xl font-semibold text-green-700 mb-2">{title}</h2>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
    </Card>
  );
}
*/

//import React from "react";
import Card from "../../components/ui/card";

interface Service {
  title: string;
  description: string;
  videoSrc: string;
}

const services: Service[] = [
  {
    title: "Soil Testing & Analysis",
    description: "Comprehensive soil and water tests to guide crop and fertilizer choices.",
    videoSrc: "/videos/soil.mp4",
  },
  {
    title: "Land Preparation",
    description: "Efficient plowing, leveling, and bed preparation for maximum yields.",
    videoSrc: "/videos/land.mp4",
  },
  {
    title: "Irrigation Systems",
    description: "Installation of modern drip, sprinkler, and solar-powered irrigation systems.",
    videoSrc: "/videos/irrigation.mp4",
  },
  {
    title: "Greenhouse Construction",
    description: "Durable and climate-smart greenhouses for year-round production.",
    videoSrc: "/videos/greenhouse.mp4",
  },
  {
    title: "Farm Design & Layout",
    description: "Smart farm planning: crop zoning, drainage, and access routes.",
    videoSrc: "/videos/design.mp4",
  },
  {
    title: "Post-Harvest Solutions",
    description: "Pack houses, cold rooms, and storage to reduce losses.",
    videoSrc: "/videos/postharvest.mp4",
  },
];

function ServiceCard({ title, description, videoSrc }: Service) {
  return (
    <Card className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer">
      {/* Background video */}
      <video
        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        autoPlay
        loop
        muted
        playsInline
        src={videoSrc}
      />

      {/* Dark overlay with text */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-200 text-sm">{description}</p>
        </div>
      </div>
    </Card>
  );
}

export default function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-green-700 mb-10 text-center">
          Our Farm Setup Services
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
