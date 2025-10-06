/*import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
//import { useRouter } from "next/router";
import api from "../api/api"

export default function Signup() {
  const { category, role } = useParams(); // e.g. enterprise, institution, online
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidOfficialEmail = (email: string) => {
    const publicDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
    const domain = email.split("@")[1]?.toLowerCase();
    return domain && !publicDomains.includes(domain);
  };

  const canSignUp =
    category === "online" ||
    (["enterprise", "institution"].includes(category!) &&
      ["management-portal", "instructor-portal"].includes(role!));

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSignUp) {
      alert("Signup is not allowed for this portal.");
      return;
    }

    if (category !== "online" && !isValidOfficialEmail(email)) {
      alert("Please use your official institutional or company email.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // TODO: Send signup request to backend
    console.log("Signing up:", { category, role, email, password });

    // Redirect to login after successful signup
    navigate(`/tech/user/${category}/${role}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Dynamic heading *}
        {category === "enterprise" && <h2 className="text-2xl font-bold mb-4">Company Sign Up</h2>}
        {category === "institution" && <h2 className="text-2xl font-bold mb-4">Institution Sign Up</h2>}
        {category === "online" && <h2 className="text-2xl font-bold mb-4">Online User Sign Up</h2>}

        {/* Subheading with role *}
        <p className="text-gray-600 mb-6 capitalize">{role?.replace("-", " ")}</p>

        {canSignUp ? (
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Email *}
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

            {/* Password *}
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

            {/* Confirm Password *}
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full border px-3 py-2 rounded-lg"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
            >
              Sign Up
            </button>
          </form>
        ) : (
          <p className="text-red-600 font-semibold">
            Sign up is not allowed for this portal. Please contact your administrator.
          </p>
        )}

        {/* Social sign-up for online users *}
        {category === "online" && canSignUp && (
          <div className="mt-6">
            <p className="text-center text-gray-500 mb-3">or sign up with</p>
            <div className="flex justify-center space-x-4">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Google</button>
              <button className="px-4 py-2 bg-blue-800 text-white rounded-lg">Facebook</button>
            </div>
          </div>
        )}

        {/* Redirect to login *}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href={`/tech/user/${category}/${role}`} className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}**/



/*import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api"; // Axios instance

interface Params {
  category?: string;
  role?: string;
}

interface Organization {
  id: number;
  name: string;
  allowedDomain: string;
}

export default function Signup() {
  const { category, role } = useParams<Params>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);

  // Hardcoded organizations for enterprise/institution
  useEffect(() => {
    if (category && category !== "online") {
      setOrganizations([
        { id: 1, name: "Acme Corp", allowedDomain: "acme.com" },
        { id: 2, name: "EduTech University", allowedDomain: "edutech.edu" },
        { id: 3, name: "Global Solutions", allowedDomain: "globalsolutions.com" },
      ]);
    }
  }, [category]);

  const isValidOfficialEmail = (email: string) => {
    const publicDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
    const domain = email.split("@")[1]?.toLowerCase();
    return domain && !publicDomains.includes(domain);
  };

  const canSignUp =
    category === "online" ||
    (["enterprise", "institution"].includes(category || "") &&
      ["management-portal", "instructor-portal"].includes(role || ""));

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSignUp) {
      alert("Signup is not allowed for this portal.");
      return;
    }

    if (category !== "online" && !isValidOfficialEmail(email)) {
      alert("Please use your official institutional/company email.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (category !== "online" && !selectedOrgId) {
      alert("Please select your organization.");
      return;
    }

    // Normalize role: "management-portal" -> "management"
    const normalizedRole = role?.replace("-portal", "");

    /*const payload: any = {
      email,
      password,
      category,
      role: normalizedRole,
    };

    if (category !== "online") {
      payload.organizationId = selectedOrgId;
    }*

      const payload: any = { email, password, category, role: normalizedRole };

      if (category !== "online" && ["management", "instructor"].includes(normalizedRole)) {
        payload.orgName = orgName;
        payload.allowedDomain = orgDomain.toLowerCase();
      }


    console.log("Submitting signup payload:", payload);

    try {
      setLoading(true);
      const res = await api.post("/auth/signup", payload);
      alert(res.data.message || "Signup successful! Check your email for verification.");
      navigate(`/tech/user/${category}/${role}`);
    } catch (err: any) {
      alert(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Dynamic heading *}
        {category === "enterprise" && <h2 className="text-2xl font-bold mb-4">Company Sign Up</h2>}
        {category === "institution" && <h2 className="text-2xl font-bold mb-4">Institution Sign Up</h2>}
        {category === "online" && <h2 className="text-2xl font-bold mb-4">Online User Sign Up</h2>}

        <p className="text-gray-600 mb-6 capitalize">{role?.replace("-", " ")}</p>

        {canSignUp ? (
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Email *}
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

            {/* Password *}
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

            {/* Confirm Password *}
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full border px-3 py-2 rounded-lg"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Organization dropdown *}
            {category !== "online" && ["management-portal", "instructor-portal"].includes(role || "") && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Organization Name</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded-lg"
                    placeholder="Enter your organization name"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Organization Email Domain</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded-lg"
                    placeholder="yourcompany.com"
                    value={orgDomain}
                    onChange={(e) => setOrgDomain(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        ) : (
          <p className="text-red-600 font-semibold">
            Sign up is not allowed for this portal. Please contact your administrator.
          </p>
        )}

        {/* Social sign-up for online users *}
        {category === "online" && canSignUp && (
          <div className="mt-6">
            <p className="text-center text-gray-500 mb-3">or sign up with</p>
            <div className="flex justify-center space-x-4">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Google</button>
              <button className="px-4 py-2 bg-blue-800 text-white rounded-lg">Facebook</button>
            </div>
          </div>
        )}

        {/* Redirect to login *}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href={`/tech/user/${category}/${role}`} className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
*/

