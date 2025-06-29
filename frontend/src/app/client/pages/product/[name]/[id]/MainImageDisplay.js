import Image from "next/image";

const MainImageDisplay = ({ mainImage, alt }) => (
  <Image
    src={mainImage}
    alt={alt}
    width={600}
    height={800}
    className="rounded-xl  h-auto w-[400px] sm:w-[500px] object-cover"
    loader={({ src }) => `${src}?auto=format&fit=crop&quality=100`}
  />
);

export default MainImageDisplay;
