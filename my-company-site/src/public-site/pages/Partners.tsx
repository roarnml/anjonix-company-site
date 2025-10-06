//import React from "react";

const partners = [
  {
    name: "SmartAgro Nigeria",
    category: "Agriculture & Environmental",
    logo: "/logos/smartagro.png",
    link: "https://smartagro.ng",
    testimonial:
      "Partnering with Anjonix enabled us to expand precision farming access to underserved communities. Their technical support and field expertise are unmatched.",
  },
  {
    name: "EduSync Africa",
    category: "Education & Academy",
    logo: "/logos/edusync.png",
    link: "https://edusync.africa",
    testimonial:
      "Anjonix Academy has been a catalyst for digital transformation in our partner schools. Their approach to smart learning is both innovative and practical.",
  },
  {
    name: "TechCore Cloud",
    category: "Technology",
    logo: "/logos/techcore.png",
    link: "https://techcorecloud.com",
    testimonial:
      "With Anjonix, we jointly deliver scalable cloud and smart home solutions across Nigeria and beyond. A reliable and visionary team.",
  },
];

export default function Partners() {
  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-4">Our Trusted Partners</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        At Anjonix, collaboration fuels innovation. We proudly work alongside
        industry leaders, institutions, and service providers to deliver
        cutting-edge tech, agricultural, and educational solutions.
      </p>

      {/* Partner Logos */}
      <section className="mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center justify-center">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white shadow-sm hover:shadow-md transition p-4 rounded-lg flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 object-contain grayscale hover:grayscale-0 transition"
              />
            </a>
          ))}
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Success Stories</h2>
        <div className="space-y-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm"
            >
              <h3 className="text-xl font-bold mb-1">{partner.name}</h3>
              <p className="text-sm text-gray-500 italic mb-2">
                {partner.category}
              </p>
              <p className="text-gray-700">{partner.testimonial}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Partner with Us */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Why Partner with Us?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Access to emerging markets in Africa</li>
          <li>Collaborative innovation in tech, education, and agriculture</li>
          <li>Brand exposure via our growing platform</li>
          <li>Shared R&D opportunities in machine learning and IoT</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center mb-16 bg-blue-50 p-8 rounded-xl">
        <h2 className="text-2xl font-semibold mb-2">Let’s Build the Future Together</h2>
        <p className="text-gray-600 mb-4">
          Interested in becoming a partner? We’d love to collaborate.
        </p>
        <a
          href="partner/signup"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Become a Partner
        </a>
      </section>

      {/* Contact */}
      <section className="text-center text-sm text-gray-500">
        <p>
          Need help? Contact our partnership team at{" "}
          <a href="mailto:partnersupport@anjonix.com" className="underline">
            enquiry@anjonixgloballimited.com
          </a>
        </p>
        <p>
          Or call us at: <strong>+234-901-995-4473, +234-907-902-8605</strong>
        </p>
      </section>
    </div>
  );
}
