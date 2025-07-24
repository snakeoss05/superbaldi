import React, { useState, useEffect } from "react";
import axios from "axios";
import Brands from "./Brands";
import PriceRange from "./PriceRange";

export default function Filter({
  setMinPrice,
  setMaxPrice,
  setSelectedBrands,
  category,
  SelectedBrands,
  minPrice,
  maxPrice,
}) {
  const [brands, setBrands] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    brands: [],
    price: false,
  });

  useEffect(() => {
    async function getFilterOptions() {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          categoryId: category ?? "",
        }).toString();

        const response = await axios.get(
          `http://localhost:5000/api/products/filter-options?${queryParams}`
        );

        setBrands(response.data.brands);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      } finally {
        setLoading(false);
      }
    }

    getFilterOptions();
  }, [category]);

  function handleBrandChange(updater) {
    setActiveFilters((prev) => ({
      ...prev,
      brands: updater.length > 0,
    }));
  }

  const handlePriceChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
    setActiveFilters((prev) => ({
      ...prev,
      price: min > 0 || max < 1000,
    }));
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(1000);
    setActiveFilters({
      brands: false,
      price: false,
    });
  };

  const hasActiveFilters = activeFilters.brands || activeFilters.price;

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
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
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <h2 className="text-lg font-semibold text-gray-800">الفلاتر</h2>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            إعادة التعيين
          </button>
        )}
      </div>

      <div className="p-4 space-y-6 text-right">
        {brands && brands.length > 0 && (
          <Brands brands={brands} setSelectedBrands={setSelectedBrands} />
        )}

        <PriceRange
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          onPriceChange={handlePriceChange}
        />
      </div>
    </div>
  );
}
