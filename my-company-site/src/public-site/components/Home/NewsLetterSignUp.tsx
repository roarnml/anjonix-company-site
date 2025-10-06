import { useState } from "react";

export default function NewsletterSignupCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending to backend
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section className=" bg-gradient-to-r from-blue-50 to-blue-100 py-12 rounded-lg shadow-md text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Join Our Community
        </h2>
        <p className="text-gray-600 mb-6">
          Stay updated on the latest innovations, success stories, and tech opportunities from Anjonix. Get insights, tips, and exclusive content.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        ) : (
          <div className="text-green-600 font-medium text-lg">
            🎉 Thank you for subscribing!
          </div>
        )}
      </div>
    </section>
  );
}
