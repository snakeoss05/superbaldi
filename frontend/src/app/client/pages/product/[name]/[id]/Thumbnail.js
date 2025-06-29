import React from "react";
import Image from "next/image";

const Thumbnail = ({ src, alt, onClick }) => (
  <Image
    src={src}
    alt={alt}
    width={500}
    height={500}
    onClick={onClick}
    className="rounded-xl border-[#1f1f1f] border-2 h-[130px] w-[100px] object-cover z-50"
  />
);

export default Thumbnail;
