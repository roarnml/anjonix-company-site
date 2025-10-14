import { type ReactNode } from "react";

interface CardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: string; // optional: Tailwind color for accent
}

export function Card({ title, value, icon, color = "blue" }: CardProps) {
  const border = `border-${color}-500`;
  const text = `text-${color}-600`;

  return (
    <div
      className={`bg-white shadow-md rounded-2xl p-5 flex flex-col justify-between border-l-4 ${border} transition hover:shadow-lg`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && <div className={`text-${color}-500`}>{icon}</div>}
      </div>
      <p className={`text-2xl font-bold mt-2 ${text}`}>{value}</p>
    </div>
  );
}
