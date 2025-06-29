"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addItem } from "@/lib/features/cart/cartReducer";
import { openQuikView } from "@/lib/features/quikView/quikViewAction";
import toast from "react-hot-toast";
import { createWishlist } from "@/utils/wishlistService";
import Price from "./Price";
import Link from "next/link";
import Image from "next/image";

export default function ProductNavbar({ product }) {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [MainImage, setMainImage] = useState(product.colors[0].images[0] || "");
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useAppDispatch();

  if (!product) return null; // Return null to avoid rendering anything if the product is not provided

  const handleAddToCart = () => {
    dispatch(
      addItem({
        ...product,
        selectedColor,
      })
    );

    toast.success(" تم إضافة المنتج إلى السلة بنجاح!");
  };

  function handleAddToWishlist() {
    if (user) {
      createWishlist(product._id, user._id).then((data) => {
        toast.success("تم إضافة المنتج إلى قائمة الرغبات بنجاح");
      });
    } else {
      toast.error("يرجى تسجيل الدخول أولاً");
    }
  }

  const handleQuickView = () => {
    setLoading(true);
    try {
      dispatch(openQuikView(product._id));
      setLoading(false);
    } catch (error) {
      console.error("Error opening quick view:", error);
    }
  };

  return (
    <div
      className="group relative h-[270px]  flex flex-col rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold text-white bg-secondary shadow-sm">
            -{product.discount}%
          </span>
        </div>
      )}

      {/* Product Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <Link
          href={`/client/pages/product/${encodeURIComponent(
            product.productName
          )}/${product._id}`}
          className="block w-full h-full">
          <div className="relative w-full h-full">
            <Image
              src={MainImage}
              alt={product.productName}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>

        {/* Action Buttons */}
        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}>
          <button
            onClick={handleAddToWishlist}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-md text-gray-600 hover:bg-secondary hover:text-white transition-colors duration-300"
            aria-label="Add to wishlist">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="1.5">
              <path
                d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z"
                fill="currentColor"
              />
            </svg>
          </button>

          <button
            onClick={handleQuickView}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-md text-gray-600 hover:bg-secondary hover:text-white transition-colors duration-300"
            aria-label="Quick view">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="1.5">
              <path
                d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Add to Cart Button */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 transition-transform duration-300 ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}>
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 bg-secondary text-white font-medium text-sm rounded-lg shadow-md hover:bg-secondary/90 transition-colors duration-300 flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4"
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
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2">
        <Link
          href={`/client/pages/product/${encodeURIComponent(product.name)}/${
            product._id
          }`}
          className="group">
          <h3 className="text-gray-800 font-medium text-sm line-clamp-2 group-hover:text-secondary transition-colors duration-200">
            {product.productName}
          </h3>
        </Link>

        <div className="mt-1">
          <Price product={product} role={user.role} />
        </div>

        {product.stock && product.stock < 10 && (
          <div className="mt-2">
            <span className="text-xs text-amber-600 font-medium">
              Only {product.stock} left in stock
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
