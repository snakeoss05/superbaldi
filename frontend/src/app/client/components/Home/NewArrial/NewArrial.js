"use client";

import React, { useState, useEffect } from "react";
import ProductItem from "../../ProductItem/ProductItem";
import axios from "axios";
import ProductSkeleton from "../../ProductItem/ProductSkeleton";
import Countdown from "./Countdown";
import Carousel from "../Carousel/Carousel";

export default function NewArrial() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const changePage = () => {
      setPage(page + 1);
    };
    if (page > totalPages) {
      setPage(1);
      return;
    } else if (totalPages < 1) {
      const interval = setInterval(changePage, 10000);
      return () => clearInterval(interval);
    }
  }, [page]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products?page=${page}&limit=8&discount=true&sortField=createdAt&sortOrder=desc`
        );
        setProducts(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [page, products.length]);
  return (
    <div className="flex flex-col  justify-center gap-8 max-w-screen-xl  sm:py-16 my-8 mx-auto">
      <div className="flex flex-row justify-center gap-8 items-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <div>
            <p className="text-xl sm:text-3xl text-primary">
              عروض الأسبوع الخاصة!
            </p>
            <p className="text-sm text-info-dark mt-2">
              أفضل العروض لهذا الأسبوع
            </p>
          </div>

          <Countdown targetDate="2025-08-28T00:00:00" />
        </div>
      </div>

      <div className="border-2 border-danger  rounded-lg ">
        {products.length > 0 && (
          <Carousel
            products={products}
            showProgress={true}
            slidesPerView={5}
            spaceBetween={0}
            mobile={0}
          />
        )}
        <div className="grid grid-cols-1  lg:grid-cols-5 gap-8 ">
          {products.length === 0 &&
            Array.from({ length: 5 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}
