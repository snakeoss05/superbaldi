import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function ProductCartRight({
  item,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItem,
  setItemQuantity,
}) {
  const dispatch = useDispatch();
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      dispatch(setItemQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  return (
    <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200">
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="object-cover rounded-lg"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-800 truncate mb-1">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          {item.quantity} * {item.price} د.ت
        </p>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => dispatch(decreaseItemQuantity(item.id))}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 12H4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <input
              type="number"
              className="w-12 text-center text-sm bg-transparent focus:outline-none"
              min="1"
              value={item.quantity}
              onChange={handleQuantityChange}
            />
            <button
              onClick={() => dispatch(increaseItemQuantity(item.id))}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 4v16m8-8H4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <button
            onClick={() => dispatch(removeItem(item.id))}
            className="text-red-500 hover:text-red-600 transition-colors p-1">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
