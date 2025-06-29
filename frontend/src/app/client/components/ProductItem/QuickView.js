import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import toast from "react-hot-toast";
import axios from "axios";
import { closeQuikView } from "@/lib/features/quikView/quikViewAction";
import { addItem } from "@/lib/features/cart/cartReducer";
import { createWishlist } from "@/utils/wishlistService";
import { useRouter } from "next/navigation";
import Price from "./Price";
import ImageDisplay from "../../pages/product/[name]/[id]/ImageDisplay";

export default function QuickView() {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const isAuth = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const cartItems = useAppSelector((state) => state.cart.items);
  const isOpen = useAppSelector((state) => state.QuickView.isOpen);
  const id = useAppSelector((state) => state.QuickView.id);
  const [quantity, setQuantity] = useState(1);
  const [addToBag, setAddToBag] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct(id) {
      setError(null);
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://superbaldi-production.up.railway.app/api/products/${id}`
        );
        setProduct(response.data.data);
        setMainImage(response.data.data.colors[0].images[0]);
        setSelectedColor(response.data.data.colors[0]);
        // Check if product is in wishlist
        if (isAuth && user) {
          // This would need to be implemented with your actual wishlist API
          // For now, we'll just set a random state
          setIsWishlisted(Math.random() > 0.5);
        }
      } catch (error) {
        setError("Product not found or an error occurred.");
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchProduct(id);
    }
  }, [id, isAuth, user]);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  useEffect(() => {
    if (product) {
      const item = cartItems.find((item) => item.id === product._id);
      setQuantity(item ? item.quantity : 1);
    }
  }, [product, cartItems]);

  function handleAddToWishlist() {
    if (isAuth) {
      createWishlist(product._id, user._id).then(() => {
        setIsWishlisted(!isWishlisted);
        toast.success(
          isWishlisted
            ? "Removed from wishlist"
            : "Added to wishlist successfully"
        );
      });
    } else {
      toast.error("Please login first");
    }
  }
  const handleChangeColor = (color) => {
    setSelectedColor(color);
    setMainImage(color.images[0]);
  };
  const handleAddToBag = () => {
    dispatch(
      addItem({
        ...product,
        selectedColor,
        quantity,
      })
    );

    setAddToBag(true);
    toast.success("تم إضافة المنتج إلى السلة بنجاح!");

    const timer = setTimeout(() => {
      setAddToBag(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  function handleAddToCart() {
    const discount = product.discount || 0;
    const price =
      user && user.role && product.prices[user.role] !== undefined
        ? product.prices[user.role]
        : product.prices.detaillant || 0;

    dispatch(
      addItem({
        ...product,
        price: Number(price),
        discount,
        quantity,
      })
    );

    toast.success("تم إضافة المنتج إلى السلة بنجاح!");
    router.push("/client/pages/cart");
    dispatch(closeQuikView());
  }

  function calculateDiscount(price, discount) {
    const priceAfterDiscount = price - (price * discount) / 100;
    return priceAfterDiscount.toFixed(2);
  }

  // Handle keyboard events for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        dispatch(closeQuikView());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  if (error) {
    return (
      <div
        id="modal"
        dir="ltr"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md mx-4">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-xl font-bold text-gray-800 mb-2">{error}</p>
          <p className="text-gray-600 mb-6">
            Please try again later or contact support if the problem persists.
          </p>
          <button
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition duration-300"
            onClick={() => dispatch(closeQuikView())}>
            Close
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div
      dir="ltr"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      style={{ zIndex: 1000 }}
      aria-labelledby="quick-view-title">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto sm:overflow-hidden relative mx-4"
        onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={() => dispatch(closeQuikView())}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300"
          aria-label="Close quick view">
          <svg
            className="w-6 h-6 text-gray-700"
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

        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Left column - Image gallery */}

          {selectedColor?.images && selectedColor.images.length > 0 ? (
            <div className="flex flex-col justify-center items-center sm:items-center gap-4  overflow-y-auto  no-scrollbar">
              <ImageDisplay
                selectedColor={selectedColor}
                mainImage={mainImage}
                setMainImage={setMainImage}
                product={product}
              />
            </div>
          ) : (
            <p>No image available for selected color.</p>
          )}

          {/* Right column - Product details */}
          <div className="p-6 md:p-8 overflow-y-hidden max-h-[90vh]">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {product.category?.name || "Category"}
                </span>
                <button
                  onClick={handleAddToWishlist}
                  className={`p-2  rounded-full me-8 transition duration-300 ${
                    isWishlisted
                      ? "bg-red-100 text-red-500"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                  aria-label={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }>
                  <svg
                    className="w-5 h-5"
                    fill={isWishlisted ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              <h2
                id="quick-view-title"
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.productName}
              </h2>

              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4 ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">(3 reviews)</span>
              </div>

              <div className="mb-4">
                <Price product={product} role={user?.role} />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed h-24 overflow-y-auto">
                {product.description ||
                  "No description available for this product."}
              </p>
            </div>
            <hr className="my-4" />
            <h3 className="text-lg font-semibold">
              Color: {selectedColor.colorName}
            </h3>
            <div className="flex gap-2">
              {product.colors.length > 0 &&
                product.colors.map((color, index) => (
                  <button
                    key={color._id}
                    style={{ backgroundColor: color.colorName }}
                    onClick={() => handleChangeColor(color)}
                    className={`h-10 w-10 border rounded-full  ${
                      selectedColor.colorName === color.colorName &&
                      "border-2 border-gray-500"
                    }`}></button>
                ))}
            </div>
            <div className="my-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Product Details
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex">
                  <span className="font-medium w-24">Brand:</span>
                  <span className="uppercase">
                    {product.brandName || "Not specified"}
                  </span>
                </li>
                <li className="flex">
                  <span className="font-medium w-24">SKU:</span>
                  <span className="">{product.sku || "Not specified"}</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-24">Availability:</span>
                  <span
                    className={
                      product.stock > 0 ? "text-green-600" : "text-red-600"
                    }>
                    {product.stock > 0 ? `in stock` : "Out of stock"}
                  </span>
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-300"
                    onClick={handleDecreaseQuantity}
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}>
                    <svg
                      className="w-5 h-5"
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
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-300"
                    onClick={handleIncreaseQuantity}
                    aria-label="Increase quantity">
                    <svg
                      className="w-5 h-5"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition duration-300 flex items-center justify-center ${
                    addToBag
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                  onClick={handleAddToBag}
                  disabled={product.stock <= 0}>
                  {addToBag ? (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      تمت الإضافة إلى السلة
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      أضف إلى السلة
                    </>
                  )}
                </button>

                <button
                  className="w-full py-3 px-4 rounded-lg font-medium text-sm bg-amber-500 text-white hover:bg-amber-600 transition duration-300 flex items-center justify-center"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  اشتري الآن
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
                  Secure checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop click to close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={() => dispatch(closeQuikView())}
        aria-hidden="true"></div>
    </div>
  );
}
