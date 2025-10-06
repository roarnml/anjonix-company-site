// src/pages/EduHome.tsx
export default function EduHome() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 bg-gradient-to-br from-indigo-100 to-white">
        <h1 className="text-4xl sm:text-5xl font-bold text-indigo-600 mb-4">
          Welcome to Anjonix Education
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl max-w-2xl mb-6">
          Empowering minds through tech-enabled learning. Explore tools, programs, and smart systems for education in the digital age.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#smart-school"
            className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow hover:bg-transparent hover:border-2 hover:border-indigo-600 transition"
          >
            Explore Smart School
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Smart School Highlights */}
      <section id="smart-school" className="w-full bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">Smart School Highlights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Interactive learning, future-focused skills, and connected campuses — explore our smart solutions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Smart Screens",
                desc: "Interactive digital boards for engaging lessons.",
              },
              {
                title: "Robotics & Coding",
                desc: "Hands-on innovation with automation and logic.",
              },
              {
                title: "Teacher Training",
                desc: "Upskill staff with digital tools and pedagogy.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="w-full bg-gradient-to-br from-white to-indigo-100 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Let’s work together to digitize and secure your school.
          </p>
          <a
            href="mailto: edtech@anjonixgloballimited.com"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-blue-800 transition"
          >
            edtech@anjonixgloballimited.com
          </a>
        </div>
      </section>
    </>
  );
}
