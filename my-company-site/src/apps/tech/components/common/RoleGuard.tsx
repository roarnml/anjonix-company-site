import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import type { ReactNode } from "react";

/**
 * RoleGuard ensures only users with specific roles
 * can access the wrapped routes. It automatically
 * redirects unauthorized or unauthenticated users
 * to the correct login or fallback page.
 */
export default function RoleGuard({
  allowed,
  children,
}: {
  allowed: string[];
  children?: ReactNode;
}) {
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role || "learner";

  // If no user exists, redirect based on the route area
  if (!user) {
    if (location.pathname.includes("/tech/admin")) {
      return (
        <Navigate to="/tech/admin/login" state={{ from: location }} replace />
      );
    }
    return <Navigate to="/tech/user/login" state={{ from: location }} replace />;
  }

  // If user exists but role is not allowed, send them to an unauthorized page
  if (!allowed.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If everything checks out, render the nested elements
  return <>{children}</>;
}
