import React from "react";

interface RatingFilterProps {
  selectedRating: number;
  onChange: (rating: number) => void;
}

const RatingFilter: React.FC<RatingFilterProps> = ({ selectedRating, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-800 mb-2">Minimum Rating</h3>
      <ul className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => (
          <li key={rating}>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={selectedRating === rating}
                onChange={() => onChange(rating)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">
                {"★".repeat(rating)}
                {"☆".repeat(5 - rating)}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RatingFilter;
