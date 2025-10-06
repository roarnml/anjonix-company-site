export default function LatestNewsCard() {
  const news = [
    {
      headline: "Anjonix Receives Innovation Grant",
      date: "Aug 2025",
      summary: "Recognized for its contributions to tech-powered agriculture and education."
    },
    {
      headline: "Partnership with Federal Ministry of Education",
      date: "July 2025",
      summary: "Collaborating to deploy smart classrooms in 50 public schools."
    }
  ];

  return (
    <div className="py-10 px-6 bg-white text-black">
      <h2 className="text-2xl font-bold text-center mb-6">Latest News</h2>
      <div className="space-y-4">
        {news.map((item, idx) => (
          <div key={idx} className="border-b pb-4">
            <h3 className="font-semibold text-lg">{item.headline}</h3>
            <p className="text-xs text-gray-500">{item.date}</p>
            <p className="text-sm text-gray-700 mt-1">{item.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
