"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Price from "../ProductItem/Price";
import { useAppSelector } from "@/lib/hooks";
import CategoryList from "./CategoryList";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState("categories"); // "categories" or "search"
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      if (name.length > 2) {
        setLoading(true);
        try {
          const res = await axios.get(
            `https://superbaldi-production.up.railway.app/api/products/search?name=${name}`
          );
          setProducts(res.data.data);
          setLoading(false);
          if (res.data.data.length > 0) setIsOpen(true);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      } else {
        setProducts([]);
      }
    };

    fetchProducts();
  }, [name]);
  // Prevent body scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="block sm:hidden">
      <button
        aria-label="Toggle Menu"
        className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
        onClick={() => setIsOpen(true)}
        type="button">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div
        className={`fixed inset-0 z-50 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}>
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-[85vw] bg-white transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Image
                  width={150}
                  height={150}
                  src="/fashion/bacola-logo.avif"
                  alt="logo"
                  className="h-8 w-auto"
                />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor">
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-3 text-center font-medium transition-colors ${
                  activeTab === "categories"
                    ? "text-secondary border-b-2 border-secondary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("categories")}>
                الفئات
              </button>
              <button
                className={`flex-1 py-3 text-center font-medium transition-colors ${
                  activeTab === "search"
                    ? "text-secondary border-b-2 border-secondary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("search")}>
                البحث
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === "search" ? (
                <div className="p-4 flex flex-col gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      id="Search"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="علا شنوا تلوج ؟"
                      className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
                    />
                    <button className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
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
                  <div className="flex flex-col gap-4  overflow-y-auto  w-full  p-2">
                    {products.length > 0 &&
                      products.map((product) => (
                        <Link
                          href={`/client/pages/product/${encodeURIComponent(
                            product.productName
                          )}/${product._id}`}
                          onClick={() => setIsOpen(false)}
                          key={product._id}>
                          <div className="flex flex-row gap-2 justify-between hover:bg-info-light h-[100px] overflow-hidden p-2 cursor-pointer transition-all duration-300 rounded-lg">
                            <div className="flex justify-center items-center gap-2 p-2">
                              <Image
                                width={100}
                                height={100}
                                src={product.colors[0].images[0]}
                                className="rounded-lg w-auto h-16 object-cover"
                                alt="music"
                              />
                              <p className="text-sm  truncate text-text">
                                {product.productName}
                              </p>
                            </div>

                            <div className="flex flex-row items-center   ">
                              <div className="flex flex-col items-end  gap-1">
                                <Price product={product} role={user.role} />
                                {product.stock > 0 ? (
                                  <p className="text-sm text-success">
                                    In Stock
                                  </p>
                                ) : (
                                  <p className="text-sm text-danger">
                                    Out of Stock
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <CategoryList setisOpen={setIsOpen} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
