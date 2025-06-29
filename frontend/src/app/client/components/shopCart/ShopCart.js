// src/components/OffcanvasCart.js
"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import ProductCartRight from "./ProductCartRight";
import { useRouter } from "next/navigation";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  toggleCart,
  removeItem,
  setItemQuantity,
} from "@/lib/features/cart/cartReducer";

export default function OffcanvasCart() {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isOpen = useAppSelector((state) => state.cart.isOpen);
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalFinal = useAppSelector((state) => state.cart.totalFinal);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const totalSaving = useAppSelector((state) => state.cart.totalSaving);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  function proccedToCheckout() {
    router.push("/client/pages/cart/checkout");
    dispatch(toggleCart());
  }
  function proccedToCart() {
    router.push("/client/pages/cart");
    dispatch(toggleCart());
  }

  if (!isMounted) {
    return null;
  }
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 999999 }}>
      <div
        className={`absolute inset-y-0 left-0 max-w-full flex transform transition-all ease-in-out duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="w-screen max-w-sm pointer-events-auto flex flex-col bg-white shadow-xl">
          {/* Header */}
          <div className="p-4 flex justify-between items-center border-b border-gray-100">
            <div className="flex items-center gap-2">
              <svg
                className="w-6 h-6 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-800">
                سلة التسوق
              </h2>
            </div>
            <button
              onClick={() => dispatch(toggleCart())}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="p-4 flex flex-col gap-4 overflow-y-auto flex-1">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <ProductCartRight
                  key={item.id + index}
                  item={item}
                  decreaseItemQuantity={decreaseItemQuantity}
                  increaseItemQuantity={increaseItemQuantity}
                  removeItem={removeItem}
                  setItemQuantity={setItemQuantity}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg
                  className="w-16 h-16 text-gray-300 mb-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-gray-500 text-lg">سلة التسوق فارغة</p>
                <p className="text-gray-400 text-sm mt-1">
                  ابدأ بإضافة بعض المنتجات إلى سلة التسوق
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">المجموع الجزئي</span>
                <span className="font-medium text-gray-800">
                  {totalAmount.toFixed(2)} د.ت
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">التوفير</span>
                <span className="font-medium text-green-600">
                  -{totalSaving.toFixed(2)} د.ت
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-semibold text-lg">المجموع الكلي</span>
                <span className="font-bold text-lg text-gray-800">
                  {totalFinal.toFixed(2)} د.ت
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={proccedToCart}
                className="w-full py-3 px-4 bg-white border-2 border-gray-800 text-gray-800 font-medium rounded-lg transition-all duration-200 hover:bg-gray-800 hover:text-white">
                عرض السلة
              </button>
              <button
                onClick={proccedToCheckout}
                className="w-full py-3 px-4 bg-gray-800 text-white font-medium rounded-lg transition-all duration-200 hover:bg-gray-700">
                الدفع
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
