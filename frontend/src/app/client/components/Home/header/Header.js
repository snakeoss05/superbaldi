"use client";
import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import Image from "next/image";
import { toast } from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import ProductNavbar from "../../ProductItem/ProductNavbar";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products?&limit=2&discount=true&sortField=createdAt&sortOrder=desc`
        );
        setRecentProducts(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  // Function to get category icon based on name

  return (
    <div className="grid grid-cols-1 items-center justify-center bg-white relative">
      <div className="hidden sm:flex flex-row py-2 text-center h-full border-b border-border gap-4 bg-white mx-auto w-full max-w-screen-xl">
        <div
          className="relative flex flex-row items-center justify-between gap-2 px-4 py-3 text-white rounded-lg bg-secondary w-[220px] cursor-pointer transition-all duration-300 hover:bg-secondary/90"
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}>
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor">
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M19 12.75H5C4.80109 12.75 4.61032 12.671 4.46967 12.5303C4.32902 12.3897 4.25 12.1989 4.25 12C4.25 11.8011 4.32902 11.6103 4.46967 11.4697C4.61032 11.329 4.80109 11.25 5 11.25H19C19.1989 11.25 19.3897 11.329 19.5303 11.4697C19.671 11.6103 19.75 11.8011 19.75 12C19.75 12.1989 19.671 12.3897 19.5303 12.5303C19.3897 12.671 19.1989 12.75 19 12.75Z"
                  fill="currentColor"
                />
                <path
                  d="M19 8.25H5C4.80109 8.25 4.61032 8.17098 4.46967 8.03033C4.32902 7.88968 4.25 7.69891 4.25 7.5C4.25 7.30109 4.32902 7.11032 4.46967 6.96967C4.61032 6.82902 4.80109 6.75 5 6.75H19C19.1989 6.75 19.3897 6.82902 19.5303 6.96967C19.671 7.11032 19.75 7.30109 19.75 7.5C19.75 7.69891 19.671 7.88968 19.5303 8.03033C19.3897 8.17098 19.1989 8.25 19 8.25Z"
                  fill="currentColor"
                />
                <path
                  d="M19 17.25H5C4.80109 17.25 4.61032 17.171 4.46967 17.0303C4.32902 16.8897 4.25 16.6989 4.25 16.5C4.25 16.3011 4.32902 16.1103 4.46967 15.9697C4.61032 15.829 4.80109 15.75 5 15.75H19C19.1989 15.75 19.3897 15.829 19.5303 15.9697C19.671 16.1103 19.75 16.3011 19.75 16.5C19.75 16.6989 19.671 16.8897 19.5303 17.0303C19.3897 17.171 19.1989 17.25 19 17.25Z"
                  fill="currentColor"
                />
              </g>
            </svg>
            <p className="text-sm font-secondary font-semibold uppercase">
              جميع الفئات
            </p>
          </div>
          <svg
            className={`transition duration-300 transform ${
              isOpen ? "rotate-180" : ""
            } w-5 h-5`}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff">
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <path
                d="M15.3598 13.2682L9.35979 8.26824C8.33549 7.41466 9.61586 5.87822 10.6402 6.7318L16.6402 11.7318C17.6645 12.5854 16.3841 14.1218 15.3598 13.2682Z"
                fill="#ffffff"
              />
              <path
                d="M3.35979 11.7318L9.35979 6.7318C10.3841 5.87822 11.6645 7.41466 10.6402 8.26824L4.64016 13.2682C3.61586 14.1218 2.33549 12.5854 3.35979 11.7318Z"
                fill="#ffffff"
              />
            </g>
          </svg>

          {/* Category Dropdown Menu */}
          <div
            className={`absolute right-0 top-full mt-2 w-screen max-w-screen-xl bg-white shadow-xl rounded-b-lg transition-all duration-300 ease-in-out z-50 ${
              isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}>
            <div className="grid grid-cols-12 gap-6 p-8">
              {/* Categories Section */}
              <div className="col-span-12">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  أختر حسب الفئة
                </h3>
                <div className="grid grid-cols-4 gap-6">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <div
                        key={category._id}
                        className="group"
                        onMouseEnter={() => setHoveredCategory(category._id)}
                        onMouseLeave={() => setHoveredCategory(null)}>
                        <Link
                          href={`/client/pages/product?category=${category._id}`}
                          className="flex items-center gap-3 p-2 rounded-md transition-all duration-200 hover:bg-gray-50">
                          {category.image && (
                            <Image
                              src={
                                category.image ||
                                "/fashion/category/default-category.jpg"
                              }
                              alt={category.name}
                              width={50}
                              height={50}
                              className="rounded-full"
                            />
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-800 group-hover:text-secondary transition-colors duration-200">
                              {category.name}
                            </p>
                            {category.description && (
                              <p className="text-xs text-gray-500 truncate max-w-[150px]">
                                {category.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-3">
                      No categories found.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className="flex flex-row justify-center mx-auto items-center space-x-10 ps-8 text-[14px]">
          <li className="flex flex-row items-center mx-8 justify-between h-full cursor-pointer ">
            <Link
              href="/"
              className="text-gray-800 font-semibold relative py-1 uppercase after:ease after:transition-all after:duration-300 after: after:content[''] hover:after:border hover:after:border-b-1 after:border-[#1f1f1f] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full">
              الصفحة الرئيسية
            </Link>
          </li>

          <li className="flex flex-row items-center justify-between cursor-pointer">
            <Link
              href={`/client/pages/product?discount=true`}
              className="text-gray-800 font-semibold relative py-1 uppercase after:ease after:transition-all after:duration-300 after: after:content[''] hover:after:border hover:after:border-b-1 after:border-[#1f1f1f] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full">
              العروض
            </Link>
          </li>

          <li className="flex flex-row items-center justify-between cursor-pointer">
            <span className="text-gray-800 font-semibold relative py-1 uppercase after:ease after:transition-all after:duration-300 after: after:content[''] hover:after:border hover:after:border-b-1 after:border-[#1f1f1f] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full">
              من نحن
            </span>
          </li>

          <li className="flex flex-row items-center justify-between cursor-pointer">
            <Link
              href={"/client/pages/contact"}
              className="text-gray-800 font-semibold relative py-1 uppercase after:ease after:transition-all after:duration-300 after: after:content[''] hover:after:border hover:after:border-b-1 after:border-[#1f1f1f] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full">
              تواصل معنا
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2 ms-auto">
          <span className="text-gray-500 text-sm">تواصل معنا :</span>{" "}
          <span className="font-normal">21627768325+</span>
        </div>
      </div>
      <div className="flex  w-full max-w-screen-xl mx-auto">
        <Carousel />
      </div>
    </div>
  );
}
