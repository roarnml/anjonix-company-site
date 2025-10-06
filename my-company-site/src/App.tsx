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

export default function App() {
  return (
    <Routes>
      {/* Public Website */}
      <Route path="/" element={<PublicLayout  />} >
        <Route index element={<Home />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* Separate Sub-Apps */}
      <Route path="/blog/*" element={<BlogApp />} />
      <Route path="/tech/*" element={<TechApp />} />
      <Route path="/agric/*" element={<AgricApp />} />
      <Route path="/tech/user/:category/:role" element={<Login />} />
      <Route path="/tech/signup/:category/:role" element={<Signup />} />
      <Route path="/organization-kyc" element={<OrganizationKYC />} />
      <Route path="/edu/*" element={<EduApp />} />
      <Route path="/admin/*" element={<AdminApp />} /> {/* Admin routes can be handled here or separately */}
      {/* Protected routes */}
        <Route
          path="/tech/user/:category/:role/dashboard"
          element={
            <ProtectedRoute>
              <DashboardWrapper />
            </ProtectedRoute>
          }
        />
    </Routes>
  )
}
