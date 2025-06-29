import React, { useState } from "react";

export default function SizeFilter({ sizes, setSelectedSize, selectedSize }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <hr className="my-4" />
      <div
        className="flex flex-row items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}>
        <h2 className="text-xl font-semibold mb-2">Size</h2>
        <svg
          className={`w-10 h-10  transation duration-500 text-gray-700 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="currentColor">
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g id="icomoon-ignore"> </g>{" "}
            <path
              d="M16.767 12.809l-0.754-0.754-6.035 6.035 0.754 0.754 5.281-5.281 5.256 5.256 0.754-0.754-3.013-3.013z"
              fill="currentColor">
              {" "}
            </path>{" "}
          </g>
        </svg>
      </div>

      <div
        className={`flex flex-row gap-4 mt-2 w-full flex-wrap transation duration-500 overflow-hidden ${
          isOpen ? "h-16" : "h-0"
        }`}>
        {sizes.length > 0 ? (
          sizes.map((size, index) => (
            <button
              key={index}
              onClick={() => setSelectedSize(size)}
              className={`w-11 h-11 border rounded-full transation ease-in duration-300  border-gray-200  hover:border-gray-700 cursor-pointer ${
                selectedSize === size ? "bg-gray-900 text-white" : "bg-white"
              }`}>
              {size}
            </button>
          ))
        ) : (
          <div className="w-full flex items-center justify-center">
            <p className="text-gray-400">No sizes available</p>
          </div>
        )}
      </div>
    </div>
  );
}
