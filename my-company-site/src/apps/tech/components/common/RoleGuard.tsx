import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

/**
 * RoleGuard ensures only users with specific roles
 * can access the wrapped routes. It automatically
 * redirects unauthorized or unauthenticated users
 * to the correct login or fallback page.
 */
export default function RoleGuard({ allowed }: { allowed: string[] }) {
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role || "learner";

  // If no user exists, redirect based on the route area
  if (!user) {
    // Redirect logic — adjusts dynamically based on current path
    if (location.pathname.includes("/tech/admin")) {
      return <Navigate to="/tech/admin/login" state={{ from: location }} replace />;
    }
    return <Navigate to="/tech/user/login" state={{ from: location }} replace />;
  }

  // If user exists but role is not allowed, send them to an unauthorized page
  if (!allowed.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If everything checks out, render the nested route
  return <Outlet />;
}
