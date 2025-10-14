import { Bell, UserCircle, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"; // 👈 use your typed hooks
import { logout } from "../../features/auth/authSlice";

type TopbarProps = {
  variant?: "admin" | "management" | "instructor" | "learner";
};

export default function Topbar({ variant }: TopbarProps) {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const resolvedVariant = variant || user?.role || "learner"; // fallback

  return (
    <header className="w-full bg-white border-b border-gray-300 flex items-center justify-between px-6 py-3 shadow-sm">
      <h1 className="text-lg font-semibold text-gray-800 capitalize">
        {resolvedVariant} Dashboard
      </h1>

      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell className="text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1">
            3
          </span>
        </button>

        <div className="flex items-center gap-2">
          <UserCircle className="text-gray-700" size={24} />
          <span className="text-gray-700 text-sm">{user?.role?.toUpperCase()}</span>
        </div>

        <button
          onClick={() => dispatch(logout())}
          className="flex items-center gap-1 text-red-600 hover:text-red-700"
        >
          <LogOut size={18} /> <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
