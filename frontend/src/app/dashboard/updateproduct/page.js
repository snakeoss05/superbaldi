"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

export default function UpdateProduct() {
  const [ProductId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [previews, setPreviews] = useState([]);
  const [editing, setEditing] = useState(false);

  const [categories, setCategories] = useState([]);
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      const filesArray = Array.from(files);
      setProduct((prev) => ({
        ...prev,
        images: filesArray,
      }));
      setPreviews(filesArray.map((file) => URL.createObjectURL(file)));
    } else if (name === "category") {
      const selectedCategory = categories.find((cat) => cat._id === value);
      setProduct((prev) => ({
        ...prev,
        category: selectedCategory || value, // fallback to value if not found
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("description", product.description);
    formData.append("discount", product.discount);
    formData.append("category", product.category?._id || product.category);
    formData.append("stock", product.stock);
    formData.append("brandName", product.brandName);
    formData.append("", product.prix_passager);

    if (product.images)
      for (let i = 0; i < product.images.length; i++) {
        formData.append("images", product.images[i]);
      }
    await fetch(`http://localhost:5000/api/products/${ProductId}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        setEditing(false);
      }
    });
  };
  const handleDelete = async () => {
    await fetch(`http://localhost:5000/api/products/${ProductId}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Product deleted successfully");
        setEditing(false);
      }
    });
  };

  useEffect(() => {
    if (!ProductId) {
      return;
    }
    const fetchProduct = async () => {
      const response = await fetch(
        `http://localhost:5000/api/products/${ProductId}`
      );
      const data = await response.json();
      if (!data.data) {
        setProduct(null);
        return;
      }
      setProduct(data.data);
    };

    fetchProduct();
  }, [ProductId]);
  useEffect(() => {
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
  }, [editing]);
  if (!product) {
    return (
      <div
        className="relative flex flex-col items-center  py-8 h-screen p-4 w-full"
        dir="ltr">
        <div className="me-auto relative w-full sm:w-[400px] mx-auto">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>

          <input
            type="text"
            id="Search"
            value={ProductId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Search By product Id"
            className="w-full rounded-md border-gray-200 bg-gray-100 py-1.5 sm:py-2.5 pe-10 ps-4 shadow-sm sm:text-sm focus-visible:outline-none"
          />
          <span className="absolute bg-black  rounded-r-lg inset-y-0 end-0 grid w-10 place-content-center">
            <button id="search" type="button">
              <span className="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6  text-gray-100 ">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
        <p className="text-3xl text-gray-400 mt-16">Product Not Found</p>
      </div>
    );
  }
  return (
    <div dir="ltr">
      <div className="flex items-center justify-start gap-4 p-4 sm:px-8">
        <div className="relative w-full mx-auto sm:w-[400px] ">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>

          <input
            type="text"
            id="Search"
            value={ProductId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Search By Order Id"
            className="w-full rounded-md border-gray-200 bg-gray-100 py-1.5 sm:py-2.5 pe-10 ps-4 shadow-sm sm:text-sm focus-visible:outline-none"
          />
          <span className="absolute bg-black   rounded-r-lg inset-y-0 end-0 grid w-10 place-content-center">
            <button id="search" type="button">
              <span className="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6  text-gray-100 ">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
        <svg
          className="w-10 h-10  hover:scale-110 transition duration-300"
          onClick={() => setEditing(!editing)}
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
              d="M16.652 3.45506L17.3009 2.80624C18.3759 1.73125 20.1188 1.73125 21.1938 2.80624C22.2687 3.88124 22.2687 5.62415 21.1938 6.69914L20.5449 7.34795M16.652 3.45506C16.652 3.45506 16.7331 4.83379 17.9497 6.05032C19.1662 7.26685 20.5449 7.34795 20.5449 7.34795M16.652 3.45506L10.6872 9.41993C10.2832 9.82394 10.0812 10.0259 9.90743 10.2487C9.70249 10.5114 9.52679 10.7957 9.38344 11.0965C9.26191 11.3515 9.17157 11.6225 8.99089 12.1646L8.41242 13.9M20.5449 7.34795L17.5625 10.3304M14.5801 13.3128C14.1761 13.7168 13.9741 13.9188 13.7513 14.0926C13.4886 14.2975 13.2043 14.4732 12.9035 14.6166C12.6485 14.7381 12.3775 14.8284 11.8354 15.0091L10.1 15.5876M10.1 15.5876L8.97709 15.9619C8.71035 16.0508 8.41626 15.9814 8.21744 15.7826C8.01862 15.5837 7.9492 15.2897 8.03811 15.0229L8.41242 13.9M10.1 15.5876L8.41242 13.9"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            />{" "}
            <path
              d="M22.75 12C22.75 11.5858 22.4142 11.25 22 11.25C21.5858 11.25 21.25 11.5858 21.25 12H22.75ZM12 2.75C12.4142 2.75 12.75 2.41421 12.75 2C12.75 1.58579 12.4142 1.25 12 1.25V2.75ZM7.37554 20.013C7.017 19.8056 6.5582 19.9281 6.3508 20.2866C6.14339 20.6452 6.26591 21.104 6.62446 21.3114L7.37554 20.013ZM2.68862 17.3755C2.89602 17.7341 3.35482 17.8566 3.71337 17.6492C4.07191 17.4418 4.19443 16.983 3.98703 16.6245L2.68862 17.3755ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75C2.75 6.89137 6.89137 2.75 12 2.75V1.25ZM6.62446 21.3114C8.2064 22.2265 10.0432 22.75 12 22.75V21.25C10.3139 21.25 8.73533 20.7996 7.37554 20.013L6.62446 21.3114ZM1.25 12C1.25 13.9568 1.77351 15.7936 2.68862 17.3755L3.98703 16.6245C3.20043 15.2647 2.75 13.6861 2.75 12H1.25Z"
              fill="#1C274C"
            />{" "}
          </g>
        </svg>
        <svg
          onClick={handleDelete}
          className="w-10 h-10  hover:scale-110 transition duration-300"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#d10000">
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M20.5001 6H3.5"
              stroke="#db0000"
              strokeWidth="1.5"
              strokeLinecap="round"
            />{" "}
            <path
              d="M9.5 11L10 16"
              stroke="#db0000"
              strokeWidth="1.5"
              strokeLinecap="round"
            />{" "}
            <path
              d="M14.5 11L14 16"
              stroke="#db0000"
              strokeWidth="1.5"
              strokeLinecap="round"
            />{" "}
            <path
              d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
              stroke="#db0000"
              strokeWidth="1.5"
            />{" "}
            <path
              d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5"
              stroke="#db0000"
              strokeWidth="1.5"
              strokeLinecap="round"
            />{" "}
          </g>
        </svg>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8 sm:px-8 py-8 lg:py-16">
        <div className="w-full">
          {editing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-4 w-full">
              <div>
                <label className="text-sm font-bold text-gray-400 ">
                  Upload Product Images
                </label>
                <label
                  htmlFor="uploadFile1"
                  className="bg-white  text-center rounded  max-w-sm min-h-[180px] py-4 my-4 px-4 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 mx-auto font-[sans-serif]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 mb-3 fill-gray-400"
                    viewBox="0 0 24 24">
                    <path
                      d="M22 13a1 1 0 0 0-1 1v4.213A2.79 2.79 0 0 1 18.213 21H5.787A2.79 2.79 0 0 1 3 18.213V14a1 1 0 0 0-2 0v4.213A4.792 4.792 0 0 0 5.787 23h12.426A4.792 4.792 0 0 0 23 18.213V14a1 1 0 0 0-1-1Z"
                      data-original="#000000"
                    />
                    <path
                      d="M6.707 8.707 11 4.414V17a1 1 0 0 0 2 0V4.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414Z"
                      data-original="#000000"
                    />
                  </svg>
                  <p className="text-gray-400 font-semibold text-sm">
                    Drag &amp; Drop or{" "}
                    <span className="text-[#007bff]">Choose file</span> to
                    upload
                  </p>
                  <input
                    type="file"
                    id="uploadFile1"
                    className="hidden"
                    name="images"
                    multiple
                    required
                    onChange={handleChange}
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    PNG, JPG SVG, WEBP, and GIF are Allowed.
                  </p>
                </label>
                <div className="flex items-center justify-center">
                  {previews.map((preview, index) => (
                    <Image
                      key={index}
                      width={200}
                      height={200}
                      src={preview}
                      alt={`Preview ${index}`}
                      className=" h-auto object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
              <form
                onSubmit={handleUpdate}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-sm font-bold text-gray-400 ">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    className="w-full my-2 border-2 border-gray-300 rounded-md p-2"
                    value={product.productName}
                    onChange={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-bold text-gray-400">
                    Category
                  </label>
                  <select
                    name="category"
                    value={product.category?._id || product.category || ""}
                    onChange={handleChange}
                    className="px-3 w-full my-2 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value={product.category?._id}>
                      {product.category?.name}
                    </option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-400 ">
                    brandName
                  </label>
                  <input
                    type="text"
                    name="brandName"
                    className="w-full my-4 border-2 border-gray-300 rounded-md p-2"
                    value={product.brandName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-400 ">
                    
                  </label>
                  <input
                    type="number"
                    name=""
                    className="w-full my-4 border-2 border-gray-300 rounded-md p-2"
                    value={product.prix_passager}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-400 ">
                    Product Discount
                  </label>
                  <input
                    type="number"
                    name="discount"
                    className="w-full my-4 border-2 border-gray-300 rounded-md p-2"
                    value={product.discount}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-400 ">
                    Product Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    className="w-full my-4 border-2 border-gray-300 rounded-md p-2"
                    value={product.stock}
                    onChange={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-bold text-gray-400 ">
                    Product Description
                  </label>
                  <textarea
                    name="description"
                    className="w-full my-4 border-2 border-gray-300 rounded-md p-2"
                    value={product.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#007bff] text-white font-bold py-2 px-4 rounded-md hover:bg-[#0069d9] transition duration-300">
                    Update
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 ">
              <div className="flex  items-center justify-center ">
                <Image
                  src={product.image}
                  alt="product image"
                  width={500}
                  height={500}
                  className="h-auto w-auto object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 ">
                <div className="flex flex-row items-center justify-between ">
                  <p className="text-md font-semibold uppercase text-info">
                    {product.category?.name}
                  </p>
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
                  <p className="text-md font-semibold text-[#1F1F1F]">
                    ${product.prix_passager}
                  </p>
                  <p className="text-[#1F1F1F] text-sm font-semibold py-1 px-2 rounded-xl bg-[#D2EF9A]">
                    {product.discount}%
                  </p>
                </div>
                <div className="col-span-4">
                  {product.stock > 0 ? (
                    <p className="text-md font-bold text-green-400">In Stock</p>
                  ) : (
                    <p className="text-md font-bold text-red-400">
                      Out of Stock
                    </p>
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
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <p className="text-md ">Sold It:</p>

                  <div className="relative w-full h-2 bg-gray-200 rounded-lg overflow-hidden ">
                    <div
                      className="absolute top-0 left-0 h-full bg-[#db4444] transition-all duration-500"
                      style={{ width: `${product.stock}%` }}></div>
                  </div>
                  <p className="text-sm text-[#696C70] col-start-2">
                    {product.stock}% - only {product.stock} Item(s) left in
                    stock!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
