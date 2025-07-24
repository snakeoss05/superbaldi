"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Price from "../ProductItem/Price";
import { useAppSelector } from "@/lib/hooks";
export default function SearchInput() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    const fetchProducts = async () => {
      if (name.length > 2) {
        setLoading(true);
        try {
          const res = await axios.get(
            `http://localhost:5000/api/products/search?name=${name}`
          );
          setProducts(res.data.data);
          setLoading(false);
          if (res.data.data.length > 0) setIsOpen(true);
          setLoading;
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      } else {
        setIsOpen(false);
      }
    };

    fetchProducts();
  }, [name]);
  return (
    <div className={`hidden sm:block pe-10 `} style={{ zIndex: 1000 }}>
      <div className="relative flex items-center justify-center z-50  flex-row">
        <div className="overflow-hidden   w-full ">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>

          <input
            type="text"
            id="Search"
            name="Search"
            onChange={(e) => setName(e.target.value)}
            placeholder="علا شنوا تلوج ؟"
            className="w-full  bg-form-background font-normal rounded-lg h-full py-2.5 sm:py-5 px-4 ps-8 shadow-sm sm:text-sm focus-visible:outline-none"
          />
          <button
            type="button"
            className="bg-form-background absolute left-0 top-0 text-gray-100  w-16 h-full font-semibold text-sm py-3 rounded-r-lg uppercase hidden sm:flex items-center justify-center">
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

        {isOpen && (
          <div
            className={`absolute top-full   w-full z-50 bg-white rounded-sm  border-b-4 border-danger-light  shadow-lg transition duration-300 ease-in-out  ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}>
            <div className="flex items-center justify-between p-2 sm:p-4">
              <p className="text-sm text-gray text-nowrap">
                Résults of search : ({products.length})
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500 cursor-pointer hover:text-red-500"
                viewBox="0 0 384 512"
                onClick={() => setIsOpen(false)}
                fill="currentColor">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>

            <div className="flex flex-col gap-4 h-[400px] overflow-y-auto  w-full  p-2">
              {products.length > 0 &&
                products.map((product) => (
                  <Link
                    href={`/client/pages/product/${encodeURIComponent(
                      product.productName
                    )}/${product._id}`}
                    key={product._id}>
                    <div className="flex flex-row gap-2 justify-between hover:bg-info-light h-[100px] overflow-hidden p-2 cursor-pointer transition-all duration-300 rounded-lg">
                      <div className="flex justify-center items-center gap-2 p-2">
                        <Image
                          width={100}
                          height={100}
                          src={product.image}
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
                            <p className="text-sm text-success">In Stock</p>
                          ) : (
                            <p className="text-sm text-danger">Out of Stock</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>

      <div
        className={`fixed block top-0  z-40 w-screen  bg-black bg-opacity-25 transition-opacity duration-300 ease-in-out  left-0 ${
          isOpen ? "opacity-100 h-screen" : "opacity-0 h-0"
        }`}
        onClick={() => setIsOpen(false)}></div>
    </div>
  );
}
