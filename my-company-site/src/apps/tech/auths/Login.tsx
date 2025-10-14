/*import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api"; // Axios instance

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

  // Normalize role
  const normalizedRole = role?.replace("-portal", "").toLowerCase();

  // Permissions
  const canLogin =
    category === "online" ||
    (["enterprise", "institution"].includes(category || "") &&
      ["management", "instructor", "student"].includes(normalizedRole || ""));

  const canSignUp = canLogin;

  // -------------------------------------
  // 🧠 Restore offline session if present
  // -------------------------------------
  useEffect(() => {
    const offlineUser = localStorage.getItem("offlineUser");
    if (offlineUser) {
      const user = JSON.parse(offlineUser);
      console.log("Restoring offline session:", user);
      setEmail(user.email || "");
      // Optional: auto-redirect if they already logged in offline
      if (user.loggedInOffline) {
        navigate(`/tech/user/${user.category}/${user.role}`);
      }
    }
  }, [navigate]);

  // -------------------------------------
  // 🔐 Login handler with offline fallback
  // -------------------------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canLogin) return alert("Login is not allowed for this portal.");

    setLoading(true);
    setVerificationSent(false);
    setVerificationMessage("");

    const payload = { email, password, category, role: normalizedRole };

    try {
      const res = await api.post("/auth/login", payload);

      // Backend might require KYC
      if (res.data.action === "organizationKYCRequired") {
        navigate("/organization-kyc", {
          state: { email, category, role: normalizedRole },
        });
        return;
      }

      // ✅ Successful backend login
      alert(res.data.message || "Login successful!");
      localStorage.setItem("user", JSON.stringify(res.data.user || payload)); // cache for session continuity
      navigate(`/tech/user/${category}/${normalizedRole}`);
    } catch (err: any) {
      // Backend unreachable? → Try offline login
      if (!err.response) {
        console.warn("Backend unreachable, trying offline login...");
        const offlineUser = localStorage.getItem("offlineUser");

        if (offlineUser) {
          const user = JSON.parse(offlineUser);
          if (user.email === email && user.password === password) {
            user.loggedInOffline = true;
            localStorage.setItem("offlineUser", JSON.stringify(user));
            alert("Offline mode activated! You’re now logged in locally.");
            navigate(`/tech/user/${user.category}/${user.role}`);
            return;
          }
        }

        alert("You’re offline and no local account was found. Please reconnect.");
        return;
      }

      // Handle specific backend responses
      const action = err.response?.data?.action;
      if (action === "resendVerification") {
        setVerificationSent(true);
        setVerificationMessage(err.response.data.message || "Please verify your email.");
      } else if (action === "organizationKYCRequired") {
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

  // -------------------------------------
  // 📧 Resend verification email
  // -------------------------------------
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

  // -------------------------------------
  // 🖼️ UI
  // -------------------------------------
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      {/* Background video *}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/images/tech-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />

      {/* Login card *}
      <div className="relative z-10 bg-white bg-opacity-90 shadow-xl rounded-2xl p-8 w-full max-w-md">
        {category === "enterprise" && <h2 className="text-2xl font-bold mb-4">Company Login</h2>}
        {category === "institution" && <h2 className="text-2xl font-bold mb-4">Institution Login</h2>}
        {category === "online" && <h2 className="text-2xl font-bold mb-4">Online User Login</h2>}

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

        {/* Verification resend UI *}
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

        {/* Signup link *}
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

        {/* Social login (optional) *}
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
}*/

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api"; // Axios instance

export default function Login() {
  const { category, role } = useParams<{ category?: string; role?: string }>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const normalizedRole = role?.replace("-portal", "").toLowerCase();

  const canLogin =
    category === "online" ||
    (["enterprise", "institution"].includes(category || "") &&
      ["management", "instructor", "student"].includes(normalizedRole || ""));

  const canSignUp = canLogin;

  // 🧠 Restore offline session
  useEffect(() => {
    const offlineUser = localStorage.getItem("offlineUser");
    if (offlineUser) {
      const user = JSON.parse(offlineUser);
      setEmail(user.email || "");
      if (user.loggedInOffline) {
        navigate(`/tech/user/${user.category}/${user.role}/dashboard`);
      }
    }
  }, [navigate]);

  // 🚀 Compute dynamic dashboard route
  const getDashboardRoute = (
    category: string,
    role: string
  ): string => {
    const c = category.toLowerCase();
    const r = role.toLowerCase();

    if (c === "online") {
      if (r === "student" || r === "learner") return `/tech/dashboard/student/`;
      if (r === "instructor") return `/tech/user/online/instructor/dashboard`;
    }

    if (c === "institution") {
      if (r === "management") return `/tech/user/institution/management/dashboard`;
      if (r === "instructor") return `/tech/user/institution/instructor/dashboard`;
      if (r === "student") return `/tech/dashboard/student/`;
    }

    if (c === "enterprise") {
      if (r === "management") return `/tech/user/enterprise/management/dashboard`;
      if (r === "instructor") return `/tech/user/enterprise/instructor/dashboard`;
      if (r === "student") return `/tech/dashboard/student/`;
    }

    // fallback
    return `/tech/user/${r}`;
  };

  // 🔐 Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canLogin) return alert("Login is not allowed for this portal.");

    setLoading(true);
    setVerificationSent(false);
    setVerificationMessage("");

    const payload = { email, password, category, role: normalizedRole };

    try {
      const res = await api.post("/auth/login", payload);

      // ✅ Handle pending KYC if applicable
      if (res.data.action === "organizationKYCRequired") {
        navigate("/organization-kyc", {
          state: { email, category, role: normalizedRole },
        });
        return;
      }

      // ✅ Success
      localStorage.setItem("user", JSON.stringify(res.data.user || payload));
      const redirect = getDashboardRoute(category || "online", normalizedRole || "student");
      navigate(redirect);
    } catch (err: any) {
      if (!err.response) {
        console.warn("Backend unreachable, trying offline login...");
        const offlineUser = localStorage.getItem("offlineUser");

        if (offlineUser) {
          const user = JSON.parse(offlineUser);
          if (user.email === email && user.password === password) {
            user.loggedInOffline = true;
            localStorage.setItem("offlineUser", JSON.stringify(user));
            navigate(getDashboardRoute(user.category, user.role));
            return;
          }
        }

        alert("You’re offline and no local account was found. Please reconnect.");
        return;
      }

      const action = err.response?.data?.action;
      if (action === "resendVerification") {
        setVerificationSent(true);
        setVerificationMessage(err.response.data.message || "Please verify your email.");
      } else if (action === "organizationKYCRequired") {
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

  // 📧 Resend verification email
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

  // 🖼️ UI
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/images/tech-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />

      <div className="relative z-10 bg-white bg-opacity-90 shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 capitalize">
          {category} {normalizedRole} Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded-lg"
              placeholder="your@email.com"
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
      </div>
    </div>
  );
}

