import React, { useState, useEffect } from "react";

const PriceRangeSlider = ({
  maxPrice,
  minPrice,
  setMinPrice,
  setMaxPrice,
  onPriceChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
  }, [minPrice, maxPrice]);

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value < localMaxPrice) {
      setLocalMinPrice(value);
      if (!isDragging) {
        setMinPrice(value);
        if (onPriceChange) onPriceChange(value, localMaxPrice);
      }
    }
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > localMinPrice) {
      setLocalMaxPrice(value);
      if (!isDragging) {
        setMaxPrice(value);
        if (onPriceChange) onPriceChange(localMinPrice, value);
      }
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setMinPrice(localMinPrice);
    setMaxPrice(localMaxPrice);
    if (onPriceChange) onPriceChange(localMinPrice, localMaxPrice);
  };

  const applyFilter = () => {
    setMinPrice(localMinPrice);
    setMaxPrice(localMaxPrice);
    if (onPriceChange) onPriceChange(localMinPrice, localMaxPrice);
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
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-base font-medium text-gray-800">نطاق السعر</h2>
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
        {/* Slider */}
        <div className="relative py-6 w-full">
          {/* Range Track */}
          <div className="absolute top-1/2 w-full h-1 bg-gray-200 rounded-full transform -translate-y-1/2"></div>
          <div
            className="absolute top-1/2 h-1 bg-primary-500 rounded-full transform -translate-y-1/2"
            style={{
              left: `${(localMinPrice / 5000) * 100}%`,
              width: `${((localMaxPrice - localMinPrice) / 5000) * 100}%`,
            }}></div>

          {/* Min Slider */}
          <input
            type="range"
            min="0"
            max="5000"
            step="10"
            value={localMinPrice}
            onChange={handleMinChange}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            className="absolute w-full opacity-0 h-1 appearance-none bg-transparent pointer-events-auto"
            style={{ zIndex: 3 }}
          />

          {/* Max Slider */}
          <input
            type="range"
            min="0"
            max="5000"
            step="10"
            value={localMaxPrice}
            onChange={handleMaxChange}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            className="absolute w-full h-1   opacity-0 appearance-none bg-transparent pointer-events-auto"
            style={{ zIndex: 3 }}
          />

          {/* Slider Thumbs */}
          <div
            className="absolute top-1/2 w-4 h-4 bg-white border-2 border-primary-500 rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-pointer shadow-md"
            style={{ right: `${(localMinPrice / 5000) * 100}%` }}></div>
          <div
            className="absolute top-1/2 w-4 h-4 bg-white border-2 border-primary-500 rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-pointer shadow-md"
            style={{ right: `${(localMaxPrice / 5000) * 100}%` }}></div>
        </div>

        {/* Price Display and Apply Button */}
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{localMinPrice} د.ت</span> -{" "}
              <span className="font-medium">{localMaxPrice} د.ت</span>
            </div>
            <button
              onClick={applyFilter}
              className="px-3 py-1 text-xs font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600 transition-colors">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
