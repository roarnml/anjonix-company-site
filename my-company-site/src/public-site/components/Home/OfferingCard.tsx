/*export default function OfferingCard() {
  const offerings = [
    {
      title: "Tech Solutions",
      description: "Web & mobile apps, AI tools, cybersecurity, cloud services — we build digital systems that scale.",
      color: "text-blue-600"
    },
    {
      title: "Smart Agriculture",
      description: "Empowering farmers and agribusinesses with technology-driven tools and data insights.",
      color: "text-green-600"
    },
    {
      title: "Education Services",
      description: "Modern learning platforms, training, curriculum design, and digital classrooms for the future.",
      color: "text-indigo-600"
    }
  ]

  return (
    <section className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">Our Core Offerings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {offerings.map((offering, index) => (
          <div key={index} className="p-6 bg-white shadow rounded">
            <h3 className={`text-xl font-bold mb-2 ${offering.color}`}>{offering.title}</h3>
            <p className="text-gray-600">{offering.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}*/

import edu from "../../../assets/public-site/components/Home/edu.jpg"
import tech from "../../../assets/public-site/components/Home/tech.jpg"
import agric from "../../../assets/public-site/components/Home/agric.png"
export default function OfferingCard() {
  const offerings = [
    {
      title: "Tech Solutions",
      description: "Anjonix Technology provides cutting-edge solutions to enhance security, energy efficiency, and digital connectivity. Anjonix Technology is dedicated to delivering smart, efficient, and future-ready technology solutions for homes, businesses, and institutions.",
      color: "from-blue-600 to-blue-800",
      image: tech, // Replace with actual image paths
    },
    {
      title: "Smart Agriculture",
      description: "Anjonix Agric-Investment is committed to modernizing agriculture through technology-driven solutions that ensure higher yields, lower costs, sustainable farming practices and agricultural investments through innovative farming techniques, agribusiness solutions, and high-quality farm products.",
      color: "from-green-600 to-green-800",
      image: agric, // Replace with actual image paths
    },
    {
      title: "Smart School Solutions",
      description: " We specialize in delivering innovative services, premium products and specialized trainings designed to help individuals and organizations looking to leverage technology effectively. We prioritize excellence and innovation as we work to promote digital transformation and long term value across educational and organizational systems. ",
      color: "from-indigo-600 to-indigo-800",
      image: edu, // Adjust path as necessary
    }
  ];

  return (
    <section className="py-16 px-6 bg-gray-100 w-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Our Core Offerings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-screen mx-auto">
        {offerings.map((offering, index) => (
          <div
            key={index}
            className="relative h-64 rounded-xl overflow-hidden shadow-lg group"
            style={{ backgroundImage: `url(${offering.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-2xl font-bold mb-1">{offering.title}</h3>
              <p className="text-sm">{offering.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
