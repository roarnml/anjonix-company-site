/*import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auths/Login";
import DashboardLayout from "../components/Layouts/Layout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import RoleGuard from "../components/common/RoleGuard";

// Example lazy imports
import AdminDashboard from "../pages/admin/Dashboard";
import OrgDashboard from "../pages/org/Dashboard";
import InstructorDashboard from "../pages/instructor/Dashboard";
import LearnerDashboard from "../pages/learner/Dashboard";

export default function UserPortalRoutes() {
  return (
    <Routes>
      {/* 🔐 Auth *}
      <Route path="login" element={<Login />} />

      {/* 👑 Admin *}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleGuard allowed={["admin", "superuser"]} />}>
          <Route path="admin" element={<DashboardLayout variant={"admin"} />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="payments" element={<AdminPayments />} />
          </Route>
        </Route>

        {/* 🏫 Organization *}
        <Route element={<RoleGuard allowed={["orgAdmin", "management"]} />}>
          <Route path="org" element={<DashboardLayout variant="management" />}>
            <Route index element={<OrgDashboard />} />
            <Route path="courses" element={<OrgCourses />} />
            <Route path="learners" element={<OrgLearners />} />
          </Route>
        </Route>

        {/* 🧑‍🏫 Instructor *}
        <Route element={<RoleGuard allowed={["instructor"]} />}>
          <Route path="instructor" element={<DashboardLayout variant="instructor" />}>
            <Route index element={<InstructorDashboard />} />
            <Route path="courses" element={<InstructorCourses />} />
            <Route path="bookings" element={<InstructorBookings />} />
          </Route>
        </Route>

        {/* 🎓 Learner *}
        <Route element={<RoleGuard allowed={["learner", "student"]} />}>
          <Route path="learner" element={<DashboardLayout variant="learner" />}>
            <Route index element={<LearnerDashboard />} />
            <Route path="courses" element={<LearnerCourses />} />
            <Route path="bookings" element={<LearnerBookings />} />
            <Route path="payments" element={<LearnerPayments />} />
          </Route>
        </Route>
      </Route>

      {/* Default redirect *}
      <Route path="*" element={<Navigate to="/tech/user/login" replace />} />
    </Routes>
  );
}
*/

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auths/Login";
import DashboardLayout from "../components/Layouts/Layout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import RoleGuard from "../components/common/RoleGuard";

import OrgDashboard from "../pages/org/Dashboard";
import InstructorDashboard from "../pages/instructor/Dashboard";
import LearnerDashboard from "../pages/learner/Dashboard";

export default function UserPortalRoutes() {
  return (
    <Routes>
      {/* Public login for all categories and roles */}
      <Route path=":category/:role" element={<Login />} />

      {/* Protected Dashboards */}
      <Route element={<ProtectedRoute />}>
        {/* Management Dashboard */}
        <Route element={<RoleGuard allowed={["management", "orgAdmin"]} />}>
          <Route
            path="management/*"
            element={<DashboardLayout variant="management" />}
          >
            <Route index element={<OrgDashboard />} />
          </Route>
        </Route>

        {/* Instructor Dashboard */}
        <Route element={<RoleGuard allowed={["instructor"]} />}>
          <Route
            path="instructor/*"
            element={<DashboardLayout variant="instructor" />}
          >
            <Route index element={<InstructorDashboard />} />
          </Route>
        </Route>

        {/* Student/Learner Dashboard */}
        <Route element={<RoleGuard allowed={["student", "learner"]} />}>
          <Route
            path="student/*"
            element={<DashboardLayout variant="learner" />}
          >
            <Route index element={<LearnerDashboard />} />
          </Route>
        </Route>
      </Route>

      {/* Default redirect to student login */}
      <Route
        path="*"
        element={<Navigate to="/tech/user/online/student" replace />}
      />
    </Routes>
  );
}
