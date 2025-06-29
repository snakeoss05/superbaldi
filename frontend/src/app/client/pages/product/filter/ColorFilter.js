"use client";
import React, { useState } from "react";

export default function ColorFilter({ colors, setSelectedColors }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="overflow-hidden h-fit">
      <hr className="my-4" />
      <div
        className="flex flex-row items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}>
        <h2 className="text-xl font-semibold mb-2">Color</h2>
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
        className={`flex flex-row gap-4 w-full  flex-wrap transation-opacity duration-500  ${
          isOpen ? "opacity-100 h-fit" : "opacity-0 h-0"
        }`}>
        {colors.length > 0 ? (
          colors.map((color, index) => (
            <div
              className="flex justify-center h-10 items-center gap-2 rounded-full transation ease-in duration-300 border border-gray-200 p-2 hover:border-gray-700 cursor-pointer"
              key={index}
              onClick={() => setSelectedColors(color)}>
              <span
                className="h-[22px] w-[22px] rounded-full"
                style={{ backgroundColor: color }}></span>
              <span className="text-sm text-gray-500">{color}</span>
            </div>
          ))
        ) : (
          <div className="w-full flex items-center justify-center">
            <span className=" text-gray-400">No Colors Available</span>
          </div>
        )}
      </div>
    </div>
  );
}
