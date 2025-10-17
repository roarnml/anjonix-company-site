import React, { useState } from "react";

const PartnerSignup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    sector: "Education",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Simulated backend submission (replace with API call)
      console.log("Partner form submitted:", formData);
      setStatus("Thank you for partnering with us! 🌍 We’ll reach out soon.");
      setFormData({ name: "", company: "", email: "", phone: "", sector: "Education", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("Oops! Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="relative min-h-screen text-gray-800">
      {/* 🎥 Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/partnership-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-white">
        {/* 🌟 Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Partner With Anjonix Global Limited</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            Join forces with Africa’s leading innovation powerhouse in Education, Agriculture, and Technology.
            Together, we’ll build smarter systems, sustainable solutions, and a brighter global future.
          </p>
        </section>

        {/* 🤝 Partnership Benefits */}
        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl hover:bg-opacity-20 transition">
            <img src="/images/education-partner.jpg" alt="Education partnership" className="rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            <p className="text-gray-300">
              Collaborate on digital learning platforms, curriculum design, and youth skill empowerment programs.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl hover:bg-opacity-20 transition">
            <img src="/images/agriculture-partner.jpg" alt="Agriculture partnership" className="rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">Agriculture</h3>
            <p className="text-gray-300">
              Co-develop smart farming technologies, supply chain innovations, and green sustainability projects.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl hover:bg-opacity-20 transition">
            <img src="/images/technology-partner.jpg" alt="Technology partnership" className="rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">Technology</h3>
            <p className="text-gray-300">
              Join our global network of developers and innovators shaping digital infrastructure and AI systems.
            </p>
          </div>
        </section>

        {/* 📝 Partner Signup Form */}
        <section className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Let’s Build the Future Together</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              name="company"
              placeholder="Company / Organization"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Business Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <select
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white bg-opacity-20 text-black focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="Education">Education</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Technology">Technology</option>
              <option value="General">General Partnership</option>
            </select>
            <textarea
              name="message"
              placeholder="Tell us about your partnership idea..."
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="w-full p-3 rounded bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold text-white transition"
            >
              Submit Partnership Request
            </button>
          </form>

          {status && (
            <p className="mt-4 text-center text-green-300 font-medium animate-fadeIn">{status}</p>
          )}
        </section>

        {/* 🌍 Global Presence */}
        <section className="text-center mt-20">
          <h3 className="text-xl font-semibold mb-2">Global Presence</h3>
          <p className="text-gray-300">
            Lagos | Nairobi | Accra | Remote Worldwide 🌍
          </p>
          <div className="mt-6 flex justify-center space-x-6">
            <a href="https://linkedin.com/company/anjonix" target="_blank" className="hover:opacity-80 transition">
              <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
            </a>
            <a href="https://twitter.com/anjonixglobal" target="_blank" className="hover:opacity-80 transition">
              <img src="/icons/twitter.svg" alt="Twitter" className="w-6 h-6" />
            </a>
            <a href="https://instagram.com/anjonix" target="_blank" className="hover:opacity-80 transition">
              <img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PartnerSignup;
