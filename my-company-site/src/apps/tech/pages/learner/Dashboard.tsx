import { Card } from "../../components/card/dashboardCard";
import { useDashboard } from "../../hooks/useDashboad";
import { BookOpen, Clock, Trophy, BarChart3 } from "lucide-react";

export default function LearnerDashboard() {
  const { data, status } = useDashboard();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Learner Dashboard</h1>

      {status === "loading" && <p className="mt-4 text-gray-500">Loading your learning data...</p>}
      {status === "failed" && <p className="mt-4 text-red-500">Couldn’t load progress overview.</p>}

      {status === "succeeded" && data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <Card title="Courses Enrolled" value={data.enrolledCourses} icon={<BookOpen />} color="blue" />
          <Card title="Hours Learned" value={`${data.hoursLearned}h`} icon={<Clock />} color="purple" />
          <Card title="Achievements" value={data.achievements} icon={<Trophy />} color="amber" />
          <Card title="Progress" value={`${data.progress}%`} icon={<BarChart3 />} color="green" />
        </div>
      )}
    </div>
  );
}
