import React, { useState } from "react";

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  applyLink: string;
}

const CareerOpenings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const jobs: Job[] = [
    {
      id: 1,
      title: "AI Research Engineer",
      department: "Technology",
      location: "Remote / Lagos",
      type: "Full-time",
      description:
        "Develop AI-driven solutions to empower Anjonix’s AgriTech and EduTech ecosystems. You’ll work with a cross-functional team deploying real-world machine learning models.",
      applyLink: "mailto:careers@anjonixgloballimited.com?subject=Application - AI Research Engineer",
    },
    {
      id: 2,
      title: "Digital Learning Content Creator",
      department: "Education",
      location: "Hybrid - Lagos",
      type: "Full-time",
      description:
        "Design interactive educational content for our digital learning hub, blending pedagogy, storytelling, and tech innovation to empower the next generation of African learners.",
      applyLink: "mailto:careers@anjonixgloballimited.com?subject=Application - Digital Learning Content Creator",
    },
    {
      id: 3,
      title: "AgriTech Field Specialist",
      department: "Agriculture",
      location: "Kano / Abuja / Ibadan",
      type: "Contract",
      description:
        "Work with our Agri division to deploy IoT sensors, drone systems, and analytics for precision farming. Fieldwork meets tech innovation.",
      applyLink: "mailto:careers@anjonixgloballimited.com?subject=Application - AgriTech Field Specialist",
    },
    {
      id: 4,
      title: "Backend Developer (Node.js)",
      department: "Technology",
      location: "Remote",
      type: "Full-time",
      description:
        "Build scalable APIs, integrate AI modules, and optimize our platform infrastructure for millions of users across our 3 tribes.",
      applyLink: "mailto:careers@anjonixgloballimited.com?subject=Application - Backend Developer",
    },
    {
      id: 5,
      title: "Sustainability and Growth Strategist",
      department: "Agriculture",
      location: "Lagos HQ",
      type: "Full-time",
      description:
        "Shape green policies and design sustainability roadmaps across our agricultural value chains and innovation labs.",
      applyLink: "mailto:careers@anjonixgloballimited.com?subject=Application - Sustainability Strategist",
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || job.department === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="relative min-h-screen text-gray-800">
      {/* 🎥 Hero Section */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/careers-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-white">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Join The Future Builders</h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-300">
            At Anjonix Global Limited, we’re not just creating jobs — we’re cultivating legacies in Education, Agriculture, and Technology.
          </p>
        </section>

        {/* 🔍 Search & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <input
            type="text"
            placeholder="Search careers..."
            className="p-3 w-full md:w-1/2 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-3 rounded-lg bg-white bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="Education">Education</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Technology">Technology</option>
          </select>
        </div>

        {/* 💼 Job Listings */}
        <section className="grid gap-8">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl hover:bg-opacity-20 transition"
              >
                <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
                <p className="text-green-400 mb-2">
                  {job.department} · {job.location} · {job.type}
                </p>
                <p className="text-gray-300 mb-4">{job.description}</p>
                <a
                  href={job.applyLink}
                  className="inline-block px-5 py-2 bg-green-500 hover:bg-green-600 hover:text-white rounded-lg font-semibold text-white transition"
                >
                  Apply Now →
                </a>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No openings found. Check back soon!</p>
          )}
        </section>

        {/* 🌍 Footer */}
        <section className="text-center mt-20">
          <h3 className="text-xl font-semibold mb-2">Global Presence</h3>
          <p className="text-gray-300">Lagos | Nairobi | Accra | Remote Worldwide 🌍</p>
          <p className="text-gray-400 mt-4">
            For recruitment partnerships, reach us at{" "}
            <a href="mailto:careers@anjonixgloballimited.com" className="text-green-400 underline">
              careers@anjonixgloballimited.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default CareerOpenings;
