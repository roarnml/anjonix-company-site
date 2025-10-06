import CountUp from "react-countup";

const metrics = [
  { label: "Clients Served", value: 1200 },
  { label: "Farms Deployed", value: 300 },
  { label: "Schools Digitized", value: 150 },
  { label: "Energy Systems Installed", value: 90 }
];

export default function ImpactMetricsCard() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-8 text-center">
      {metrics.map((metric, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-3xl font-bold text-blue-600">
            <CountUp end={metric.value} duration={3} />
          </h2>
          <p className="text-gray-600 mt-2">{metric.label}</p>
        </div>
      ))}
    </div>
  );
}
