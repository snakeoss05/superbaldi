"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleCart } from "@/lib/features/cart/cartReducer";
export default function CartButton() {
  const totalitems = useAppSelector((state) => state.cart.totalQuantity);
  const [isMounted, setIsMounted] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <button
      type="button"
      onClick={() => dispatch(toggleCart())}
      className="text-black flex items-center hover:text-blue-500 h-10 w-10 bg-[#fff1ee] p-2 relative rounded-full">
      <svg
        className="h-6 w-6 text-warning-dark hover:text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
      {isMounted && (
        <p className="absolute -top-0  -right-2 h-4 w-4 bg-warning-dark text-white text-xs font-semibold text-center rounded-full">
          {totalitems}
        </p>
      )}
    </button>
  );
}
