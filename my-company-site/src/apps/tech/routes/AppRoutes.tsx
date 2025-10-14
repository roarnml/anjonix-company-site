import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";

// Lazy imports for performance
//const Login = lazy(() => import("../auths/Login"));
const VerifyEmail = lazy(() => import("../auths/VerifyEmail"));
const AdminLogin = lazy(() => import("../pages/admin/Login"));
const UserPortalRoutes = lazy(() => import("./UserPortalRoutes"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
import ProtectedRoute from "../components/common/ProtectedRoute";
import RoleGuard from "../components/common/RoleGuard";
import DashboardLayout from "../components/Layouts/Layout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ============================ */}
      {/* 🔐 ADMIN REALM */}
      {/* ============================ */}
      <Route path="/tech/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleGuard allowed={["admin", "superuser"]} />}>
          <Route
            path="/tech/admin/dashboard/*"
            element={<DashboardLayout variant="admin" />}
          >
            <Route index element={<AdminDashboard />} />
            {/* Add more admin subroutes here */}
          </Route>
        </Route>
      </Route>

      {/* ============================ */}
      {/* 🧭 USER REALM (LEARNER / ORG / INSTRUCTOR) */}
      {/* ============================ */}
      <Route path="/tech/user/*" element={<UserPortalRoutes />} />

        {/* ✅ Email verification */}
        <Route path="/verify" element={<VerifyEmail />} />

      {/* ============================ */}
      {/* 🚦 DEFAULT REDIRECT */}
      {/* ============================ */}
      <Route path="*" element={<Navigate to="/tech/user/login" replace />} />
    </Routes>
  );
}
