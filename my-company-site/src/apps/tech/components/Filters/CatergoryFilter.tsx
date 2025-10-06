import React from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-800 mb-2">Category</h3>
      <ul className="space-y-2">
        {(categories || []).map((category) => (
          <li key={category}>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => onChange(category)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{category}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
