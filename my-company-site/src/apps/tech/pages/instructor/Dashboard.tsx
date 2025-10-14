import { Card } from "../../components/card/dashboardCard";
import { useDashboard } from "../../hooks/useDashboad";
import { BookOpen, Users, Star, ClipboardCheck } from "lucide-react";

export default function InstructorDashboard() {
  const { data, status } = useDashboard();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Instructor Dashboard</h1>

      {status === "loading" && <p className="mt-4 text-gray-500">Loading instructor stats...</p>}
      {status === "failed" && <p className="mt-4 text-red-500">Failed to load stats.</p>}

      {status === "succeeded" && data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <Card title="Courses" value={data.courses} icon={<BookOpen />} color="blue" />
          <Card title="Students" value={data.students} icon={<Users />} color="purple" />
          <Card title="Completed Lessons" value={data.completedLessons} icon={<ClipboardCheck />} color="green" />
          <Card title="Average Rating" value={`${data.avgRating}/5`} icon={<Star />} color="amber" />
        </div>
      )}
    </div>
  );
}