/*import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api"; // Axios instance

interface Params {
  category?: string;
  role?: string;
}

interface Organization {
  id: number;
  name: string;
  allowedDomain: string;
}

export default function Signup() {
  const { category, role } = useParams<Params>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // For institution/enterprise
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const [orgName, setOrgName] = useState("");
  const [orgDomain, setOrgDomain] = useState("");

  // Load existing orgs if needed (optional: fetch from backend)
  useEffect(() => {
    if (category && category !== "online") {
      const fetchOrgs = async () => {
        try {
          const res = await api.get<Organization[]>("/organizations");
          setOrganizations(res.data);
        } catch (err) {
          console.error("Failed to load organizations", err);
          setOrganizations([]); // fallback
        }
      };
      fetchOrgs();
    }
  }, [category]);


  const isValidOfficialEmail = (email: string) => {
    const publicDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
    const domain = email.split("@")[1]?.toLowerCase();
    return domain && !publicDomains.includes(domain);
  };

  const normalizedRole = role?.replace("-portal", "").toLowerCase();
  const canSignUp =
    category === "online" ||
    (["enterprise", "institution"].includes(category || "") &&
      ["management", "instructor", "student"].includes(normalizedRole || ""));

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSignUp) return alert("Signup is not allowed for this portal.");
    if (password !== confirmPassword) return alert("Passwords do not match.");
    if (category !== "online" && ["management", "instructor"].includes(normalizedRole!)) {
      if (!orgName || !orgDomain) return alert("Organization name and domain are required.");
    }

    const payload: any = { email, password, category, role: normalizedRole };

    // Only include org info if relevant
    if (category !== "online") {
      if (["management", "instructor"].includes(normalizedRole!)) {
        payload.orgName = orgName;
        payload.allowedDomain = orgDomain.toLowerCase();
      } else if (normalizedRole === "student" && selectedOrgId) {
        payload.organizationId = selectedOrgId;
      }
    }

    console.log("Signup payload:", payload);

    try {
      setLoading(true);
      const res = await api.post("/auth/signup", payload);

      // Check if backend says KYC is required
      if (res.data.action === "organizationKYCRequired") {
        navigate("/organization-kyc", {
          state: {
            orgName: payload.orgName,
            allowedDomain: payload.allowedDomain,
            category: payload.category,
            email: payload.email,
          },
        });
        return;
      }


      // Normal signup success flow
      alert(res.data.message || "Signup successful! Check your email for verification.");
      navigate(`/tech/user/${category}/${role}`);
    } catch (err: any) {
      // Handle errors
      /*if (err.response?.data?.action === "organizationKYCRequired") {
        // Backend might respond with 409, we handle redirect here
        navigate("/organization-kyc");
        return;
      }*
      alert(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Dynamic headings *}
        {category === "enterprise" && <h2 className="text-2xl font-bold mb-4">Company Sign Up</h2>}
        {category === "institution" && <h2 className="text-2xl font-bold mb-4">Institution Sign Up</h2>}
        {category === "online" && <h2 className="text-2xl font-bold mb-4">Online User Sign Up</h2>}

        <p className="text-gray-600 mb-6 capitalize">{role?.replace("-", " ")}</p>

        {canSignUp ? (
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Email *}
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

            {/* Password *}
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

            {/* Confirm Password *}
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full border px-3 py-2 rounded-lg"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Organization fields for management/instructor *}
            {category !== "online" && ["management", "instructor"].includes(normalizedRole!) && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Organization Name</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded-lg"
                    placeholder="Enter your organization name"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Organization Email Domain</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded-lg"
                    placeholder="yourcompany.com"
                    value={orgDomain}
                    onChange={(e) => setOrgDomain(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            {/* Organization dropdown for students *}
            {category !== "online" && normalizedRole === "student" && organizations.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-1">Select Organization</label>
                <select
                  value={selectedOrgId ?? ""}
                  onChange={(e) => setSelectedOrgId(Number(e.target.value))}
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                >
                  <option value="">-- Select Organization --</option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        ) : (
          <p className="text-red-600 font-semibold">
            Sign up is not allowed for this portal. Please contact your administrator.
          </p>
        )}

        {/* Social sign-up for online users *}
        {category === "online" && (
          <div className="mt-6">
            <p className="text-center text-gray-500 mb-3">or sign up with</p>
            <div className="flex justify-center space-x-4">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Google</button>
              <button className="px-4 py-2 bg-blue-800 text-white rounded-lg">Facebook</button>
            </div>
          </div>
        )}

        {/* Login link *}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href={`/tech/user/${category}/${role}`} className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

}
*/

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api"; // Axios instance

