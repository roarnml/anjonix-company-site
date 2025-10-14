import { Card } from "../../components/card/dashboardCard";
import { useDashboard } from "../../hooks/useDashboad";
import { Users, BarChart3, Briefcase, TrendingUp } from "lucide-react";

export default function ManagementDashboard() {
  const { data, status } = useDashboard();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Management Dashboard</h1>

      {status === "loading" && <p className="mt-4 text-gray-500">Loading performance data...</p>}
      {status === "failed" && <p className="mt-4 text-red-500">Failed to load metrics.</p>}

      {status === "succeeded" && data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <Card title="Active Teams" value={data.teams} icon={<Users />} color="indigo" />
          <Card title="Projects" value={data.projects} icon={<Briefcase />} color="blue" />
          <Card title="KPIs Met" value={`${data.kpisMet}%`} icon={<TrendingUp />} color="green" />
          <Card title="Performance Score" value={data.performanceScore} icon={<BarChart3 />} color="amber" />
        </div>
      )}
    </div>
  );
}
