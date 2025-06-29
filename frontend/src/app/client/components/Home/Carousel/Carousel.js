"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProductItem from "../../ProductItem/ProductItem";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
export default function Carousel({
  products,
  showProgress = false,
  slidesPerView = 4,
  spaceBetween = 30,
  mobile = 10,
}) {
  return (
    <Swiper
      modules={[Navigation, Autoplay, Pagination]}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 4000, // milliseconds
        disableOnInteraction: false, // prevent autoplay stopping on user interaction
      }}
      breakpoints={{
        320: { slidesPerView: 2, spaceBetween: mobile },
        640: { slidesPerView: 2, spaceBetween: 10 },
        768: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: slidesPerView, spaceBetween: spaceBetween },
      }}
      loop={true}
      className="mySwiper py-16 max-w-screen-xl mx-auto"
      navigation>
      {products.map((product) => (
        <SwiperSlide className="w-full" key={product._id}>
          <ProductItem product={product} progress={showProgress} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
