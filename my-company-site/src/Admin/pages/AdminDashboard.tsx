import { useEffect, useState } from "react";
import api from "../../utils/api";

type AdminStats = {
  products: number;
  orders: number;
  paid_orders: number;
  revenue: number;
};


export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api.get<AdminStats>("admin-stats/", {
      headers: { Authorization: `Token ${token}` }
    }).then(res => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading admin stats...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📊 Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card label="Products" value={stats.products} />
        <Card label="Total Orders" value={stats.orders} />
        <Card label="Paid Orders" value={stats.paid_orders} />
        <Card label="Revenue" value={`$${stats.revenue}`} />
      </div>
    </div>
  );
}


type CardProps = {
  label: string;
  value: string | number;
};

function Card({ label, value }: CardProps) {
  return (
    <div className="bg-white shadow p-4 rounded">
      <h2 className="text-lg font-semibold">{label}</h2>
      <p className="text-2xl">{value}</p>
    </div>
  );
}
