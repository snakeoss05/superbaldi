import React, { useState } from "react";

export default function Brands({ brands, setSelectedBrands }) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedBrands, setSelectedBrandsLocal] = useState([]);

  const handleBrandToggle = (brand) => {
    const newSelection = selectedBrands.includes(brand)
      ? selectedBrands.filter((item) => item !== brand)
      : [...selectedBrands, brand];

    setSelectedBrandsLocal(newSelection);
    setSelectedBrands(newSelection);
  };

  return (
    <div className="space-y-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          <h2 className="text-base font-medium text-gray-800">
            العلامات التجارية
          </h2>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {brands.map((brand, index) => (
            <label
              key={index}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="relative">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                />
                <div className="h-5 w-5 border border-gray-300 rounded flex items-center justify-center peer-checked:bg-primary-500 peer-checked:border-primary-500 transition-colors">
                  <svg
                    className={`h-4 w-4  text-primary opacity-0 peer-checked:opacity-100 transition-opacity"
                    fill="none ${
                      selectedBrands.includes(brand)
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-sm text-gray-700 capitalize">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
