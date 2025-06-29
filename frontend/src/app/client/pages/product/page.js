"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProductItem from "../../components/ProductItem/ProductItem";
import Filter from "./filter/Filter";
import Pagination from "../../components/Pagination/Pagination";
import { useSearchParams, usePathname } from "next/navigation";
import ProductSkeleton from "../../components/ProductItem/ProductSkeleton";
import axios from "axios";
import NextBreadcrumb from "../../components/Breadcrumb/Breadcrumb";

export default function Products() {
  const searchParams = useSearchParams();
  const department = searchParams.get("department");
  const category = searchParams.get("category");
  const [products, setProducts] = useState([]);
  const [discount, setDiscounts] = useState(
    searchParams.get("discount") || false
  );
  const [SelectedBrands, setSelectedBrands] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [stock, setStock] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [sortField, setSortField] = useState(""); // New state for sorting
  const [sortOrder, setSortOrder] = useState(""); // New state for sorting

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        discount: discount || "",
        brandName: SelectedBrands.length > 0 ? SelectedBrands.join(",") : "",
        department: department ?? "",
        category: category ?? "",
        minPrice: minPrice !== "" ? minPrice : "",
        maxPrice: maxPrice !== "" ? maxPrice : "",
        stock: stock !== "" ? stock : "",
        sortField: sortField || "", // Include sorting field
        sortOrder: sortOrder || "", // Include sorting order
      });

      try {
        const res = await axios.get(
          `https://superbaldi-production.up.railway.app/api/products?${queryParams.toString()}`
        );
        setIsLoading(false);
        setProducts(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [
    page,
    discount,
    category,
    minPrice,
    maxPrice,
    stock,
    SelectedBrands,
    department,
    sortField,
    sortOrder,
  ]);

  const handleDelete = async (id) => {
    const res = await fetch(
      `https://superbaldi-production.up.railway.app/api/products/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      setProducts(products.filter((product) => product._id !== id));
    } else {
      console.error("Failed to delete product");
    }
  };

  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
    setIsOpen(false);
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="h-36 sm:h-56 overflow-hidden relative bg-gradient-to-r from-primary-50 to-primary-100">
        <div className="z-10 absolute inset-0 flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-800">Shop</h1>
          <NextBreadcrumb
            homeElement={"Home"}
            showtheLastElement={true}
            separator={
              <svg
                fill="currentColor"
                height="18px"
                className="my-auto text-gray-500"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                stroke="currentColor">
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path d="M15.5,11.3L9.9,5.6c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l4.9,4.9l-4.9,4.9c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.6,0.4,1,1,1c0.3,0,0.5-0.1,0.7-0.3l5.7-5.7c0,0,0,0,0,0C15.9,12.3,15.9,11.7,15.5,11.3z" />
                </g>
              </svg>
            }
            activeClasses="text-primary-600"
            containerClasses="flex flex-row flex-wrap p-4 rounded-lg"
            listClasses="hover:underline mx-2 font-normal text-sm"
            capitalizeLinks
          />
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto mb-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-7">
          {/* Filters Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-4">
              <Filter
                category={category}
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                SelectedBrands={SelectedBrands}
                setSelectedBrands={setSelectedBrands}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-5 space-y-6">
            {/* Results and Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600 text-sm">
                Showing <span className="font-medium">{products.length}</span>{" "}
                products
              </p>

              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                    />
                  </svg>
                  Sort
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Sort Dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}>
                  <div className="py-1">
                    <button
                      onClick={() => handleSortChange("createdAt", "desc")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Newest
                    </button>
                    <button
                      onClick={() => handleSortChange("price", "asc")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Price: Low to High
                    </button>
                    <button
                      onClick={() => handleSortChange("price", "desc")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Price: High to Low
                    </button>
                    <button
                      onClick={() => setDiscounts(true)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Best Discounts
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.length > 0 &&
                products.map((product) => (
                  <ProductItem
                    key={product._id}
                    product={product}
                    handleDelete={handleDelete}
                  />
                ))}
              {products.length === 0 && !isLoading && (
                <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center">
                  <svg
                    className="h-16 w-16 text-gray-300 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-900 mb-1">
                    No products found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your filters or search criteria
                  </p>
                </div>
              )}
              {isLoading &&
                Array.from({ length: 6 }).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
            </div>

            {/* Pagination */}
            {!isLoading && products.length > 0 && (
              <div className="mt-8">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  setPage={setPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
