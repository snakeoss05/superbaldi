"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NextBreadcrumb from "@/app/client/components/Breadcrumb/Breadcrumb";

export default function OrderSummary() {
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.auth.user);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const totalSaving = useAppSelector((state) => state.cart.totalSaving);
  const totalFinal = useAppSelector((state) => state.cart.totalFinal);
  const tax = useAppSelector((state) => state.cart.tax);
  const [order, setOrder] = useState({});
  const includeDeliveryFee = useAppSelector(
    (state) => state.cart.includeDeliveryFee
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function createOrder() {
    setIsSubmitting(true);
    const filterCartItems = cart.map((item) => ({
      product: item.id,
      qty: item.quantity,
      price: item.price,
    }));

    const data = {
      user: user._id,
      orderItems: filterCartItems,
      totalAmount: totalAmount,
      totalSaving: totalSaving,
      totalPrice: totalFinal,
      paymentMethod: includeDeliveryFee ? "cash on delivery" : "cash on store",
      shippingPrice: includeDeliveryFee ? 7 : 0,
      tax: tax,
    };
    try {
      const response = await axios.post(
        "http://192.168.1.3:5000/api/orders",
        data
      );
      if (response.status === 201) {
        toast.success("Thanks for your purchase, we're getting it ready!");
        setOrder(response.data.data);
        setOrderConfirmation(true);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center justify-start gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Order Summary
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
        {orderConfirmation ? (
          // Order Confirmation View
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-50 px-6 py-4 border-b border-green-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h2 className="text-xl font-semibold text-green-800">
                    Order Confirmed!
                  </h2>
                  <p className="text-sm text-green-700">
                    Your order has been successfully placed.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Order Details
                </h3>
                <p className="text-gray-600">
                  Your order{" "}
                  <span className="font-semibold">#{order.orderId}</span> will
                  be processed within 24 hours during working days. We will
                  notify you by email once your order has been shipped.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Order Information
                  </h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Order Date</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {new Date(order.createdAt).toLocaleString()}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Payment Method</dt>
                      <dd className="text-sm font-medium text-gray-900 capitalize">
                        {order.paymentMethod}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Total Amount</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {order.totalPrice?.toFixed(2)} DT
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Delivery Information
                  </h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Name</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {user?.name}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Address</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {user?.address
                          ? `${user.address.ville}, ${user.address.adresse}, ${user.address.codePostal}`
                          : "N/A"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Phone</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {user?.address?.phone || "N/A"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/client/pages/myaccount/myorder"
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  Track Your Order
                </Link>
                <Link
                  href="/"
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
          // Order Review View
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Order Items
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cart.length > 0 &&
                        cart.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-16 w-16">
                                  <Image
                                    width={64}
                                    height={64}
                                    className="h-16 w-16 rounded-md object-cover"
                                    src={item.image}
                                    alt={item.name}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {item.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="text-sm text-gray-900">
                                {item.quantity}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="text-sm text-gray-900">
                                {item.price.toFixed(2)} DT
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="text-sm font-medium text-gray-900">
                                {(item.price * item.quantity).toFixed(2)} DT
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Delivery Information
                  </h2>
                </div>
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {user?.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {user?.address?.ville}, {user?.address?.adresse},{" "}
                        {user?.address?.codePostal}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {user?.address?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Order Summary
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="text-sm font-medium text-gray-900">
                        {totalAmount.toFixed(2)} DT
                      </span>
                    </div>

                    {totalSaving > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span className="text-sm">Savings</span>
                        <span className="text-sm font-medium">
                          -{totalSaving.toFixed(2)} DT
                        </span>
                      </div>
                    )}

                    {includeDeliveryFee ? (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Delivery Fee
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          7.00 DT
                        </span>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Store Pickup
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          0.00 DT
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tax</span>
                      <span className="text-sm font-medium text-gray-900">
                        {tax} DT
                      </span>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between">
                        <span className="text-base font-semibold text-gray-900">
                          Total
                        </span>
                        <span className="text-base font-semibold text-gray-900">
                          {totalFinal.toFixed(2)} DT
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={createOrder}
                      disabled={isSubmitting}
                      className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Place Order"
                      )}
                    </button>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => router.push("/")}
                      className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                      Continue Shopping
                    </button>
                  </div>

                  <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Secure checkout
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
