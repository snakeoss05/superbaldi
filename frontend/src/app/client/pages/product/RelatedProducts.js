import React, { useState, useEffect } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import ProductSkeleton from "../../components/ProductItem/ProductSkeleton";
import axios from "axios";

export default function RelatedProducts({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      // Ensure category._id is used instead of the entire category object
      const queryParams = new URLSearchParams({
        limit: "4",
        category: category._id, // Use category._id directly
      });

      try {
        const res = await axios.get(
          `http://192.168.1.3:5000/api/products?${queryParams.toString()}`
        );

        setProducts(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="flex flex-col gap-6  w-full max-w-screen-xl mx-auto overflow-hidden">
      <p className="text-3xl text-gray-700 font-semibold">Related Products</p>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 overflow-hidden">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
        {products.length === 0 && !loading && (
          <div className="flex justify-center items-center text-center h-64 sm:col-span-4">
            <p className="text-3xl text-gray-500 font-semibold">
              No products found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
