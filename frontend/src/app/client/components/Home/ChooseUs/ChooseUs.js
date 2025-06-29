"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function ChooseUs() {
  const router = useRouter();
  return (
    <div className="mx-auto py-4 max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div className="relative rounded-xl overflow-hidden h-[354px]">
        <Image
          src="/fashion/news/1.webp"
          alt="img1"
          width={650}
          height={350}
          className="object-cover absolute h-full w-full left-0 top-0 hover:scale-110 transition duration-500"
        />
        <div className="flex flex-col items-center justify-center gap-4 h-full">
          <p className="text-white text-3xl font-semibold text-center capitalize relative">
            مايسترو باشن <br />
            شغف جديد في كل لقمة
          </p>

          <button
            onClick={() => router.push("/client/products/brand=MAESTRO")}
            className="text-white font-[500] text-sm px-4 py-2 duration-500 overflow-hidden uppercase relative after:ease after:transition-all after:duration-300 after: after:content[''] after:border after:border-b-1 after:border-gray-300 after:absolute after:bottom-0 after:left-0 after:w-14 hover:after:w-full">
            تسوّق الآن
          </button>
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden h-[354px]">
        <Image
          src="/fashion/news/2.webp"
          alt="img1"
          width={650}
          height={350}
          className="object-cover absolute h-full w-full left-0 top-0 hover:scale-110 transition duration-500"
        />
        <div className="flex flex-col items-center justify-center gap-4 h-full">
          <p className="text-white text-3xl font-semibold text-center capitalize relative">
            مايسترو كلوب <br />
            أفخم أنواع الشوكولاتة
          </p>

          <button className="text-white font-[500] text-sm px-4 py-2 duration-500 overflow-hidden uppercase relative after:ease after:transition-all after:duration-300 after: after:content[''] after:border after:border-b-1 after:border-gray-300 after:absolute after:bottom-0 after:left-0 after:w-14 hover:after:w-full">
            تسوّق الآن
          </button>
        </div>
      </div>
    </div>
  );
}
