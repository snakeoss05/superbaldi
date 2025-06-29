import React from "react";

export default function Filter({
  setMark,
  setStock,
  MarkList,
  maxPrice,
  minPrice,
  setMaxPrice,
  setMinPrice,
}) {
  function handleAvailability(e) {
    if (e.target.checked) {
      setStock(e.target.value);
    } else {
      setStock("");
    }
  }
  function handleMArk(e) {
    if (e.target.checked) {
      setMark(e.target.value);
    } else {
      setMark("");
    }
  }

  return (
    <div>
      <div className="space-y-2">
        <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
            <span className="text-sm font-medium"> Availability </span>

            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>

          <div className="border-t border-gray-200 bg-white">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm text-gray-700"> 0 defaultValue </span>

              <button
                type="button"
                role="button"
                id="FilterReset"
                className="text-sm text-gray-900 underline underline-offset-4"
              >
                Reset
              </button>
            </header>

            <ul className="space-y-1 border-t border-gray-200 p-4">
              <li>
                <label
                  htmlFor="FilterInStock"
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    value="1"
                    onChange={handleAvailability}
                    id="FilterInStock"
                    className="size-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    In Stock
                  </span>
                </label>
              </li>

              <li>
                <label
                  htmlFor="FilterPreOrder"
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id="FilterPreOrder"
                    className="size-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    {" "}
                    Pre Order
                  </span>
                </label>
              </li>

              <li>
                <label
                  htmlFor="FilterOutOfStock"
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    value="0"
                    id="FilterOutOfStock"
                    onChange={handleAvailability}
                    className="size-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    {" "}
                    Out of Stock
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </details>

        <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
            <span className="text-sm font-medium"> Price </span>

            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>

          <div className="border-t border-gray-200 bg-white">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm text-gray-700">
                {" "}
                The highest price is TND{maxPrice}
              </span>

              <button
                type="button"
                className="text-sm text-gray-900 underline underline-offset-4"
              >
                Reset
              </button>
            </header>

            <div className="border-t border-gray-200 p-4">
              <div className="flex justify-between gap-4">
                <label
                  htmlFor="FilterPriceFrom"
                  className="flex items-center gap-2"
                >
                  <span className="text-sm text-gray-600">TND</span>

                  <input
                    type="number"
                    id="FilterPriceFrom"
                    onChange={(e) => setMinPrice(e.target.value)}
                    value={minPrice}
                    placeholder="From"
                    className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </label>

                <label
                  htmlFor="FilterPriceTo"
                  className="flex items-center gap-2"
                >
                  <span className="text-sm text-gray-600">TND</span>

                  <input
                    type="number"
                    id="FilterPriceTo"
                    name="FilterPriceTo"
                    onChange={(e) => setMaxPrice(e.target.value)}
                    value={maxPrice}
                    placeholder="To"
                    className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </label>
              </div>
            </div>
          </div>
        </details>
        <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
            <span className="text-sm font-medium"> Mark </span>

            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>

          <ul className="space-y-1 border-t border-gray-200 p-4">
            {MarkList.map((mark, index) => (
              <li key={index}>
                <label
                  htmlFor="FilterInStock"
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id="FilterInStock"
                    value={mark}
                    onChange={handleMArk}
                    className="size-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium capitalize text-gray-700">
                    {mark}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}
