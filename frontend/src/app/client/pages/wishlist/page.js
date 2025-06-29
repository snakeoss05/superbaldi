"use client";

import { useState, useEffect } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import { useAppSelector } from "@/lib/hooks";
import { getWishlistById, deleteWishlistById } from "@/utils/wishlistService";
import toast from "react-hot-toast";
import ProductCart from "../../components/ProductCart/ProductCart";

export default function WhishList() {
  const [products, setProducts] = useState([]);
  const isAuth = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);

  // Fetch wishlist on client side
  useEffect(() => {
    if (isAuth) {
      getWishlistById(user._id)
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [isAuth, user]);

  // Handle delete operation
  function handleDelete(id) {
    deleteWishlistById(id)
      .then(() => {
        // Refresh wishlist after deletion
        getWishlistById(user._id)
          .then((data) => setProducts(data))
          .catch((error) => toast.error(error.message));
      })
      .catch((error) => toast.error(error.message));
  }

  // Render only for authenticated users
  if (!isAuth) {
    return null; // Ensure server and client render the same
  }

  // Display message if no products are available
  if (products.length === 0) {
    return (
      <div className="text-center text-gray-600 h-screen flex items-center justify-center w-full">
        <h1 className="text-xl md:text-2xl">No products in wishlist</h1>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 lg:px-32 lg:py-12 space-y-6">
      <div className="flex justify-between flex-col gap-4 sm:flex-row">
        <h1 className="text-lg md:text-2xl mt-2">
          WhishList ({products.length})
        </h1>
        <button
          className="border rounded transition duration-300 ease-in-out border-red-600 px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white text-md lg:text-2xl"
          onClick={() => handleDelete(user._id)}>
          Clear All
        </button>
        <button className="border rounded transition duration-300 ease-in-out border-gray-800 px-4 py-2 text-black hover:bg-black hover:text-white text-md lg:text-2xl [text-shadow:_-4px_5px_4px_rgb(0_0_0_/_30%)]">
          Move All To Cart
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {products?.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
