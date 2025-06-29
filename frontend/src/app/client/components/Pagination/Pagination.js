import React from "react";

export default function Pagination({ page, totalPages, setPage }) {
  return (
    <ol className="flex justify-center gap-1 text-xs font-medium">
      <li>
        <a
          href="#"
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-info text-primrtl:rotate-180 hover:bg-[#1f1f1f] hover:text-white">
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 "
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </li>
      {Array.from({ length: totalPages }, (_, index) => (
        <li
          key={index}
          onClick={() => setPage(index + 1)}
          className={`block size-8 rounded border border-gray-100  text-center leading-8     hover:bg-[#1f1f1f] hover:text-white ${
            index + 1 === page
              ? "bg-[#1f1f1f] text-white"
              : "bg-white text-black"
          }`}>
          {index + 1}
        </li>
      ))}

      <li>
        <a
          href="#"
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-info text-primrtl:rotate-180 hover:bg-[#1f1f1f] hover:text-white">
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </li>
    </ol>
  );
}
