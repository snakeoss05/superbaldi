"use client";

import { useEffect, useState } from "react";
import React from "react"; // Import React for React.use()
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/hooks";
import { addItem, setItemQuantity } from "@/lib/features/cart/cartReducer";
import { createWishlist } from "@/utils/wishlistService";
import { useAppSelector } from "@/lib/hooks";
import Countdown from "@/app/client/components/Countdown/Countdown";
import NextBreadcrumb from "@/app/client/components/Breadcrumb/Breadcrumb";
import RelatedProducts from "../../RelatedProducts";
import Tabs from "@/app/client/components/Tabs/Tabs";
import Loading from "@/app/loading";
import Price from "@/app/client/components/ProductItem/Price";

export default function Product({ params }) {
  const [product, setProduct] = useState(null);
  const [tabs, setTabs] = useState(1);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isAuth = useAppSelector((state) => state.auth.token);

  // Unwrap params using React.use()
  const unwrappedParams = React.use(params);

  useEffect(() => {
    if (unwrappedParams.id) {
      setLoading(true);
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/products/${unwrappedParams.id}`
          );
          setProduct(response.data.data);

          setMainImage(response.data.data.image);
          setCategory(response.data.data.category);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching product:", error);
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [unwrappedParams.id]);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  function handleAddToWishlist() {
    if (isAuth) {
      createWishlist(product._id, user._id).then((data) => {
        toast.success("added to wishlist successfully");
      });
    } else {
      toast.error("please login first");
    }
  }
  const handleAddToCart = () => {
    dispatch(
      addItem({
        ...product,
        quantity,
      })
    );

    toast.success("Added To Cart Successfully");
  };

  if (!product) return <Loading />;
  return (
    <div
      dir="ltr"
      className="w-full sm:max-w-screen-xl mx-auto lg:py-16 p-4 space-y-8">
      <NextBreadcrumb
        homeElement={"Home"}
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
        activeClasses="text-amber-500"
        containerClasses="flex flex-row flex-wrap p-4 bg-[#F7F7F7] rounded-lg"
        listClasses="hover:underline mx-2 font-normal text-sm"
        capitalizeLinks
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        <div className="flex flex-col  lg:flex-row gap-4">
          <Image
            src={product.image}
            alt={product.productName}
            width={500}
            height={500}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-row items-center justify-between ">
            <p className="text-md font-semibold uppercase text-info">
              {product.category?.name}
            </p>
            <svg
              onClick={handleAddToWishlist}
              className="w-10 h-10 p-2 text-gray-500 rounded-lg border border-gray-200 hover:bg-[#1f1f1f] hover:text-white transition duration-300"
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
                  d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z"
                  fill="currentColor"
                />{" "}
              </g>
            </svg>
          </div>
          <p className="text-2xl lg:text-3xl font-semibold capitalize text-elpsis">
            {product.productName}
          </p>
          <div className="flex flex-row items-center gap-1">
            {[...Array(4)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 -960 960 960"
                fill="#F19E39">
                <path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Z" />
              </svg>
            ))}
            <p className="text-sm text-gray-500 font-thin">(3 reviews)</p>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Price product={product} role={user.role} />
            <p className="text-[#1F1F1F] text-sm font-semibold py-1 px-2 rounded-xl bg-[#D2EF9A]">
              {product.discount}%
            </p>
          </div>
          <div className="col-span-4">
            {product.stock > 0 ? (
              <p className="text-md font-bold text-green-400">In Stock</p>
            ) : (
              <p className="text-md font-bold text-red-400">Out of Stock</p>
            )}
          </div>
          <div className="text-elpsis overflow-hidden h-fit text-sm text-[#696C70] font-normal">
            {product.description}
          </div>
          <hr className="my-4" />

          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <p className="text-md ">
              Hurry Up!
              <br /> Offer ends in:
            </p>
            <Countdown targetDate="2025-12-31T23:59:59" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <p className="text-md ">Sold It:</p>

            <div className="relative w-full h-2 bg-gray-200 rounded-lg overflow-hidden ">
              <div
                className="absolute top-0 left-0 h-full bg-[#db4444] transition-all duration-500"
                style={{ width: `${product.stock}%` }}></div>
            </div>
            <p className="text-sm text-[#696C70] col-start-2">
              {product.stock}% - only {product.stock} Item(s) left in stock!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 items-center">
            <div className="flex flex-row h-10 rounded-xl overflow-hidden border w-fit bg-gray-100">
              <span
                className=" text-center h-full w-12  appearance-none text-gray-800 border-0 transition duration-300 ease-in-out hover:bg-red-500 hover:text-white px-2 py-2"
                onClick={handleIncreaseQuantity}>
                +
              </span>
              <input
                type="string"
                className=" w-12 bg-gray-50 border-0 appearance-none h-full text-center px-2 py-2 ocus:outline-none"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <span
                className="h-full text-center  appearance-none  w-12 text-gray-800 border-0 transition duration-300 ease-in-out hover:bg-red-500 hover:text-white px-2 py-2"
                onClick={handleDecreaseQuantity}>
                -
              </span>
            </div>

            <button
              className="text-black border border-[#1F1F1F] text-[14px] font-semibold py-2.5 uppercase rounded-xl hover:bg-[#1F1F1F] hover:text-white transition duration-300"
              onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className="col-span-2 bg-[#1F1F1F] text-white uppercase text-sm font-semibold py-3  rounded-xl hover:bg-[#D2EF9A] hover:text-[#1F1F1F] transition duration-300"
              onClick={handleAddToCart}>
              Buy it now
            </button>
          </div>
          <hr className="my-4" />
          <div className="flex flex-row flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <svg
                className="w-6 h-6"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth={3}
                stroke="#000000"
                fill="none">
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M54.89,26.73A23.52,23.52,0,0,1,15.6,49"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9,37.17a23.75,23.75,0,0,1-.53-5A23.51,23.51,0,0,1,48.3,15.2"
                    strokeLinecap="round"
                  />
                  <polyline
                    points="37.73 16.24 48.62 15.44 47.77 5.24"
                    strokeLinecap="round"
                  />
                  <polyline
                    points="25.91 47.76 15.03 48.56 15.88 58.76"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
              <span>Delivery & Returns</span>
            </div>
            <div className="flex items-center gap-2">
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
                    d="M12 3C7.04 3 3 7.04 3 12C3 16.96 7.04 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3ZM12 19.5C7.86 19.5 4.5 16.14 4.5 12C4.5 7.86 7.86 4.5 12 4.5C16.14 4.5 19.5 7.86 19.5 12C19.5 16.14 16.14 19.5 12 19.5ZM14.3 7.7C14.91 8.31 15.25 9.13 15.25 10C15.25 10.87 14.91 11.68 14.3 12.3C13.87 12.73 13.33 13.03 12.75 13.16V13.5C12.75 13.91 12.41 14.25 12 14.25C11.59 14.25 11.25 13.91 11.25 13.5V12.5C11.25 12.09 11.59 11.75 12 11.75C12.47 11.75 12.91 11.57 13.24 11.24C13.57 10.91 13.75 10.47 13.75 10C13.75 9.53 13.57 9.09 13.24 8.76C12.58 8.1 11.43 8.1 10.77 8.76C10.44 9.09 10.26 9.53 10.26 10C10.26 10.41 9.92 10.75 9.51 10.75C9.1 10.75 8.76 10.41 8.76 10C8.76 9.13 9.1 8.32 9.71 7.7C10.94 6.47 13.08 6.47 14.31 7.7H14.3ZM13 16.25C13 16.8 12.55 17.25 12 17.25C11.45 17.25 11 16.8 11 16.25C11 15.7 11.45 15.25 12 15.25C12.55 15.25 13 15.7 13 16.25Z"
                    fill="#000000"
                  />{" "}
                </g>
              </svg>

              <span>Ask a Question</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6"
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
                    d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                    fill="#0F0F0F"
                  />{" "}
                  <path
                    d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                    fill="#0F0F0F"
                  />{" "}
                </g>
              </svg>

              <span>Estimated Delivery:</span>
              <span className="text-gray-600">23 January - 27 January</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-6 h-6 text-gray-700"
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

              <span>47</span>
              <span className="text-gray-600">
                People viewing this product right now!
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-2 overflow-hidden">
        <Tabs product={product} tabs={tabs} setTabs={setTabs} />
      </div>
      <div className="col-span-2 space-y-8 p-4 my-8">
        {category && <RelatedProducts category={category} />}
      </div>
    </div>
  );
}
