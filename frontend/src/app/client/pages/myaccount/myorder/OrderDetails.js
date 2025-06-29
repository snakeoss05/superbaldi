import React, { useState, useEffect } from "react";
import { getOrdersProducts } from "@/utils/orderService";
import Image from "next/image";
import Price from "@/app/client/components/ProductItem/Price";
import StatusBadge from "./Status";

export default function OrderDetails({ orderId, isOpen, onClose, role }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      getOrdersProducts(orderId).then((data) => {
        setOrder(data.data);
        setLoading(false);
      });
    }
  }, [orderId]);

  if (!isOpen) return null;

  const getStatusColor = (status) => {
    const colors = {
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      confirmed:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      declined: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      processing:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      shipped:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      delivered:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      returned:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      refunded: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    };
    return (
      colors[status] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-black bg-opacity-50"
      style={{ zIndex: 100 }}>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl h-[90vh] w-full max-w-4xl mx-auto overflow-auto print:shadow-none print:max-w-none">
        <div className="absolute top-4 right-4 z-10 print:hidden">
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="p-6 print:p-0">
            {/* رأس الفاتورة */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 print:mb-4 border-b border-gray-200 dark:border-gray-700 pb-6">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  فاتورة
                </h1>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p className="font-semibold">متجر البقالة</p>
                  <p>123 شارع الأعمال، المدينة، الدولة</p>
                  <p>
                    الهاتف: +1234567890 | البريد الإلكتروني: contact@grocery.com
                  </p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p className="font-semibold">فاتورة إلى:</p>
                  <p>{order?.user?.name}</p>
                  <p>{order?.user?.email}</p>
                </div>
              </div>
            </div>

            {/* تفاصيل الفاتورة */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-white print:border print:border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                  تفاصيل الفاتورة
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      رقم الفاتورة:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      #{order?.orderId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      التاريخ:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Date(order?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      الوقت:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Date(order?.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-white print:border print:border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                  تفاصيل الدفع
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      طريقة الدفع:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white capitalize">
                      {order?.paymentMethod === "cash on store"
                        ? "كاش"
                        : "بطاقة"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      حالة الدفع:
                    </span>
                    <span
                      className={`font-medium ${
                        order?.isPaid
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}>
                      {order?.isPaid ? "مدفوع" : "غير مدفوع"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      حالة الطلب:
                    </span>
                    <StatusBadge status={order?.status} />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-white print:border print:border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                  ملخص الطلب
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      الإجمالي الفرعي:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {order?.totalAmount?.toFixed(2)} DT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      الضريبة:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {order?.tax} DT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      الشحن:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {order?.shippingPrice} DT
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      الإجمالي:
                    </span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {order?.totalPrice?.toFixed(2)} DT
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* عناصر الطلب */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-white print:border print:border-gray-200 mb-6">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                عناصر الطلب
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className="bg-gray-100 dark:bg-gray-800 print:bg-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        المنتج
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        السعر
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        الكمية
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        الإجمالي
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600 print:bg-white">
                    {order?.orderItems.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-600 print:hover:bg-white">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-12 w-12 flex-shrink-0 rounded-md overflow-hidden print:h-10 print:w-10">
                              <Image
                                src={item.image}
                                alt={item.product.productName}
                                className="h-12 w-12 object-cover print:h-10 print:w-10"
                                width={48}
                                height={48}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {item.product.productName}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {item.product.category?.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            <Price product={item.product} role={role} />
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {item.qty}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {(item.price * item.qty).toFixed(2)} DT
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ملاحظات وشروط */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-white print:border print:border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                  ملاحظات
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  شكرًا لتعاملكم معنا! نحن نُقدّر ثقتكم في خدماتنا.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-white print:border print:border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                  الشروط والأحكام
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  هذه الفاتورة مُولدة عبر الحاسوب، ولا تتطلب توقيعًا. جميع
                  المبيعات نهائية.
                </p>
              </div>
            </div>

            {/* التذييل */}
            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 print:mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <p>
                © {new Date().getFullYear()} متجر البقالة. جميع الحقوق محفوظة.
              </p>
              <p className="mt-1">تم إنشاء هذه الفاتورة في...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
