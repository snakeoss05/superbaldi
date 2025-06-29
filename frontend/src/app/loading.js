import React from "react";
import Image from "next/image";
export default function Loading() {
  return (
    <div className="flex space-x-2 justify-center h-screen items-center dark:invert">
      <Image
        src="/fashion/bacola-logo.avif"
        width={260}
        height={280}
        alt="logo"
        className="h-16 sm:h-30 w-auto animate-pulse"
      />
    </div>
  );
}
