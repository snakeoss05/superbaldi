"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  addItem,
  clearCart,
  setCart,
  decreaseItemQuantity,
  increaseItemQuantity,
} from "@/lib/features/cart/cartReducer";
import { createOrder } from "@/utils/orderService";
import axios from "axios";
import toast from "react-hot-toast";

export default function PlaceOrder() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const token = useAppSelector((state) => state.auth.token);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      if (name.length > 2) {
        setIsLoading(true);
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: "8",
          search: name,
        });

        try {
          const res = await axios.get(
            `http://192.168.1.3:5000/api/users?${queryParams.toString()}`,
            {
              withCredentials: true,
            }
          );
          setIsLoading(false);
          setUsers(res.data.results);
          setTotalPages(res.data.totalPages);
        } catch (error) {
          console.error("Error fetching users:", error);
          toast.error("Failed to fetch users");
        }
      }
    };

    fetchUsers();
  }, [name]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      if (searchTerm.length > 2) {
        setLoading(true);
        try {
          const res = await axios.get(
            `http://192.168.1.3:5000/api/products/search?name=${searchTerm}`
          );
          setFilteredProducts(res.data.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    };
    fetchProducts();
  }, [searchTerm]);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    dispatch(
      addItem({
        ...product,
        price: product.prices.detaillant || 0,
        discount: product.discount || 0,
      })
    );
    toast.success("Added to cart");
  };

  // Handle placing order
  const handlePlaceOrder = async () => {
    if (!selectedUser) {
      toast.error("Please select a user");
      return;
    }

    if (cart.items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setIsLoading(true);
    const filterCartItems = cart.items.map((item) => ({
      product: item.id,
      qty: item.quantity,
      price: item.price,
    }));

    try {
      const orderData = {
        user: selectedUser._id,
        orderItems: filterCartItems,
        totalAmount: cart.totalAmount,
        totalSaving: cart.totalSaving,
        includeDeliveryFee: cart.includeDeliveryFee,
        tax: cart.tax,
        deliveryFee: cart.deliveryFee,
        paymentMethod: "cash",
        totalFinal: cart.totalFinal,
        notes: orderNotes,
        status: "pending",
      };

      const response = await createOrder(orderData);

      if (response) {
        toast.success("Order placed successfully");
        dispatch(clearCart());
        setSelectedUser("");
        setOrderNotes("");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto" dir="ltr">
      <h1 className="text-2xl font-bold mb-6">Place Order on Behalf of User</h1>

      {/* User Selection */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold mb-3">Select User</h2>
          <div className="flex gap-2 items-center">
            <p className="text-sm text-gray-500">
              current user: {selectedUser ? selectedUser.email : "None"}
            </p>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            id="Search"
            onChange={(e) => setName(e.target.value)}
            placeholder="Search for a user..."
            className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {users?.map((user) => (
          <div
            key={user._id}
            value={user._id}
            className="cursor-pointer mt-2 flex flex-row gap-4 items-center  hover:bg-gray-100 p-2 rounded-md"
            onClick={(e) => {
              setSelectedUser(user);
              setUsers([]);
            }}>
            <p className="text-sm font-medium">
              {user.name} ({user.email})
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Search and Selection */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Add Products</h2>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative border border-gray-300 rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2  focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="button"
                className="bg-form-background absolute right-0 top-0 text-gray-100  w-16 h-full font-semibold text-sm py-3 rounded-r-lg uppercase hidden sm:flex items-center justify-center">
                {loading ? (
                  <svg
                    className="w-5 h-5 animate-spin text-black"
                    viewBox="0 -0.5 1001 1001"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffff">
                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      <path d="M497.571 0c-113.684 .267 -227.301 38.887 -319.725 115.892l.188 .188c172.901 -140.335 427.481 -130.06 588.398 30.857 133.878 133.876 163.485 332.604 88.85 495.173 -10.186 29.288 -5.523 50.219 11.974 67.716 20.709 20.709 60.696 23.151 83.847 0 2.643 -2.643 12.187 -14.411 14.694 -24.041 70.849 -180.224 33.479 -393.197 -112.171 -538.846 -98.281 -98.282 -227.211 -147.238 -356.052 -146.935zm-408.137 273.706c-14.532 .36 -29.101 5.592 -39.954 16.445 -2.643 2.644 -12.187 14.41 -14.694 24.041 -70.849 180.223 -33.479 393.197 112.171 538.846 185.003 185.003 478.607 195.322 675.778 31.044l-.188 -.188c-172.901 140.336 -427.481 130.06 -588.398 -30.857 -133.876 -133.878 -163.485 -332.603 -88.85 -495.173 10.186 -29.287 5.523 -50.219 -11.974 -67.716 -11.002 -11.002 -27.423 -16.852 -43.893 -16.445z" />
                    </g>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                        stroke="#000000"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                    </g>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Product List */}
          <div className="max-h-[500px] overflow-y-auto">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="border border-gray-200 rounded-lg p-3 flex flex-col">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 relative rounded-md overflow-hidden">
                        <img
                          src={product.colors[0].images[0]}
                          alt={product.productName}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">
                          {product.productName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {product.prices.detaillant || 0}
                          {product.discount > 0 && (
                            <span className="ml-2 text-red-500">
                              -{product.discount}%
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">
                          Stock: {product.stock}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-2 bg-primary text-white py-1 px-3 rounded-md text-sm hover:bg-primary transition-colors">
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">
                No products found
              </p>
            )}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Cart Summary</h2>

          {cart.items.length > 0 ? (
            <>
              <div className="max-h-[300px] overflow-y-auto mb-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-2 border-b">
                    <div className="w-12 h-12 relative rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.price} TND x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dispatch(decreaseItemQuantity(item.id))}
                        className="text-gray hover:text-primary">
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseItemQuantity(item.id))}
                        className="text-gray hover:text-primary">
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{cart.totalAmount.toFixed(2)} TND</span>
                </div>
                {cart.totalSaving > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings:</span>
                    <span>{cart.totalSaving.toFixed(2)} TND</span>
                  </div>
                )}
                {cart.includeDeliveryFee && (
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span>7.00 TND</span>
                  </div>
                )}
                {cart.tax > 0 && (
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>{cart.tax.toFixed(2)} TND</span>
                  </div>
                )}
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>{cart.totalFinal.toFixed(2)} TND</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Notes
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows="3"
                  placeholder="Add any notes for this order..."></textarea>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isLoading || !selectedUser || cart.items.length === 0}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
                {isLoading ? "Placing Order..." : "Place Order"}
              </button>
            </>
          ) : (
            <p className="text-center text-gray-500 py-4">Cart is empty</p>
          )}
        </div>
      </div>
    </div>
  );
}
