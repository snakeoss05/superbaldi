"use client";
import React, { useState, useEffect } from "react";
import { getOrdersById, updateOrderStatus } from "@/utils/orderService";
import { useAppSelector } from "@/lib/hooks";
import StatusBadge from "./Status";
import Pagination from "@/app/client/components/Pagination/Pagination";
import toast from "react-hot-toast";
import OrderDetails from "./OrderDetails";
import { useRouter } from "next/navigation";

export default function MyOrder() {
  const user = useAppSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [defaultValueOrder, setdefaultValueOrder] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getOrdersById(user._id, page).then((data) => {
        setOrders(data.data);
        setTotalPages(data.totalPages);
        setLoading(false);
      });
    }
  }, [user, page]);

  function handleStatusChange(orderId, status) {
    updateOrderStatus(orderId, status).then((data) => {
      if (data) {
        getOrdersById(user._id, page).then((data) => {
          setOrders(data.data);
          setTotalPages(data.totalPages);
          setLoading(false);
        });
        toast.success("Order status updated");
      }
    });
  }

  function openModal(order) {
    setdefaultValueOrder(order);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setdefaultValueOrder(null);
  }

  const filteredOrders = filterStatus
    ? orders.filter((order) => order.status === filterStatus)
    : orders;

  const handlePrint = (type, orderId) => {
    if (!type) return;
    router.push(`/dashboard/invoice/${orderId}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            طلباتي
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            تتبع وإدارة سجل طلباتك
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative">
            <label
              htmlFor="order-filter"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              تصفية حسب الحالة
            </label>
            <select
              id="order-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-white">
              <option value="">جميع الطلبات</option>
              <option value="pending">قيد الانتظار</option>
              <option value="confirmed">تم التأكيد</option>
              <option value="processing">قيد المعالجة</option>
              <option value="shipped">تم الشحن</option>
              <option value="delivered">تم التوصيل</option>
              <option value="cancelled">ملغى</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {filteredOrders && filteredOrders.length > 0 ? (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              طلب رقم #{order.orderId}
                            </span>
                            <StatusBadge status={order.status} />
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString()} في{" "}
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              الإجمالي
                            </p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                              {order.totalPrice.toFixed(2)} د.ت
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => openModal(order._id)}
                              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              عرض التفاصيل
                            </button>

                            {order.status === "pending" && (
                              <button
                                onClick={() =>
                                  handleStatusChange(order._id, "cancelled")
                                }
                                className="inline-flex items-center px-3 py-2 border border-red-300 dark:border-red-600 shadow-sm text-sm font-medium rounded-md text-red-700 dark:text-red-300 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                                إلغاء
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400 mx-auto mb-4"
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
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  لا توجد طلبات
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {filterStatus
                    ? `لا توجد طلبات بحالة ${filterStatus}.`
                    : "لم تقم بوضع أي طلبات بعد."}
                </p>
              </div>
            )}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        )}
      </div>

      <OrderDetails
        orderId={defaultValueOrder}
        isOpen={isModalOpen}
        role={user.role}
        onClose={closeModal}
      />
    </div>
  );
}
