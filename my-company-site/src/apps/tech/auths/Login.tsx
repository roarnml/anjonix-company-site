/*
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api"; // Axios instance

interface Params {
  category?: string;
  role?: string;
}

export default function Login() {
  const { category, role } = useParams<Params>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Track verification state
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const normalizedRole = role?.replace("-portal", "").toLowerCase();
  console.log("Login Page", normalizedRole)
  const canLogin =
    category === "online" ||
    (["enterprise", "institution"].includes(category || "") &&
      ["management", "instructor", "student"].includes(normalizedRole || ""));

  const canSignUp =
    category === "online" ||
    (["enterprise", "institution"].includes(category || "") &&
      ["management-portal", "instructor-portal", "student-portal"].includes(role || ""));

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setVerificationSent(false);
    setVerificationMessage("");

    if (!canLogin) return alert("Login is not allowed for this portal.");

    const payload = { email, password, category, role: normalizedRole };

    try {
      const res = await api.post("/auth/login", payload);

      if (res.data.action === "organizationKYCRequired") {
        navigate("/organization-kyc", {
          state: { email, category, role: normalizedRole },
        });
        return;
      }

      // Normal login
      alert(res.data.message || "Login successful!");
      navigate(`/tech/user/${category}/${normalizedRole}`);
    } catch (err: any) {
      if (err.response?.data?.action === "resendVerification") {
        setVerificationSent(true);
        setVerificationMessage(err.response.data.message || "Please verify your email.");
      } else if (err.response?.status === 409 && err.response?.data?.action === "organizationKYCRequired") {
        navigate("/organization-kyc", {
          state: { email, category, role: normalizedRole },
        });
      } else {
        alert(err.response?.data?.error || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      setLoading(true);
      const res = await api.post("/auth/resend-verification", { email });
      setVerificationMessage(res.data.message || "Verification email resent");
      setVerificationSent(true);
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to resend verification email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      {/* Video background *}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/images/tech-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay *}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />

      <div className="relative z-10 bg-white bg-opacity-90 shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Heading *}
        {category === "enterprise" && <h2 className="text-2xl font-bold mb-4">Company Login</h2>}
        {category === "institution" && <h2 className="text-2xl font-bold mb-4">Institution Login</h2>}
        {category === "online" && <h2 className="text-2xl font-bold mb-4">Online User Login</h2>}

        {/* Login form *}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded-lg"
              placeholder={category === "online" ? "your@email.com" : "your.official@company.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded-lg"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Resend verification *}
        {verificationSent && (
          <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 rounded">
            <p>{verificationMessage}</p>
            <button
              onClick={resendVerificationEmail}
              className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded"
              disabled={loading}
            >
              Resend Verification Email
            </button>
          </div>
        )}

        {/* Sign Up link *}
        {canSignUp && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <a
              href={`/signup/${category}/${normalizedRole}`}
              className="text-blue-600 hover:underline"
            >
              Sign up
            </a>
          </p>
        )}

        {/* Social sign-in for online users *}
        {category === "online" && (
          <div className="mt-6">
            <p className="text-center text-gray-500 mb-3">or sign in with</p>
            <div className="flex justify-center space-x-4">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Google</button>
              <button className="px-4 py-2 bg-blue-800 text-white rounded-lg">Facebook</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

*/

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api"; // Axios instance

/*/ Either define Params like this:
type Params = {
  category?: string;
  role?: string;
};*/

export default function Login() {
  const { category, role } = useParams<{ category?: string; role?: string }>();
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Verification state
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  // Normalize role (remove '-portal' and lowercase)
  const normalizedRole = role?.replace("-portal", "").toLowerCase();

  // Permissions
  const canLogin =
    category === "online" ||
    (["enterprise", "institution"].includes(category || "") &&
      ["management", "instructor", "student"].includes(normalizedRole || ""));

  const canSignUp =
    category === "online" ||
    (["enterprise", "institution"].includes(category || "") &&
      ["management", "instructor", "student"].includes(normalizedRole || ""));

  // ----------------------
  // Login handler
  // ----------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canLogin) return alert("Login is not allowed for this portal.");

    setLoading(true);
    setVerificationSent(false);
    setVerificationMessage("");

    const payload = { email, password, category, role: normalizedRole };

    try {
      const res = await api.post("/auth/login", payload);

      // Redirect to KYC if backend signals it
      if (res.data.action === "organizationKYCRequired") {
        navigate("/organization-kyc", {
          state: { email, category, role: normalizedRole },
        });
        return;
      }

      // Normal login success
      alert(res.data.message || "Login successful!");
      navigate(`/tech/user/${category}/${normalizedRole}`);
    } catch (err: any) {
      const action = err.response?.data?.action;

      if (action === "resendVerification") {
        // Show verification resend option
        setVerificationSent(true);
        setVerificationMessage(err.response.data.message || "Please verify your email.");
      } else if (action === "organizationKYCRequired") {
        // KYC redirect
        navigate("/organization-kyc", {
          state: { email, category, role: normalizedRole },
        });
      } else {
        // Generic login error
        alert(err.response?.data?.error || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // ----------------------
  // Resend verification email
  // ----------------------
  const resendVerificationEmail = async () => {
    try {
      setLoading(true);
      const res = await api.post("/auth/resend-verification", { email });
      setVerificationMessage(res.data.message || "Verification email resent");
      setVerificationSent(true);
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to resend verification email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      {/* Video background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/images/tech-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />

      {/* Main card */}
      <div className="relative z-10 bg-white bg-opacity-90 shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Heading */}
        {category === "enterprise" && <h2 className="text-2xl font-bold mb-4">Company Login</h2>}
        {category === "institution" && <h2 className="text-2xl font-bold mb-4">Institution Login</h2>}
        {category === "online" && <h2 className="text-2xl font-bold mb-4">Online User Login</h2>}

        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded-lg"
              placeholder={category === "online" ? "your@email.com" : "your.official@company.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded-lg"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Verification resend */}
        {verificationSent && (
          <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 rounded">
            <p>{verificationMessage}</p>
            <button
              onClick={resendVerificationEmail}
              className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded"
              disabled={loading}
            >
              Resend Verification Email
            </button>
          </div>
        )}

        {/* Sign up link */}
        {canSignUp && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <a
              href={`/tech/signup/${category}/${normalizedRole}`}
              className="text-blue-600 hover:underline"
            >
              Sign up
            </a>
          </p>
        )}

        {/* Social login for online */}
        {category === "online" && (
          <div className="mt-6">
            <p className="text-center text-gray-500 mb-3">or sign in with</p>
            <div className="flex justify-center space-x-4">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Google</button>
              <button className="px-4 py-2 bg-blue-800 text-white rounded-lg">Facebook</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
