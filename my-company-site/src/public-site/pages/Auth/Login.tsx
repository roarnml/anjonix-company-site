import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Logins: React.FC = () => {
  const { login } = useContext(AuthContext)!;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Simple email pattern check (could use zod/yup for full validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      setError(null);
      alert("Welcome back! 👋");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError("Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign In to Your Account
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-600 text-sm font-medium mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-600 text-sm font-medium mb-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Forgot your password?{" "}
          <a
            href="/reset-password"
            className="text-green-600 hover:underline font-medium"
          >
            Reset it
          </a>
        </p>
      </form>
    </div>
  );
};

export default Logins;
