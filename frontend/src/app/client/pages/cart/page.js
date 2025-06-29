"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import ProductCart from "../../components/ProductCart/ProductCart";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItem,
  setItemQuantity,
} from "@/lib/features/cart/cartReducer";
import NextBreadcrumb from "../../components/Breadcrumb/Breadcrumb";

export default function Cart() {
  const [isMounted, setIsMounted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Set isMounted to true after component mounts to ensure client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);
  const cart = useAppSelector((state) => state.cart.items);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const totalSaving = useAppSelector((state) => state.cart.totalSaving);
  const totalFinal = useAppSelector((state) => state.cart.totalFinal);
  const dispatch = useAppDispatch();

  function proccedToCheckout() {
    if (!token) {
      toast.error("Please login first");
      router.push("/client/pages/signin");
      return;
    }
    if (cart.length > 0) {
      router.push("/client/pages/cart/checkout");
    } else {
      toast.error("Cart is empty");
    }
  }

  const handleQuantityChange = async (id, newQuantity) => {
    setIsUpdating(true);
    try {
      dispatch(setItemQuantity({ id, quantity: newQuantity }));
      toast.success("Cart updated");
    } catch (error) {
      toast.error("Failed to update cart");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async (id) => {
    setIsUpdating(true);
    try {
      dispatch(removeItem(id));
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isMounted) {
    // Return null or loading indicator to prevent mismatch
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Shopping Cart
            </h1>
            <NextBreadcrumb
              homeElement={"Home"}
              showtheLastElement={true}
              separator={
                <svg
                  fill="currentColor"
                  height="18px"
                  className="my-auto text-gray-500"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  stroke="currentColor">
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    <path d="M15.5,11.3L9.9,5.6c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l4.9,4.9l-4.9,4.9c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.6,0.4,1,1,1c0.3,0,0.5-0.1,0.7-0.3l5.7-5.7c0,0,0,0,0,0C15.9,12.3,15.9,11.7,15.5,11.3z" />
                  </g>
                </svg>
              }
              activeClasses="text-amber-500"
              containerClasses="flex flex-row flex-wrap p-4 rounded-lg"
              listClasses="hover:underline mx-2 font-normal text-sm"
              capitalizeLinks
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6">
              <svg
                className="w-24 h-24 mx-auto text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              href="/client/pages/shop"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* عناصر السلة */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    عناصر السلة ({cart.length})
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          المنتج
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          السعر
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الكمية
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          المجموع الفرعي
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          إجراء
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cart.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-16 w-16">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={64}
                                  height={64}
                                  className="h-16 w-16 rounded-md object-cover"
                                />
                              </div>
                              <div className="mx-4">
                                <div className="text-sm font-medium truncate w-24  text-gray-900">
                                  {item.name}
                                </div>
                                {item.discount > 0 && (
                                  <div className="text-xs text-red-500">
                                    خصم {item.discount}%
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {item.price.toFixed(2)} د.ت
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center">
                              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                <button
                                  onClick={() =>
                                    dispatch(decreaseItemQuantity(item.id))
                                  }
                                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-300"
                                  disabled={isUpdating}>
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 12H4"
                                    />
                                  </svg>
                                </button>
                                <input
                                  type="number"
                                  className="w-12 text-center text-sm focus:outline-none"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const newValue = parseInt(
                                      e.target.value,
                                      10
                                    );
                                    if (newValue >= 1) {
                                      handleQuantityChange(item.id, newValue);
                                    }
                                  }}
                                  disabled={isUpdating}
                                />
                                <button
                                  onClick={() =>
                                    dispatch(increaseItemQuantity(item.id))
                                  }
                                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-300"
                                  disabled={isUpdating}>
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 4v16m8-8H4"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm font-medium text-gray-900">
                              {(item.price * item.quantity).toFixed(2)} د.ت
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-600 hover:text-red-900 transition duration-300"
                              disabled={isUpdating}>
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* رابط متابعة التسوق */}
              <div className="mt-6">
                <Link
                  href="/client/pages/shop"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  متابعة التسوق
                </Link>
              </div>
            </div>

            {/* ملخص الطلب */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-8">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    ملخص الطلب
                  </h2>
                </div>
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        المجموع الفرعي
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {totalAmount.toFixed(2)} د.ت
                      </span>
                    </div>

                    {totalSaving > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">التوفير</span>
                        <span className="text-sm font-medium text-green-600">
                          -{totalSaving.toFixed(2)} د.ت
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        ضريبة القيمة المضافة
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        1.00 د.ت
                      </span>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between">
                        <span className="text-base font-medium text-gray-900">
                          الإجمالي
                        </span>
                        <span className="text-base font-medium text-gray-900">
                          {totalFinal.toFixed(2)} د.ت
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={proccedToCheckout}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300">
                      المتابعة إلى الدفع
                    </button>
                  </div>

                  <div className="mt-4 text-center text-xs text-gray-500">
                    <p className="flex items-center justify-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      دفع آمن
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
