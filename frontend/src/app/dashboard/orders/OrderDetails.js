import React, { useState, useEffect } from "react";
import { getOrdersProducts } from "@/utils/orderService";
import Image from "next/image";
import EditOrderItems from "./EditOrderItems";

export default function OrderDetails({ orderId, isOpen, onClose, role }) {
  const [order, setOrder] = useState(null);
  const [showEditItems, setShowEditItems] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      getOrdersProducts(orderId).then((data) => {
        setOrder(data.data);
        setLoading(false);
      });
    }
  }, [orderId]);

  const handleOrderUpdate = (updatedOrder) => {
    setOrder(updatedOrder);
    getOrdersProducts(orderId).then((data) => {
      setOrder(data.data);
      setLoading(false);
    });
  };

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
    // Add a class to the body to hide navbar and other UI elements when printing
    document.body.classList.add("printing-invoice");
    window.print();
    // Remove the class after printing
    setTimeout(() => {
      document.body.classList.remove("printing-invoice");
    }, 100);
  };

  return (
    <div
      className="fixed inset-0  flex items-center justify-center p-4  bg-black bg-opacity-50"
      style={{ zIndex: 99000 }}>
      <div className="relative max-h-[90vh]  overflow-auto rounded-lg shadow-lg w-full max-w-4xl mx-auto p-6">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
          {loading ? (
            <div className="p-6 flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : (
            <>
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order?.orderId}
                  </h3>
                  <div className="flex gap-2">
                    {role === "admin" && (
                      <button
                        onClick={() => setShowEditItems(true)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <svg
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                        Edit Items
                      </button>
                    )}
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Invoice Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-white print:border print:border-gray-200">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Invoice Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Invoice Number:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          #{order?.orderId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Date:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {new Date(order?.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Time:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {new Date(order?.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-white print:border print:border-gray-200">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Payment Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Payment Method:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white capitalize">
                          {order?.paymentMethod}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Payment Status:
                        </span>
                        <span
                          className={`font-medium ${
                            order?.isPaid
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}>
                          {order?.isPaid ? "Paid" : "Unpaid"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Order Status:
                        </span>
                        <span
                          className={`font-medium ${getStatusColor(
                            order?.status
                          )}`}>
                          {order?.status?.charAt(0).toUpperCase() +
                            order?.status?.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-white print:border print:border-gray-200">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Order Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Subtotal:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {order?.totalAmount?.toFixed(2)} DT
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Tax:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {order?.tax} DT
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Shipping:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {order?.shippingPrice} DT
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          Total:
                        </span>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {order?.totalPrice?.toFixed(2)} DT
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-white print:border print:border-gray-200 mb-6">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Order Items
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                      <thead className="bg-gray-100 dark:bg-gray-800 print:bg-white">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Stock
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Total
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
                                  {item?.image ? (
                                    <Image
                                      src={item.image}
                                      alt={
                                        item.product.productName || "Product"
                                      }
                                      width={60}
                                      height={60}
                                      className="rounded"
                                    />
                                  ) : (
                                    <div className="w-[60px] h-[60px] bg-gray-200 flex items-center justify-center rounded text-gray-500 text-sm">
                                      No Image
                                    </div>
                                  )}
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
                                {item.price} DT
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-white">
                                {item.qty}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  item.product.stock < 5
                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                }`}>
                                {item.product.stock}
                              </span>
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

                {/* Notes and Terms */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-white print:border print:border-gray-200">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Notes
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Thank you for your business! We appreciate your trust in
                      our services.
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-white print:border print:border-gray-200">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Terms & Conditions
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This is a computer-generated invoice, no signature
                      required. All sales are final.
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 print:mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p>
                    © {new Date().getFullYear()} Grocery Store. All rights
                    reserved.
                  </p>
                  <p className="mt-1">
                    This invoice was generated on{" "}
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Edit Items Modal */}
      {showEditItems && (
        <EditOrderItems
          order={order}
          onClose={() => setShowEditItems(false)}
          onUpdate={handleOrderUpdate}
        />
      )}
    </div>
  );
}
