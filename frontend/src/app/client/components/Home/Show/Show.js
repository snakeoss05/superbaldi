import React from "react";
import Image from "next/image";

export default function Show() {
  return (
    <div className="grid grid-cols-1 grid-rows-1  sm:grid-cols-8 gap-4 sm:grid-rows-2 h h-fit sm:h-[570px] my-16 w-full sm:max-w-screen-xl m-auto p-4">
      <div className="sm:col-span-3 sm:row-span-2 overflow-hidden">
        <div className="flex flex-col items-center justify-center text-center py-8 px-16 h-full   gap-4 bg-[#eeeff1]">
          <Image height={100} width={100} src="/images/intro/img1.png" alt="" />
          <p className="text-gray-700 text-2xl font-semibold">
            Save up to $600 on select Home Appliance.
          </p>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button className="text-[#2b4daa] font-[500] figtree bg-secondary text-sm px-4 py-2 rounded shadow transition duration-500 uppercase hover:bg-[#2b4daa] hover:text-white">
            clam promo
          </button>
        </div>
      </div>
      <div className="row-span-1 sm:col-span-2 sm:row-span-2 overflow-hidden">
        <div className="w-full h-full relative contain-image overflow-hidden">
          <Image
            width={500}
            height={500}
            src="/images/intro/img2.jpg"
            alt=""
            className="w-full h-full object-cover img-scale"
          />
          <div className="absolute top-0 left-0  w-full h-full  z-10 flex flex-col gap-4 bg-black/20 p-8 description">
            <p className="text-white text-xl">
              Enjoy sensational discounts of up to 50% this month only!
            </p>
            <p className="text-white text-sm">
              Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
            </p>
            <div>
              <button className="text-[#2b4daa] font-[500] bg-secondary text-sm px-4 py-2 rounded shadow transition duration-500 uppercase hover:bg-[#2b4daa] hover:text-white figtree">
                shop now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" sm:col-span-3 sm:row-span-1 space-y-4 overflow-hidden">
        <div className="h-full w-full flex flex-col items-center justify-center relative contain-image">
          <Image
            width={500}
            height={500}
            src="/images/intro/img3.jpg"
            className="h-full w-full  img-move"
            alt=""
          />
          <div className="absolute top-0 left-0  w-full h-full  z-10 flex flex-col  justify-center gap-4 bg-black/20 p-8 description">
            <p className="text-white text-xl w-1/2">
              Elevate your bathing experience
            </p>
            <div>
              <button className="text-[#2b4daa] font-[500] bg-secondary text-[13px] px-4  py-2 rounded shadow transition duration-500 uppercase hover:bg-[#2b4daa] hover:text-white figtree">
                shop now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" sm:col-span-3 sm:row-span-1 space-y-4 overflow-hidden ">
        <div className="h-full w-full flex flex-col items-center justify-center relative contain-image py-4">
          <Image
            height={500}
            width={500}
            src="/images/intro/img4.jpg"
            className="h-full w-full  img-move"
            alt=""
          />
          <div className="absolute top-0 left-0  w-full h-full  z-10 flex flex-col  justify-center gap-4 bg-black/20 p-8 description">
            <p className="text-white text-xl w-1/2">
              Elevate your bathing experience
            </p>
            <div>
              <button className="text-[#2b4daa] font-[500] bg-secondary text-[13px] px-4  py-2 rounded shadow transition duration-500 uppercase hover:bg-[#2b4daa] hover:text-white figtree">
                shop now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
