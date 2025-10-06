import img from "../images/palmhero.mp4"
import img1 from "../images/land.mp4"
import img2 from "../images/plantation.mp4"
import img6 from "../images/yield.mp4"
import img3 from "../images/roi.mp4"
import img4 from "../images/transparency.jpeg"
import img5 from "../images/services.mp4"
import LandPromoSection from "../components/Home/PromoCard";
//import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import FlyerOnVideo from "../components/Home/FlyerCard"

export default function AgriHome() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={img} type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-green-300 mb-4">
            Welcome to Anjonix Agriculture
          </h1>
          <p className="text-white text-lg sm:text-xl max-w-2xl mb-6">
            Driving innovation in modern farming. Explore smart tools, agritech solutions, 
            and digital transformation in agriculture.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/agric/invest"
              className="px-6 py-3 bg-green-700 text-white hover:text-green-700 rounded-full shadow hover:bg-transparent hover:border-2 hover:border-green-700 transition"
            >
              Explore Agricultural Investment
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-green-700 text-green-700 rounded-full hover:bg-green-700 hover:text-white transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>



      {/* Land Investment Highlights */}
      {/* Land Investment Highlights with Video Cards */}
      <section id="investment" className="w-full bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            Why Invest with Anjonix Agriculture?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Secure your future with land ownership and high-yield palm plantation
            investments backed by transparency and professional management.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Land Ownership & Development",
                desc: "Investors can purchase land from our 100 acre plantation, with full documentation and management provided by Anjonix.",
                video: img1,
              },
              {
                title: "Planting & Maintenance",
                desc: "Each acre is cultivated with 60 hybrid seedlings at optimal spacing with 9m, with professional management, manure application, and pest control to ensure high survival rates.",
                video: img2,
              },
              {
                title: "Long-Term Yield",
                desc: "Palms begin to fruit after 3–4 years, with peak productivity at the 4th year and a lifespan of over 30 years.",
                video: img6,
              },
              {
                title: "Return on Investment (ROI)",
                desc: "Investors enjoy 35% annual ROI once production begins, in addition to the long-term value of land ownership.",
                video: img3,
              },
              {
                title: "Transparency & Accountability",
                desc: "We provide periodic progress reports, farm visitation opportunities, and open-book management for investor confidence.",
                video: img4,
              },
              {
                title: "Full-Cycle Services",
                desc: "It includes land acquisition, planting, maintenance, harvesting, processing, hybrid seedling planting, and continuous agronomic care.",
                video: img5,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="relative rounded-xl shadow-lg overflow-hidden group h-72 flex items-center justify-center text-center"
              >
                {/* Background media */}
                {item.video.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={item.video}
                    alt={item.title}
                  />
                )}
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition"></div>

                {/* Card content */}
                <div className="relative z-10 text-white px-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Promo Section */}
      <LandPromoSection />

      {/* Contact */}
      <section
        id="contact"
        className="w-full bg-gradient-to-br from-white to-green-50 py-16 px-6"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-green-700 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Let’s cultivate the future of agriculture together. Whether you need
              farm setup services, technical support, or just want to say hello — we’d
              love to hear from you.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column: Info + Map */}
            <div className="space-y-10">
              {/* Contact Info */}
              <div>
                <h3 className="text-2xl font-semibold text-green-700 mb-2">
                  Contact Information
                </h3>
                <p className="text-gray-600 mb-4">
                  Reach us via email, phone, or drop by our office.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="text-green-700 text-xl">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <a
                      href="mailto:agtech@anjonixgloballimited.com"
                      className="text-gray-700 hover:underline"
                    >
                      agtech@anjonixgloballimited.com
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-700 text-xl">
                      <FontAwesomeIcon icon={faPhone} />
                    </span>
                    <a href="tel:+2348000000000" className="text-gray-700 hover:underline">
                      +234 800 000 0000
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-700 text-xl">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </span>
                    <span className="text-gray-700">
                      KM 87 Idiroko Rd, Ota 112221, Ogun State
                    </span>
                  </li>
                </ul>
              </div>

              {/* Map Preview */}
              <div className="w-full aspect-square overflow-hidden rounded-2xl shadow-md">
                <a
                  href="https://maps.app.goo.gl/snicjngXSK31qVvu7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <iframe
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.648302390285!2d3.225810410962951!3d6.690410993277042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b992a427af299%3A0x6754826e9866c346!2sAnjonix%20Global%20Limited!5e0!3m2!1sen!2sng!4v1758792780975!5m2!1sen!2sng"
                    className="w-full h-full border-0 pointer-events-none"
                    loading="lazy"
                  ></iframe>
                </a>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <form className="bg-white shadow-md rounded-2xl p-8 space-y-6 my-60">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-800 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>


      {/* Flyer Section */}
      <FlyerOnVideo />
    </>
  );
}
