import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchAdminOverview,
  fetchInstructorOverview,
  fetchManagementOverview,
  fetchLearnerOverview,
} from "../api/endpoints/admin.api";

/**
 * Role-aware dashboard data fetcher.
 * Automatically fetches overview data based on user role.
 * Optionally override role for debugging or admin viewing.
 */
export function useDashboard(forRole?: "admin" | "management" | "instructor" | "learner") {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.dashboard);
  const userRole = useAppSelector((state) => state.auth.user?.role || "learner");
  const role = forRole || userRole;

  useEffect(() => {
    switch (role) {
      case "admin":
        dispatch(fetchAdminOverview());
        break;
      case "management":
        dispatch(fetchManagementOverview());
        break;
      case "instructor":
        dispatch(fetchInstructorOverview());
        break;
      case "learner":
      default:
        dispatch(fetchLearnerOverview());
        break;
    }
  }, [dispatch, role]);

  return { data, status, error };
}
