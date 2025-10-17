import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Register: React.FC = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Register must be used within an AuthProvider");
  const { register } = context;

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | ""; text: string }>({
    type: "",
    text: "",
  });

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      setMessage({ type: "error", text: "Please fill out all fields." });
      return;
    }

    if (!validateEmail(form.email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      await register(form.username, form.email, form.password);
      setMessage({ type: "success", text: "Registration successful! Please log in." });

      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      console.error("Registration error:", err);
      setMessage({ type: "error", text: "Registration failed. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Create Account</h2>

        {message.text && (
          <div
            className={`mb-3 p-2 rounded text-sm text-center ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded-md my-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded-md my-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md my-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-4 py-2 rounded-md text-white font-medium transition-all ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
