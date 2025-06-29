"use client";

import React, { useState, useEffect } from "react";

import axios from "axios";
import ProductSkeleton from "../../ProductItem/ProductSkeleton";
import Carousel from "../Carousel/Carousel";
import { useAppSelector } from "@/lib/hooks";
import Price from "../../ProductItem/Price";
import Link from "next/link";
import Countdown from "./Countdown";
export default function BestSales() {
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [discount, setDiscounts] = useState(false);
  const [sortField, setSortField] = useState(""); // New state for sorting
  const [sortOrder, setSortOrder] = useState("");
  const [product, setProduct] = useState([]);
  const [isActive, setIsActive] = useState(2);
  function getMostDiscountedProducts(products) {
    if (products.length < 2) return products; // If less than 2 products, return what exists

    return products
      .map((product) => ({
        ...product,
        discountPercentage:
          ((product.price - product.sellingPrice) / product.price) * 100,
      }))
      .sort((a, b) => b.discountPercentage - a.discountPercentage) // Sort by discount percentage (descending)
      .slice(0, 2); // Get the top two discounted products
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://192.168.1.3:5000/api/products?page=${page}&limit=8&discount=${discount}&sortField=${sortField}&sortOrder=${sortOrder}`
        );
        setProducts(res.data.data);
        setTotalPages(res.data.totalPages);
        const discountedproduct = getMostDiscountedProducts(res.data.data);
        setProduct(discountedproduct);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [page, discount, sortField, sortOrder]);

  function calculateDiscount(price, sellingPrice) {
    const discount = ((price - sellingPrice) / price) * 100;
    return discount.toFixed(2); // Returns a string with two decimal places
  }
  return (
    <div className="mx-auto py-16  space-y-16 max-w-screen-xl ">
      <div className="flex flex-row justify-between items-center ">
        <div>
          <p className="text-lg sm:text-xl uppercase font-semibold font-secondary text-text">
            أفضل المبيعات
          </p>
          <p className="text-xs text-info-dark">
            لا تفوّت العروض الحالية حتى نهاية الشهر.
          </p>
        </div>
        <button className="flex flex-row gap-2 items-center border border-info px-4 py-2 rounded-full transition-all duration-300 text-info-dark hover:bg-info-light hover:text-black">
          <p className="text-xs">عرض الكل</p>
          <svg
            className="w-4 h-4 "
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
                d="M4 12H20M4 12L8 8M4 12L8 16"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
            </g>
          </svg>
        </button>
      </div>
      <div>
        {products.length > 0 && (
          <Carousel products={products} showProgress={false} />
        )}
        <div className="grid grid-cols-1  lg:grid-cols-5 gap-4 overflow-hidden ">
          {products.length === 0 &&
            Array.from({ length: 5 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
        </div>
      </div>
      <div className="space-y-8">
        <div className="flex flex-row justify-between items-center ">
          <div>
            <p className="text-lg sm:text-xl uppercase font-semibold font-secondary text-text">
              المنتج المميز لهذا الأسبوع
            </p>
            <p className="text-xs text-info-dark">
              لا تفوّت هذه الفرصة للاستفادة من خصم خاص لهذا الأسبوع فقط.
            </p>
          </div>
          <button className="flex flex-row gap-2 items-center border border-info px-4 py-2 rounded-full transition-all duration-300 text-info-dark hover:bg-info-light hover:text-black">
            <p className="text-xs">عرض الكل</p>

            <svg
              className="w-4 h-4"
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
                  d="M4 12H20M4 12L8 8M4 12L8 16"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
              </g>
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2   gap-4">
          {product.length > 0 &&
            product.map((product) => (
              <div
                key={product._id}
                className="flex flex-col sm:flex-row gap-4 items-center p-4 border border-danger rounded-lg">
                <div className="relative">
                  <Link
                    href={`/client/pages/product/${product.productName}/${product._id}`}>
                    <img
                      src={product.colors[0].images[0]}
                      className="object-contain hover:scale-105 ease-in duration-300 rounded-lg  aspect-auto w-auto h-64"
                      alt="product-image"
                    />
                  </Link>
                  <p className="font-semibold h-16 w-16  text-sm text-white bg-danger rounded-full z-10 absolute top-8 left-4  flex items-center justify-center">
                    {product.discount}%
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <Price product={product} role={user.role} />
                  <p className="text-md text-text ">{product.productName}</p>
                  {product.stock > 0 ? (
                    <p className="text-xs font-secondary font-semibold text-success  uppercase">
                      in stock
                    </p>
                  ) : (
                    <p className="text-xs font-secondary font-semibold text-danger  uppercase">
                      out of stock
                    </p>
                  )}
                  <span className="w-full h-1 bg-[linear-gradient(90deg,#d51243,#ff6048,#ffcd00)] rounded-full"></span>
                  <div>
                    <Countdown targetDate={"2025-12-31"} />
                    <span className="text-xs text-info">
                      Remains until the end of the offer
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
