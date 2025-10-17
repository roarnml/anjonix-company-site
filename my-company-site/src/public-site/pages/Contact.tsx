import { useState } from "react";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaSeedling, FaCogs } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "General Inquiry",
    message: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
        setStatus("Please fill in all required fields.");
        return;
    }

    try {
        setStatus("Sending message...");
        const response = await fetch("https://your-backend-domain.com/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        });

        if (response.ok) {
        setStatus("Message sent successfully! ✅");
        setFormData({
            name: "",
            email: "",
            phone: "",
            category: "General Inquiry",
            message: "",
        });
        } else {
        const data = await response.json();
        setStatus(data.message || "Failed to send message.");
        }
    } catch (error) {
        console.error("Email sending failed:", error);
        setStatus("Something went wrong. Please try again later.");
    }


    // Simulated submission
    console.log("Form submitted:", formData);
    setStatus("Message sent successfully! ✅");
    setFormData({ name: "", email: "", phone: "", category: "General Inquiry", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {/* Hero Section */}
      <motion.section
        className="text-center py-16 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-blue-700">
          We’re Always Listening
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Whether you’re an educator shaping minds, a farmer growing futures, or a technologist
          building the next big leap — Anjonix Global Limited is here to collaborate.
          Reach out and let’s shape progress, one idea at a time.
        </p>
      </motion.section>

      {/* Contact Form */}
      <motion.section
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Get In Touch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full bg-white focus:ring-2 focus:ring-green-400 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full bg-white focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="phone"
              placeholder="Phone (optional)"
              value={formData.phone}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 bg-white focus:ring-green-400 outline-none"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full bg-white focus:ring-2 focus:ring-green-400 outline-none"
            >
              <option>Education</option>
              <option>Agriculture</option>
              <option>Technology</option>
              <option>General Inquiry</option>
            </select>
          </div>

          <textarea
            name="message"
            placeholder="Your Message *"
            value={formData.message}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full h-32 bg-white focus:ring-2 focus:ring-green-400 outline-none"
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-full transition-all font-semibold"
          >
            Send Message →
          </button>

          {status && (
            <p
              className={`text-center mt-3 text-sm ${
                status.includes("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {status}
            </p>
          )}
          <p className="text-center text-gray-500 text-sm mt-3">
            We respond within 24 hours — because your ideas deserve attention.
          </p>
        </form>
      </motion.section>

      {/* 3 Tribes Contact Info */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-6 pb-16">
        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-purple-500 text-center">
          <FaChalkboardTeacher className="mx-auto text-purple-600 text-3xl mb-2" />
          <h3 className="font-semibold text-lg">Education</h3>
          <p className="text-sm text-gray-600 mb-2">
            For partnerships, e-learning, and training collaborations.
          </p>
          <a href="mailto:education@anjonix.com" className="text-purple-600 font-medium">
            education@anjonix.com
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500 text-center">
          <FaSeedling className="mx-auto text-green-600 text-3xl mb-2" />
          <h3 className="font-semibold text-lg">Agriculture</h3>
          <p className="text-sm text-gray-600 mb-2">
            For smart farming, land setup, and agritech innovations.
          </p>
          <a href="mailto:agric@anjonix.com" className="text-green-600 font-medium">
            agric@anjonix.com
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500 text-center">
          <FaCogs className="mx-auto text-blue-600 text-3xl mb-2" />
          <h3 className="font-semibold text-lg">Technology</h3>
          <p className="text-sm text-gray-600 mb-2">
            For digital systems, software, and infrastructure solutions.
          </p>
          <a href="mailto:tech@anjonix.com" className="text-blue-600 font-medium">
            tech@anjonix.com
          </a>
        </div>
      </section>

      {/* Footer Tagline */}
      <footer className="text-center text-gray-700 text-sm pb-10">
        <p className="font-medium italic">
          “Anjonix Global Limited — where Knowledge feeds Innovation, and Innovation nourishes the World.”
        </p>
        <p className="mt-2">Lagos | Nairobi | Accra | Remote Worldwide 🌍</p>
      </footer>
    </div>
  );
}
