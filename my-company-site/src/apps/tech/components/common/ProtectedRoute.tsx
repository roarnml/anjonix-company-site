import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

type Props = { redirectTo?: string };
export default function ProtectedRoute({ redirectTo = "/login" }: Props) {
  const token = useAppSelector((s) => s.auth.accessToken);
  if (!token) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
}
