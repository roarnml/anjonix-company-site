import React from "react";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  value = [0, 1000000000], // ✅ default
  onChange
}) => {
  const [minValue, maxValue] = value;

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-800 mb-2">Price Range</h3>
      <div className="flex flex-col space-y-2">
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={(e) => onChange([Number(e.target.value), maxValue])}
          className="w-full accent-blue-600"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={(e) => onChange([minValue, Number(e.target.value)])}
          className="w-full accent-blue-600"
        />
        <div className="text-sm text-gray-600">
          ₦{minValue.toLocaleString()} - ₦{maxValue.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
