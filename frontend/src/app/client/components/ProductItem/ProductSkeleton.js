import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="rounded-lg py-8 ">
      <div className="h-56 w-full">
        <div className="h-56 w-full animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"></span>

          <div className="flex items-center justify-end gap-1"></div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center bg-gray-200 animate-pulse px-16 py-2"></div>
        </div>
        <ul className="mt-2 flex items-center gap-4">
          <li className="lex items-center gap-2 h-4 w-24 bg-gray-200 animate-pulse rounded-lg"></li>
          <li className="flex items-center gap-2 h-4 w-24 bg-gray-200 animate-pulse rounded-lg"></li>
        </ul>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="bg-gray-200 px-16 py-2 animate-pulse rounded-lg"></p>
          <div className="inline-flex items-center rounded-lg bg-gray-200 animate-pulse px-12 py-2.5 text-sm font-medium "></div>
        </div>
      </div>
    </div>
  );
}
