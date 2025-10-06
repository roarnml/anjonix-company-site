// src/pages/Blog.tsx

export default function Blog() {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 to-green-50 py-20 px-4 text-center">
        <h1 className="text-5xl font-bold text-blue-800 mb-4">The Anjonix Blog</h1>
        <p className="text-lg max-w-3xl mx-auto text-gray-700">
          Insights, innovations, and impact across Technology, Education, Agriculture, Energy, and Security.
        </p>
      </section>

      {/* About the Blog */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-blue-800 mb-4">What We Cover</h2>
        <p className="text-gray-600 mb-6">
          Our blog delivers stories, guides, and opinions that matter. From EdTech trends and smart farming solutions to cybersecurity and digital transformation — we explore how Anjonix is shaping smarter communities.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🎓",
              title: "Smart Education",
              desc: "CBT labs, interactive classrooms, and teacher training for future-ready schools.",
            },
            {
              icon: "🧠",
              title: "AI & Tech Innovation",
              desc: "AI, IoT, and cutting-edge tools transforming industries and communities.",
            },
            {
              icon: "🌿",
              title: "Agri-Tech",
              desc: "Tech-enabled farming systems, precision tools, and sustainable practices.",
            },
            {
              icon: "🔐",
              title: "Security Systems",
              desc: "Explore surveillance, access control, and digital security for smarter environments.",
            },
            {
              icon: "🔋",
              title: "Energy & Infrastructure",
              desc: "Reliable solar power, hybrid systems, and smart buildings for future cities.",
            },
            {
              icon: "🧰",
              title: "Guides & Resources",
              desc: "How-to articles, product reviews, and case studies to help you go smart.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">{item.icon} {item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-blue-800 mb-6">Latest Posts</h2>
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-2xl font-bold text-blue-700 mb-1">🔍 Coming Soon: AI in Education</h3>
            <p className="text-gray-600">
              Explore how AI is transforming classroom experiences across Nigeria and beyond. Discover tools and ideas to help you adapt.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-2xl font-bold text-green-700 mb-1">🌿 Precision Farming Techniques</h3>
            <p className="text-gray-600">
              A guide to data-driven agriculture and sustainable practices for modern farmers and agribusinesses.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-2xl font-bold text-yellow-700 mb-1">🔋 Reliable Power for Smart Schools</h3>
            <p className="text-gray-600">
              See how hybrid solar + inverter setups can guarantee uninterrupted learning and digital access in schools.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-blue-700 text-white py-12 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Ahead with Anjonix</h2>
        <p className="mb-6 text-sm">Get the latest blog posts, resources, and insights directly in your inbox.</p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 text-black rounded"
          />
          <button className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-gray-100">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
