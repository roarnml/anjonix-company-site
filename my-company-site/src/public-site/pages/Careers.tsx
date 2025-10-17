// Careers.jsx
// Modern, card-based layout for the Anjonix Careers page.

import HeroCardCareers from "../components/Careers/Hero";
import WhyWorkCardDiv from "../components/Careers/WhyWorkCard";
//import WhyWorkCard from "../components/Careers/WhyWorkCard";

export default function Careers() {
  const benefits = [
    {
      title: "Purpose-Driven Work",
      subtitle: "Impact That Matters",
      description:
        "Every project you work on directly contributes to Africa's digital, educational, and agricultural transformation.",
    },
    {
      title: "Collaborative Culture",
      subtitle: "Teamwork First",
      description:
        "Work alongside talented professionals across multiple domains in a supportive, innovation-driven environment.",
    },
    {
      title: "Growth & Learning",
      subtitle: "Level Up Skills",
      description:
        "Develop expertise across AI, IoT, cybersecurity, edtech, and agritech through mentorship, training, and hands-on experience.",
    },
    {
      title: "Diverse Challenges",
      subtitle: "Stretch & Innovate",
      description:
        "Engage in complex, high-impact problems that push your creativity and technical skills to the next level.",
    },
    {
      title: "Startup Energy",
      subtitle: "Agility + Scale",
      description:
        "Experience the excitement of a startup with the vision and stability of a scaling enterprise.",
    },
  ];


  const tracks = [
    {
      title: "Tech & Engineering",
      roles: "Full Stack Devs, AI/ML Engineers, IoT Specialists, Cybersecurity Experts",
    },
    {
      title: "Agriculture",
      roles: "Agronomists, Field Engineers, Data Analysts",
    },
    {
      title: "Education",
      roles: "Trainers, Curriculum Designers, Technicians",
    },
    {
      title: "Business & Operations",
      roles: "Project Managers, Client Success Managers, Marketing Leads",
    },
  ];

  return (
    <div className="w-screen mx-auto bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
        <HeroCardCareers />
      {/* Why Work Here Card */}
      <WhyWorkCardDiv benefits={benefits} />

      {/* Career Tracks Card */}
      <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          Career Tracks & Roles
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {tracks.map((track, index) => (
            <article
              key={index}
              className="p-6 border border-gray-100 rounded-xl bg-gray-50 hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-blue-800 mb-2">
                {track.title}
              </h3>
              <p className="text-gray-700">{track.roles}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Internship & Entry-Level Card */}
      <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-12 text-gray-700">
        <h2 className="text-2xl font-semibold mb-3">Internships & Entry-Level</h2>
        <p>
          We nurture the next generation of innovators through bootcamps, internships,
          and campus ambassador programs. Whether you’re coding your first project or
          leading one, there’s space for you here.
        </p>
      </section>

      {/* How to Apply Card */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-10 rounded-2xl shadow-xl text-center mb-16">
        <h2 className="text-2xl font-semibold mb-3">Ready to Join the Revolution?</h2>
        <p className="mb-4 max-w-2xl mx-auto text-blue-100">
          Take your career to the next level — we’re looking for thinkers, builders,
          dreamers, and doers who want to shape Africa’s technological horizon.
        </p>
        <div className="bg-white text-blue-800 px-6 py-3 inline-block rounded-lg font-medium shadow-md">
          <a
            href="mailto:careers@anjonixgloballimited.com"
            className="bg-white text-blue-800 px-6 py-3 inline-block rounded-lg font-medium shadow-md hover:bg-blue-50 transition"
          >
            📩 careers@anjonixgloballimited.com
          </a>

        </div>
        <p className="text-sm text-blue-200 mt-3">
          Include your resume and portfolio (if applicable).
        </p>
      </section>

      {/* Closing Note */}
      <footer className="text-center text-sm text-gray-500">
        Explore open roles and help us reshape Africa’s future — one innovation at a time.
      </footer>
    </div>
  );
}
