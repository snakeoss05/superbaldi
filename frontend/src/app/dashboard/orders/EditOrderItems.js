import React, { useState, useEffect } from "react";
import { updateOrderItems } from "@/utils/orderService";
import toast from "react-hot-toast";

export default function EditOrderItems({ order, onClose, onUpdate }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setItems(
        order.orderItems.map((item) => ({
          ...item,
          originalPrice: item.price,
          originalQty: item.qty,
        }))
      );
    }
  }, [order]);

  const handleQuantityChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      qty: parseInt(value) || 0,
    };
    setItems(newItems);
  };

  const handlePriceChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      price: parseFloat(value) || 0,
    };
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedItems = items.map(({ _id, product, qty, price }) => ({
        product: product._id,
        qty,
        price,
      }));

      const response = await updateOrderItems(order._id, updatedItems);
      if (response.success) {
        toast.success("Order items updated successfully");
        onUpdate(response.data);
        onClose();
      }
    } catch (error) {
      toast.error("Failed to update order items");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteItem = (id) => {
    const newItems = [...items];
    newItems.splice(id, 1); // remove item at the specified index
    setItems(newItems);
    const updatedItems = items.map(({ _id, product, qty, price }) => ({
      product: product._id,
      qty,
      price,
    }));
    updateOrderItems(order._id, updatedItems);
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col max-h-[90vh]">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
              <div className="flex justify-between items-center pb-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Edit Order Items
                </h3>
                <button
                  type="button"
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

              <div className="mt-4 overflow-y-auto max-h-[60vh]">
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={item._id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 flex-shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.product.productName || "Product Image"}
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {item.product.productName}
                          </h4>

                          <div className="mt-3 grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Quantity
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={item.qty}
                                onChange={(e) =>
                                  handleQuantityChange(index, e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Price (DT)
                              </label>
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={item.price}
                                onChange={(e) =>
                                  handlePriceChange(index, e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteItem(item._id)}
                              className="bg-danger text-white px-4 py-2 rounded-md ">
                              Delete
                            </button>
                          </div>

                          <div className="mt-2 text-sm text-gray-500">
                            Original: {item.originalQty} x{" "}
                            {item.originalPrice.toFixed(2)} DT ={" "}
                            {(item.originalQty * item.originalPrice).toFixed(2)}{" "}
                            DT
                          </div>
                          <div className="mt-1 text-sm font-medium text-blue-600">
                            New: {item.qty} x {item.price.toFixed(2)} DT ={" "}
                            {(item.qty * item.price).toFixed(2)} DT
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t">
              <div className="flex items-center justify-between w-full">
                <div className="text-lg font-medium">
                  Total: {calculateTotal().toFixed(2)} DT
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    {loading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Updating...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
