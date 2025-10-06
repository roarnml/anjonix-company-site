import { Link } from "react-router-dom";

const solutions = [
  {
    title: "Smart School",
    description: "Digital tools for modern education — learning portals, results, fee tracking, and more.",
    category: "Academy",
    link: "/products/smart-school",
  },
  {
    title: "Agro Precision Kit",
    description: "Smart farming solutions including sensors, monitoring, and automation tools.",
    category: "Agro",
    link: "/products/agro-precision",
  },
  {
    title: "Tech Services Hub",
    description: "Networking, surveillance, solar setup, smart homes and IoT deployments.",
    category: "Tech",
    link: "/products/tech-services",
  },
];

export default function SolutionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Our Solutions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((solution, index) => (
          <Link
            to={solution.link}
            key={index}
            className="border rounded-xl p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{solution.title}</h2>
            <p className="text-gray-600 mb-2">{solution.description}</p>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {solution.category}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
