// /components/SolutionsCard.tsx
import React from 'react';
import { FaStar } from 'react-icons/fa';

export type Solution = {
  id: number;
  name: string;
  img: string;
  desc: string;
  spec: string;
  pricing: string;
  rating: number;
  category: string;
};

interface SolutionsCardProps {
  solution: Solution;
  actionLabel?: string;
  onAction?: () => void;
}

const SolutionsCard: React.FC<SolutionsCardProps> = ({ solution, actionLabel = "Request", onAction }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col border hover:shadow-lg transition-shadow">
      <img src={solution.img} alt={solution.name} className="h-48 w-full object-cover" />

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-1">{solution.name}</h3>
        <p className="text-sm text-gray-600 flex-1">{solution.desc}</p>

        <p className="text-xs text-gray-500 mt-1">{solution.spec}</p>

        <div className="flex items-center mt-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              className={`h-4 w-4 ${i < solution.rating ? "text-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-blue-600 font-bold">{solution.pricing}</span>
          {onAction && (
            <button
              onClick={onAction}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolutionsCard;
