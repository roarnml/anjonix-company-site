// src/components/BrandFilter.tsx
import React from "react";

interface BrandFilterProps {
  brands: string[];
  selectedBrand: string;
  onChange: (brand: string) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({ brands, selectedBrand, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-800 mb-2">Brand</h3>
      <ul className="space-y-2">
        {(brands || []).map((brand) => (
          <li key={brand}>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="brand"
                value={brand}
                checked={selectedBrand === brand}
                onChange={() => onChange(brand)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{brand}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandFilter;
