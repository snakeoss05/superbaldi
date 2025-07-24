import React from "react";
import Image from "next/image";
import CarouselCategory from "../categorys/CarouselCategory";
export default function News() {
  const Brands = [
    {
      id: "67961f3a9",

      image: "/fashion/brands/1.png",
    },
    {
      id: "67961f3a9e073",

      image: "/fashion/brands/2.png",
    },
    {
      id: "67961f808c7e3dc3",

      image: "/fashion/brands/3.png",
    },
    {
      id: "67961f3a9e070e38083dc3",

      image: "/fashion/brands/4.png",
    },
  ];
  return (
    <div className="w-full max-w-screen-xl mx-auto py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-16">
        <CarouselCategory categories={Brands} />
      </div>
    </div>
  );
}
