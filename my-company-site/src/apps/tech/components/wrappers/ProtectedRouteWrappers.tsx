import { useState, useEffect } from "react";
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
