
import AdminDashboard from './pages/AdminDashboard';
import { Routes, Route } from 'react-router-dom'

export default function AdminApp() {
  return (
    <Routes>
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  )
}
