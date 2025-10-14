import { Routes, Route } from 'react-router-dom'
import PublicLayout from './public-site/Layout'
import Home from './public-site/pages/Home'
import Partners from './public-site/pages/Partners'
import Careers from './public-site/pages/Careers'
import About from './public-site/pages/About'
import TechApp from './apps/tech/TechApp'
import AgricApp from './apps/agric/AgricApp'
import EduApp from './apps/edu/EduApp'
import BlogApp from './apps/blog/BlogApp'
import AdminApp from './Admin/AdminApp'
import Login from './apps/tech/auths/Login'
import Signup from './apps/tech/auths/Signup'
import OrganizationKYC from './apps/tech/auths/OrganizationKYC'
import DashboardWrapper from './apps/tech/components/dashboard/DashboardWrapper'
import ProtectedRoute from './apps/tech/components/wrappers/ProtectedRouteWrappers'
import { lazy } from "react";
import RoleGuard from './apps/tech/components/common/RoleGuard'
import DashboardLayout from './apps/tech/components/Layouts/Layout'
import LearnerDashboard from './apps/tech/pages/learner/Dashboard'
import InstructorDashboard from './apps/tech/pages/instructor/Dashboard'
import OrgDashboard from './apps/tech/pages/org/Dashboard'


const VerifyEmail = lazy(() => import("./apps/tech/auths/VerifyEmail"));  

export default function App() {
  return (
    <Routes>
      {/* Public Website */}
      <Route path="/" element={<PublicLayout  />} >
        <Route index element={<Home />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/about" element={<About />} />
        <Route path="/verify" element={<VerifyEmail />} />
      </Route>

      {/* Separate Sub-Apps */}
      <Route path="/blog/*" element={<BlogApp />} />
      <Route path="/tech/*" element={<TechApp />} />
      <Route path="/agric/*" element={<AgricApp />} />
      <Route path="/tech/user/:category/:role" element={<Login />} />
      <Route path="/tech/signup/:category/:role" element={<Signup />} />
      <Route path="/organization-kyc" element={<OrganizationKYC />} />
      {/* 🔐 Protected dashboards */}
      <Route element={<ProtectedRoute />}>
        {/* 🎓 Student / Learner Dashboard */}
        <Route
          path="/tech/user/:category/student/*"
          element={
            <RoleGuard allowed={["student", "learner"]}>
              <DashboardLayout variant="learner">
                <LearnerDashboard />
              </DashboardLayout>
            </RoleGuard>
          }
        />

        {/* 🧑‍🏫 Instructor Dashboard */}
        <Route
          path="/tech/user/:category/instructor/*"
          element={
            <RoleGuard allowed={["instructor"]}>
              <DashboardLayout variant="instructor">
                <InstructorDashboard />
              </DashboardLayout>
            </RoleGuard>
          }
        />

        {/* 🏢 Management Dashboard */}
        <Route
          path="/tech/user/:category/management/*"
          element={
            <RoleGuard allowed={["management", "orgAdmin"]}>
              <DashboardLayout variant="management">
                <OrgDashboard />
              </DashboardLayout>
            </RoleGuard>
          }
        />
      </Route>
      <Route path="/edu/*" element={<EduApp />} />
      <Route path="/admin/*" element={<AdminApp />} /> {/* Admin routes can be handled here or separately */}
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/tech/user/:category/:role/dashboard"
          element={<DashboardWrapper />}
        />
      </Route>

    </Routes>
  )
}
