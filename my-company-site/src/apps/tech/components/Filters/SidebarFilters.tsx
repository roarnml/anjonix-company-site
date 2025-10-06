/*import React from "react";
import CategoryFilter from "./CatergoryFilter";
import PriceRangeSlider from "./PriceRangeSlider";
import RatingFilter from "./RatingFilter";

interface SidebarFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedRating: number;
  onRatingChange: (rating: number) => void;
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  selectedRating,
  onRatingChange,
}) => {
  return (
    <aside className="w-64 bg-white p-4 border rounded-lg shadow-sm">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={onCategoryChange}
      />

      <PriceRangeSlider
        min={0}
        max={1000000}
        value={priceRange}
        onChange={onPriceChange}
      />

      <RatingFilter
        selectedRating={selectedRating}
        onChange={onRatingChange}
      />
    </aside>
  );
};

export default SidebarFilters;
*/


/*import React from "react";
import CategoryFilter from "./CatergoryFilter";
import PriceRangeSlider from "./PriceRangeSlider";
import RatingFilter from "./RatingFilter";
import { XCircle } from "lucide-react";

interface SidebarFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedRating: number;
  onRatingChange: (rating: number) => void;
  onResetFilters?: () => void;
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  selectedRating,
  onRatingChange,
  onResetFilters,
}) => {
  return (
    <aside className="w-64 bg-white p-4 border rounded-lg shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
          >
            <XCircle size={16} /> Clear
          </button>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={onCategoryChange}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
        <PriceRangeSlider
          min={0}
          max={1000000}
          value={priceRange}
          onChange={onPriceChange}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Rating</h3>
        <RatingFilter
          selectedRating={selectedRating}
          onChange={onRatingChange}
        />
      </div>
    </aside>
  );
};

export default SidebarFilters;*/


// src/components/Filters/SidebarFilters.tsx
import React from "react";
import CategoryFilter from "./CatergoryFilter";
import BrandFilter from "./BrandFilter";
import PriceRangeSlider from "./PriceRangeSlider";
import RatingFilter from "./RatingFilter";
import { XCircle } from "lucide-react";

interface SidebarFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  brands?: string[];
  selectedBrand?: string;
  onBrandChange?: (brand: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedRating: number;
  onRatingChange: (rating: number) => void;
  onResetFilters?: () => void;
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  brands,
  selectedBrand,
  onBrandChange,
  priceRange,
  onPriceChange,
  selectedRating,
  onRatingChange,
  onResetFilters,
}) => {
  return (
    <aside className="w-64 bg-white p-4 border rounded-lg shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
          >
            <XCircle size={16} /> Clear
          </button>
        )}
      </div>

      {/* Category */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={onCategoryChange}
      />

      {/* Brand */}
      <BrandFilter
        brands={brands ?? []}
        selectedBrand={selectedBrand ?? ""}
        onChange={onBrandChange ?? (() => {})}
      />


      {/* Price */}
      <PriceRangeSlider
        min={0}
        max={1000000000}
        value={priceRange}
        onChange={onPriceChange}
      />

      {/* Rating */}
      <RatingFilter
        selectedRating={selectedRating}
        onChange={onRatingChange}
      />
    </aside>
  );
};

export default SidebarFilters;
