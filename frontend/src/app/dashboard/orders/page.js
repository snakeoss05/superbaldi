"use client";
import React, { useState, useEffect, useRef, use } from "react";
import {
  getOrders,
  updateOrderStatus,
  DeleteOrder,
  getOrdersByOderId,
  generateInvoice,
} from "@/utils/orderService";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import StatusSelect from "./StatusBade";
import Pagination from "@/app/client/components/Pagination/Pagination";
import toast from "react-hot-toast";
import OrderDetails from "./OrderDetails";
import CustomerProfile from "./CustomerProfile";

export default function MyOrder() {
  const isAuth = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [OrderIdInput, setOrderIdInput] = useState("");
  const [status, setStatus] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [defaultValueOrder, setdefaultValueOrder] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => {
    if (isAuth) {
      getOrders(page, orderDate, status).then((data) => {
        setLoading(false);
        setOrders(data.data);
        setTotalPages(data.totalPages);
      });
    }
  }, [isAuth, page, orderDate, status]);
  const handlePrint = (type, order) => {
    if (!type) return;
    const response = axios.post(
      `http://localhost:5000/api/invoice/generate-invoice`,
      {
        order,
      }
    );
    router.push(`/dashboard/invoice/${order.orderId}`);
  };
  function handleStatusChange(orderId, status) {
    updateOrderStatus(orderId, status);
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order._id === orderId) {
          return { ...order, status };
        }
        return order;
      })
    );
    toast.success("Order status updated");
  }
  function handlePaymentStatusChange(orderId, status, paymentStatus) {
    updateOrderStatus(orderId, status, paymentStatus);
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order._id === orderId) {
          return { ...order, isPaid: paymentStatus };
        }
        return order;
      })
    );
    toast.success("Order payment status updated");
  }
  function handleDelete(orderId) {
    DeleteOrder(orderId).then((data) => {
      if (data) {
        getOrders(page, orderDate, status).then((data) => {
          setLoading(false);
          setOrders(data.data);
          setTotalPages(data.totalPages);
        });
        toast.success("Order deleted");
      }
    });
  }
  function handleOrderSearch() {
    getOrdersByOderId(OrderIdInput).then((data) => {
      setLoading(false);
      setOrders(data.data);
    });
  }
  function handleCustomerSearch(id) {
    setSelectedCustomerId(id);
    setIsCustomerModalOpen(true);
  }
  function openModal(order) {
    setdefaultValueOrder(order);
    setIsModalOpen(true);
  }

  return (
    <section
      className="bg-white py-4 sm:py-8 antialiased dark:bg-gray-900 "
      dir="ltr">
      <div className="me-auto w-full max-w-screen-xl p-2 sm:px-4 ">
        <div className="mx-auto max-w-7xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl mb-4 font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Orders List
            </h2>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <label htmlFor="Search" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  id="Search"
                  value={OrderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  placeholder="Search By Order Id"
                  className="w-full rounded-md border-gray-200 bg-gray-100 py-1.5 sm:py-2.5 pe-10 ps-4 text-xs shadow-sm sm:text-sm focus-visible:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <span className="absolute bg-primary rounded-r-lg inset-y-0 end-0 grid w-10 place-content-center">
                  <button id="search" type="button" onClick={handleOrderSearch}>
                    <span className="sr-only">Search</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 text-white">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </button>
                </span>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-xs sm:text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filters
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="order-type"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Order Status
                  </label>
                  <select
                    id="order-type"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="block w-full rounded-lg border capitalize border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                    <option value="">All orders</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="declined">Declined</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="returned">Returned</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time Period
                  </label>
                  <select
                    id="duration"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                    <option value="">All time</option>
                    <option value="today">Today</option>
                    <option value="this_week">This week</option>
                    <option value="this_month">This month</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setStatus("");
                      setOrderDate("");
                      setOrderIdInput("");
                      getOrders(page, "", "").then((data) => {
                        setLoading(false);
                        setOrders(data.data);
                        setTotalPages(data.totalPages);
                      });
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading && (
                <div className="flex space-x-2 justify-center items-center bg-white py-16 sm:py-64 dark:invert">
                  <span className="sr-only">Loading...</span>
                  <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
                </div>
              )}

              <div className="overflow-x-auto mb-16">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Details
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders?.length > 0 &&
                      orders.map((order) => (
                        <tr
                          key={order._id}
                          className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-900">
                                #{order.orderId}
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleString()}
                              </span>
                              <div className="mt-1">
                                <span className="text-sm font-medium text-gray-900">
                                  {order.totalPrice} DT
                                </span>
                                <span className="text-xs text-gray-500 ml-2">
                                  ({order.orderItems?.length} items)
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-col">
                              <button
                                onClick={() =>
                                  handleCustomerSearch(order.user._id)
                                }
                                className="text-sm font-medium text-primary hover:text-primary-600 hover:underline text-left">
                                {order.user?.name || order.fullname}
                              </button>
                              <span className="text-xs text-gray-500">
                                {order.user?.email}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-900 capitalize">
                                {order.paymentMethod}
                              </span>
                              <select
                                value={order.isPaid ? "paid" : "unpaid"}
                                onChange={(e) =>
                                  handlePaymentStatusChange(
                                    order._id,
                                    order.status,
                                    e.target.value
                                  )
                                }
                                className={`text-xs mt-1 rounded-md px-2 py-1 ${
                                  order.isPaid
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}>
                                <option value="false" className="text-red-600">
                                  Unpaid
                                </option>
                                <option value="paid" className="text-green-600">
                                  Paid
                                </option>
                              </select>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div className="w-40">
                              <StatusSelect
                                initialStatus="processing"
                                status={order.status}
                                handleStatusChange={handleStatusChange}
                                orderId={order._id}
                              />
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => openModal(order._id)}
                                className="text-primary hover:text-primary-600 transition-colors"
                                title="View Details">
                                <svg
                                  className="w-5 h-5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(order._id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                                title="Delete Order">
                                <svg
                                  className="w-5 h-5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </button>
                              <div className="relative">
                                <button
                                  onClick={() => {
                                    setSelectedType("invoice");
                                    handlePrint("invoice", order);
                                  }}
                                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                                    />
                                  </svg>
                                  Print Invoice
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {orders?.length === 0 && (
                  <div className="w-full min-h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No orders found
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Get started by creating a new order.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <OrderDetails
            orderId={defaultValueOrder}
            isOpen={isModalOpen}
            role={user.role}
            onClose={() => setIsModalOpen(false)}
          />
          <CustomerProfile
            id={selectedCustomerId}
            isOpen={isCustomerModalOpen}
            onClose={() => setIsCustomerModalOpen(false)}
          />

          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </div>
    </section>
  );
}
