"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function CarouselCategory({ categories }) {
  return (
    <div className="flex flex-row justify-center items-center w-full overflow-x-hidden">
      <Swiper
        centeredSlides={true}
        speed={3000}
        autoplay={{
          delay: 0,
        }}
        spaceBetween={30}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper">
        {categories.map((category, index) => (
          <SwiperSlide key={`${category._id}-${index}`}>
            <Link
              href={`/client/pages/product?category=${category._id}`}
              className="flex flex-col justify-center overflow-hidden items-center h-56 p-6 relative border border-border">
              <Image
                src={category.image || "/fashion/category/default-category.jpg"}
                alt={category.name || "Category image"}
                className=" object-cover relative p-4  blur-sm hover:blur-none transition duration-500"
                width={500}
                height={500}
              />

              {category.name && (
                <p className="text-gray-500 absolute z-50  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center capitalize px-3 py-2 mb-2 rounded-lg font-semibold  hover:bg-rating text-lg hover:scale-105 transition duration-500">
                  {category.name}
                </p>
              )}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
