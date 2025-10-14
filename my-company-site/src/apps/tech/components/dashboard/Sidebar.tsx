import { useNavigate } from "react-router-dom";
import React from "react";
import { Home, Users, BookOpen, BarChart3, Settings } from "lucide-react";
import { useAppSelector } from "../../app/hooks";

type MenuItem = { label: string; icon: React.ReactNode; path: string };

type SidebarProps = {
  variant?: "admin" | "management" | "instructor" | "learner";
};

const roleMenus: Record<string, MenuItem[]> = {
  admin: [
    { label: "Dashboard", icon: <Home />, path: "/admin/dashboard" },
    { label: "Users", icon: <Users />, path: "/admin/users" },
    { label: "Reports", icon: <BarChart3 />, path: "/admin/reports" },
    { label: "Settings", icon: <Settings />, path: "/admin/settings" },
  ],
  management: [
    { label: "Overview", icon: <Home />, path: "/management/overview" },
    { label: "Teams", icon: <Users />, path: "/management/teams" },
    { label: "Performance", icon: <BarChart3 />, path: "/management/performance" },
  ],
  instructor: [
    { label: "Courses", icon: <BookOpen />, path: "/instructor/courses" },
    { label: "Learners", icon: <Users />, path: "/instructor/learners" },
    { label: "Reports", icon: <BarChart3 />, path: "/instructor/reports" },
  ],
  learner: [
    { label: "My Courses", icon: <BookOpen />, path: "/learner/courses" },
    { label: "Progress", icon: <BarChart3 />, path: "/learner/progress" },
    { label: "Settings", icon: <Settings />, path: "/learner/settings" },
  ],
};

export default function Sidebar({ variant }: SidebarProps) {
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const resolvedVariant = variant || user?.role || "learner";

  const menus = roleMenus[resolvedVariant] || [];

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col min-h-screen p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4 tracking-wide capitalize">
        {resolvedVariant} Portal
      </h2>
      <nav className="flex flex-col space-y-2">
        {menus.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
