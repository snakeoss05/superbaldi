"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function Carousel() {
  const [categories, setCategories] = useState([]);
  const images = [
    {
      img: "/fashion/slider-image/1.webp",
      title: "Find Your Perfect Look with Ease",
      description: "Sale! Up to 50% Off!",
    },
    {
      img: "/fashion/slider-image/2.webp",
      title: "Where Style Meets Creativity",
      description: "Sale! Up to 50% Off!",
    },
    {
      img: "/fashion/slider-image/3.webp",
      title: "Where Style Meets Creativity",
      description: "Sale! Up to 50% Off!",
    },
    {
      img: "/fashion/slider-image/4.webp",
      title: "Where Style Meets Creativity",
      description: "Sale! Up to 50% Off!",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const intervalRef = useRef(null);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="relative  w-full p-2 sm:ps-6 mx-auto overflow-hidden mt-2  ">
      <div className="flex flex-row  w-full">
        <Image
          src={images[currentIndex].img}
          width={1920}
          height={500}
          className="w-full  h-48 sm:h-96 object-cover ms-atuo mt-auto right-0  -z-1"
          loading="lazy"
          alt={`Slide ${currentIndex + 1}`}
        />

        <div className="absolute bottom-8 left-12 transform  flex space-x-4">
          {images.map((_, index) => (
            <button
              key={index}
              title="Go to slide"
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-[#1f1f1f]" : "bg-gray"
              }`}
              onClick={() => setCurrentIndex(index)}></button>
          ))}
        </div>
      </div>
    </div>
  );
}
