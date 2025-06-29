"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CarouselCategory from "./CarouselCategory";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Categorys() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.3:5000/api/categories"
        );
        setCategories(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-screen-xl mx-auto text-center font-secondary">
        <h1 className="text-2xl sm:text-5xl font-semibold my-12 mb-16">
          استكشاف المجموعات
        </h1>
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto text-center font-secondary">
      <h1 className="text-2xl sm:text-5xl font-semibold my-12 mb-16">
        استكشاف المجموعات
      </h1>

      {categories.length > 0 ? (
        <CarouselCategory categories={categories} />
      ) : (
        <p className="text-gray-500">No categories available.</p>
      )}
    </div>
  );
}
