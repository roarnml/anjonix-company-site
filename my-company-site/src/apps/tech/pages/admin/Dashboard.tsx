import { Card } from "../../components/card/dashboardCard";
import { useDashboard } from "../../hooks/useDashboad";
import { Users, BookOpen, DollarSign, CalendarDays } from "lucide-react";

export default function AdminDashboard() {
  const { data, status } = useDashboard();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {status === "loading" && <p className="mt-4 text-gray-500">Loading data...</p>}
      {status === "failed" && <p className="mt-4 text-red-500">Failed to load overview.</p>}

      {status === "succeeded" && data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <Card title="Users" value={data.users} icon={<Users />} color="blue" />
          <Card title="Courses" value={data.courses} icon={<BookOpen />} color="green" />
          <Card title="Bookings" value={data.bookings} icon={<CalendarDays />} color="purple" />
          <Card title="Revenue" value={`$${data.revenue.toLocaleString()}`} icon={<DollarSign />} color="amber" />
        </div>
      )}
    </div>
  );
}
