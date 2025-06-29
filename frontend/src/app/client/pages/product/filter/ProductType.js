import React, { useState } from "react";

export default function ProductType({ productType, setProductType }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <div
        className="flex items-center justify-between gap-2"
        onClick={() => setIsOpen(!isOpen)}>
        <p className="text-xl font-semibold">Product Type</p>
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
      {productType &&
        productType.map((item, index) => (
          <div
            className={`flex flex-col gap-4  transation duration-300 overflow-hidden ${
              isOpen
                ? "opacity-100 scale-y-100 h-fit"
                : "opacity-0 h-0 scale-y-0"
            }`}
            key={index}>
            <p className="w-fit text-lg cursor-pointer my-2 relative after:ease after:transition-all after:duration-300 after:content[''] hover:after:border hover:after:border-b-1 after:border-gray-300 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full text-gray-500 font-normal">
              {item.name}
            </p>
          </div>
        ))}
    </div>
  );
}
