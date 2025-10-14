import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

type DashboardLayoutProps = {
  variant: "admin" | "management" | "instructor" | "learner";
};

export default function DashboardLayout({ variant }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar variant={variant} />
      <main className="flex-1 flex flex-col">
        <Topbar variant={variant} />
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
