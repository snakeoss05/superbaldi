"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SearchInput from "./SearchInput";
import dynamic from "next/dynamic";
import Image from "next/image";
import SideBar from "./SideBar";
const DropDown = dynamic(() => import("./DropDown"), { ssr: false });
import { toggleNotificationBar } from "@/lib/features/notifications/notificationSlice";
const NotificationBadge = dynamic(() => import("./NotificationBadge"), {
  ssr: false,
});

import TopBanner from "../topBanner/TopBanner";
import CartButton from "./CartButton";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const token = useAppSelector((state) => state.auth.token);

  const role = useAppSelector((state) => state.auth.user.role);

  const dispatch = useAppDispatch();
  const totalFinal = useAppSelector((state) => state.cart.totalFinal) || 0;
  const [clientTotal, setClientTotal] = useState(0);
  useEffect(() => {
    setClientTotal(totalFinal);
  }, [totalFinal]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-white   navbar top-0 border-b border-border transition-all duration-300 ease-in-out  ${
        isSticky ? "sticky shadow-md " : "relative"
      }`}
      style={{ zIndex: 99 }}>
      <TopBanner />
      <div className="mx-auto max-w-screen-xl px-4 ">
        <div className="grid grid-cols-4 sm:grid-cols-12 h-16 sm:h-28 items-center w-full justify-between">
          <div className="col-span-1 sm:col-span-3 hidden md:flex flex-col gap-2">
            <Link href="/" className="flex   text-teal-600">
              <span className="sr-only">Home</span>
              <Image
                src="/fashion/bacola-logo.avif"
                width={260}
                height={280}
                alt="logo"
                className="h-8 sm:h-10  w-auto"
              />
            </Link>
          </div>

          <div className=" col-span-6  hidden sm:block w-full  gap-4 ">
            <SearchInput />
          </div>
          <SideBar />
          <div className="col-span-1 flex items-start justify-center  sm:hidden ">
            <Link href="/" className="block text-teal-600">
              <span className="sr-only">Home</span>
              <Image
                src="/fashion/bacola-logo.avif"
                width={500}
                height={500}
                alt="logo"
                className="h-8 sm:h-10 w-auto"
              />
            </Link>
          </div>
          <div className=" flex items-center justify-end lg:w-auto gap-2 sm:gap-4 col-span-2 sm:col-span-3">
            <button
              onClick={() => dispatch(toggleNotificationBar())}
              className="relative p-2 text-gray-400 hidden hover:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <NotificationBadge />
            <DropDown />

            {clientTotal > 1 && (
              <span className="text-sm text-nowrap text-text-light font-semibold hidden sm:block">
                {clientTotal.toFixed(2)} TND
              </span>
            )}
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
}
