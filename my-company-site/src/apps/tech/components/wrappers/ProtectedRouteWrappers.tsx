/*import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import api from "../../api/api";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children?: ReactNode;
}

const SESSION_TIMEOUT_MINUTES = 30;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // to preserve intended route after login

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const now = new Date().getTime();
        const lastActive = new Date(res.data.lastActive).getTime();

        // Check server-side session timeout (30 mins)
        if (now - lastActive > SESSION_TIMEOUT_MINUTES * 60 * 1000) {
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser(res.data);
        }
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    // Derive category & role from the current path
    const pathParts = location.pathname.split("/").filter(Boolean); // removes empty strings
    const category = pathParts[2] || "online"; // e.g., /tech/user/enterprise/management
    const role = pathParts[3] || "";
    const normalizedRole = role?.replace("-portal", "").toLowerCase();
    console.log("Protected Route: ", normalizedRole)

    // Redirect to the right login page
    return <Navigate to={`/tech/user/${category}/${normalizedRole}`} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
*/

import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import api from "../../api/api";

const SESSION_TIMEOUT_MINUTES = 30;

export default function ProtectedRoute() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { lastActive, ...userData } = res.data;
        const now = Date.now();
        const lastActiveTime = new Date(lastActive).getTime();

        // Check session validity
        if (now - lastActiveTime > SESSION_TIMEOUT_MINUTES * 60 * 1000) {
          console.warn("Session expired due to inactivity.");
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser(userData);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="text-center py-10">Loading session...</p>;

  if (!user) {
    // Extract fallback info from the URL in case token is missing
    const pathParts = location.pathname.split("/").filter(Boolean);
    const category = pathParts[2] || "online"; // default to online
    const role = pathParts[3]?.replace("-portal", "").toLowerCase() || "student";

    console.warn(`No active user found. Redirecting to /tech/user/${category}/${role}`);
    return <Navigate to={`/tech/user/${category}/${role}`} replace />;
  }

  // User is valid, continue to their dashboard
  return <Outlet />;
}
