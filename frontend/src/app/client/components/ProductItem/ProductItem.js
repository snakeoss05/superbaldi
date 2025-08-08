"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addItem } from "@/lib/features/cart/cartReducer";
import { openQuikView } from "@/lib/features/quikView/quikViewAction";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createWishlist } from "@/utils/wishlistService";
import Link from "next/link";
import Image from "next/image";
import Price from "./Price";
import { add } from "date-fns";

export default function ProductItem({ product, progress }) {
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [addToBag, setAddToBag] = useState(false);

  const dispatch = useAppDispatch();

  if (!product) return null; // Return null to avoid rendering anything if the product is not provided

  const handleAddToCart = () => {
    dispatch(
      addItem({
        ...product,
      })
    );
    setAddToBag(true);
    toast.success("تم إضافة المنتج إلى السلة بنجاح!");

    const timer = setTimeout(() => {
      setAddToBag(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  const handleQuickView = () => {
    setLoading(true);
    try {
      dispatch(openQuikView(product._id));
      setLoading(false);
    } catch (error) {
      console.error("Error opening quick view:", error);
    }
  };

  function handleAddToWishlist() {
    if (token) {
      createWishlist(product._id, token._id).then((data) => {
        toast.success("added to wishlist successfully");
      });
    } else {
      toast.error("please login first");
    }
  }

  return (
    <div
      dir="ltr"
      className="w-full max-w-sm flex flex-col gap-4 p-4 bg-white border border-border-light colorToggler  rounded-lg hover:shadow-lg transition duration-300 ">
      <div className="flex justify-center  relative rounded overflow-hidden   card ">
        {product.discount > 0 && (
          <p className="font-semibold text-xs text-white bg-secondary px-2 py-1 rounded-lg z-10 absolute top-0 left-0  flex items-center justify-center">
            {product.discount}%
          </p>
        )}

        <svg
          className="absolute top-0 right-0 z-10 shadow m-1 sm:m-4 h-8 w-8 bg-white colorContainer  text-gray-500 rounded-full p-2 hover:bg-black hover:text-white transition duration-300 ease-in-out"
          viewBox="0 0 24 24"
          onClick={handleAddToWishlist}
          fill="currentColor"
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
              d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z"
              fill="currentColor"
            />{" "}
          </g>
        </svg>
        <svg
          className="absolute top-10 right-0 shadow z-10 m-1 sm:m-4 h-8 w-8 bg-white colorContainer  text-gray-500 rounded-full p-2 hover:bg-black hover:text-white transition duration-300 ease-in-out"
          viewBox="0 0 24 24"
          onClick={handleQuickView}
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
              d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />{" "}
            <path
              d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />{" "}
          </g>
        </svg>

        <Link
          href={`/client/pages/product/${encodeURIComponent(
            product.productName
          )}/${product._id}`}>
          <Image
            src={product.image}
            width={500}
            height={500}
            className="aspect-[1024/921] h-36 w-auto object-cover imagePrimary rounded-lg "
            alt="Product"
          />
        </Link>
      </div>

      <div className="flex flex-col h-fit justify-start p-1 gap-2 relative">
        {progress && (
          <div className="progressContainer space-y-1">
            <div className="relative w-full h-1.5 bg-gray-200 rounded-lg overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#db4444] transition-all duration-500"
                style={{ width: `${product.stock}%` }}></div>
            </div>

            <div className="flex flex-row justify-between items-center">
              <div className="hidden sm:flex flex-row items-center space-x-1">
                <span className="text-gray-400 font-semibold text-xs uppercase">
                  تم البيع:
                </span>
                <span className="font-semibold text-xs">
                  {product.stock / 2}
                </span>
              </div>
              <div className="flex flex-row items-center space-x-1">
                <span className="text-gray-400 font-semibold text-xs uppercase">
                  المتاح:
                </span>
                <span className="font-semibold text-xs">{product.stock}</span>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col mt-auto gap-1">
          <Link
            href={`/client/pages/product/${encodeURIComponent(
              product.productName
            )}/${product._id}`}
            className="text-text text-sm truncate hover:text-primary">
            {product.productName}
          </Link>
          {product.stock > 0 ? (
            <p className="font-secondary text-xs text-success font-semibold uppercase">
              متوفر في المخزون
            </p>
          ) : (
            <p className="font-secondary text-xs text-danger font-semibold uppercase">
              غير متوفر
            </p>
          )}
          <div className="flex flex-row items-center justify-between gap-2">
            <Price product={product} role={user.role} />

            <button
              onClick={handleAddToCart}
              className={`p-1.5 shadow border transition-all duretion-500 rounded text-danger hover:bg-[#db4444] hover:text-white ${
                addToBag ? "bg-green-100 text-green-800" : "bg-[#fff1ee]"
              }`}
              disabled={product.stock <= 0}>
              {addToBag ? (
                <svg
                  className="w-6 h-6"
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
              ) : (
                <svg
                  className="w-5 h-5 cursor-pointer"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
