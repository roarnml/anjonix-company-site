import { useParams, Navigate } from "react-router-dom";
import ManagementDashboard from "./ManagementDashboard";
// import other dashboards as needed

const DashboardWrapper = () => {
  const { category, role } = useParams<{ category: string, role: string }>();

  // Normalize role just in case
  const normalizedRole = role?.replace("-portal", "").toLowerCase();

  if ((category === "enterprise" || category === "institution") && normalizedRole === "management") {
    return <ManagementDashboard />;
  }

  // TODO: Add other dashboards like InstructorDashboard, StudentDashboard here

  // Unauthorized fallback
  return <Navigate to={`/tech/user/${category}/${role}`} replace />;
};

export default DashboardWrapper;