/*interface Params {
  category?: string;
  role?: string;
}*/

interface Organization {
  id: number;
  name: string;
  allowedDomain: string;
}

export default function Signup() {
  const { category, role } = useParams<{ category?: string; role?: string }>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // For institution/enterprise
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const [orgName, setOrgName] = useState("");
  const [orgDomain, setOrgDomain] = useState("");

  // Load existing orgs if needed
  useEffect(() => {
    if (category && category !== "online") {
      const fetchOrgs = async () => {
        try {
          const res = await api.get<Organization[]>("/organizations");
          setOrganizations(res.data);
        } catch (err) {
          console.error("Failed to load organizations", err);
          setOrganizations([]); // fallback
        }
      };
      fetchOrgs();
    }
  }, [category]);

  const normalizedRole = role?.replace("-portal", "").toLowerCase();
  const canSignUp =
    category === "online" ||
    (["enterprise", "institution"].includes(category || "") &&
      ["management", "instructor", "student"].includes(normalizedRole || ""));
      
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSignUp) return alert("Signup is not allowed for this portal.");
    if (password !== confirmPassword) return alert("Passwords do not match.");

    const payload: any = { email, password, category, role: normalizedRole };

    try {
      setLoading(true);

      // Management / Instructor org logic
      if (category !== "online" && ["management", "instructor"].includes(normalizedRole!)) {
        if (!orgDomain) {
          alert("Please provide your organization domain.");
          return;
        }

        // Query backend to see if domain exists
        const domainRes = await api.get<{ exists: boolean; org?: Organization }>(
          `/organizations/check-domain?domain=${orgDomain.toLowerCase()}`
        );

        if (domainRes.data.exists && domainRes.data.org) {
          // Org exists → signup individual associated with this org
          payload.organizationId = domainRes.data.org.id;
          payload.orgName = domainRes.data.org.name;
          payload.allowedDomain = domainRes.data.org.allowedDomain;
        } else {
          // Org doesn't exist → redirect to KYC
          navigate("/organization-kyc", {
            state: {
              email,
              category,
              role: normalizedRole,
              orgName,
              allowedDomain: orgDomain.toLowerCase(),
            },
          });
          return;
        }
      }

      // Student org selection
      if (normalizedRole === "student" && selectedOrgId) {
        payload.organizationId = selectedOrgId;
      }

      console.log("Signup payload:", payload);

      const res = await api.post("/auth/signup", payload);

      // Handle backend KYC requirement (edge case)
      if (res.data.action === "organizationKYCRequired") {
        navigate("/organization-kyc", {
          state: {
            email,
            category,
            role: normalizedRole,
            orgName: payload.orgName,
            allowedDomain: payload.allowedDomain,
          },
        });
        return;
      }

      alert(res.data.message || "Signup successful! Check your email for verification.");
      navigate(`/tech/user/${category}/${role}`);
    } catch (err: any) {
      // Check if backend signals KYC
      if (err.response?.status === 409 && err.response?.data?.action === "organizationKYCRequired") {
        navigate("/organization-kyc", {
          state: {
            email,
            category,
            role: normalizedRole,
            orgName: payload.orgName,
            allowedDomain: payload.allowedDomain,
          },
        });
      } else {
        alert(err.response?.data?.error || "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };


  /*const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSignUp) return alert("Signup is not allowed for this portal.");
    if (password !== confirmPassword) return alert("Passwords do not match.");

    const payload: any = { email, password, category, role: normalizedRole };

    // Only include org info if relevant
    if (category !== "online") {
      if (["management", "instructor"].includes(normalizedRole!)) {
        if (!orgName || !orgDomain) {
          // Redirect to organization KYC page
          navigate("/organization-kyc", {
            state: { email, category, role: normalizedRole },
          });
          return;
        }
        payload.orgName = orgName;
        payload.allowedDomain = orgDomain.toLowerCase();
      } else if (normalizedRole === "student" && selectedOrgId) {
        payload.organizationId = selectedOrgId;
      }
    }

    console.log("Signup payload:", payload);

    try {
      setLoading(true);
      const res = await api.post("/auth/signup", payload);

      if (res.data.action === "organizationKYCRequired") {
        console.log(res.data.message)
        navigate("/organization-kyc", {
          state: {
            email,
            category,
            role: normalizedRole,
            orgName: payload.orgName,
            allowedDomain: payload.allowedDomain,
          },
        });
        return;
      }

      alert(res.data.message || "Signup successful! Check your email for verification.");
      navigate(`/tech/user/${category}/${role}`);
    } catch (err: any) {

      alert(err.error.value);
    } finally {
      setLoading(false);
    }
  };*/

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {category === "enterprise" && <h2 className="text-2xl font-bold mb-4">Company Sign Up</h2>}
        {category === "institution" && <h2 className="text-2xl font-bold mb-4">Institution Sign Up</h2>}
        {category === "online" && <h2 className="text-2xl font-bold mb-4">Online User Sign Up</h2>}

        <p className="text-gray-600 mb-6 capitalize">{role?.replace("-", " ")}</p>

        {canSignUp ? (
          <form onSubmit={handleSignup} className="space-y-4">
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

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full border px-3 py-2 rounded-lg"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {category !== "online" && ["management", "instructor"].includes(normalizedRole!) && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Organization Name</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded-lg"
                    placeholder="Enter your organization name"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Organization Email Domain</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded-lg"
                    placeholder="yourcompany.com"
                    value={orgDomain}
                    onChange={(e) => setOrgDomain(e.target.value)}
                  />
                </div>
              </>
            )}

            {category !== "online" && normalizedRole === "student" && organizations.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-1">Select Organization</label>
                <select
                  value={selectedOrgId ?? ""}
                  onChange={(e) => setSelectedOrgId(Number(e.target.value))}
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                >
                  <option value="">-- Select Organization --</option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        ) : (
          <p className="text-red-600 font-semibold">
            Sign up is not allowed for this portal. Please contact your administrator.
          </p>
        )}
      </div>
    </div>
  );
}
