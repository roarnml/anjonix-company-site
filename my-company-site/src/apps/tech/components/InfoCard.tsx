// InfoCard.tsx
import type { Card } from "../types/card";


export default function InfoCard({ title, description, icon }: Card) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      {icon && <div className="mb-2">{icon}</div>}
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
