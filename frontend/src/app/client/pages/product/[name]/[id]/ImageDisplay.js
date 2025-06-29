import React from "react";
import MainImageDisplay from "./MainImageDisplay";
import Thumbnails from "./Thumbnails";

const ImageDisplay = ({ selectedColor, mainImage, setMainImage, product }) => {
  const fallbackImages = product.colors[0]?.images || [];

  if (!selectedColor?.images?.length) {
    return <p>No image available for selected color.</p>;
  }

  return (
    <div className="flex flex-col justify-start gap-4 overflow-y-auto">
      <div
        key={selectedColor._id}
        className="flex justify-start items-center relative h-[800px]">
        <MainImageDisplay mainImage={mainImage} alt={selectedColor.colorName} />
        <Thumbnails
          images={selectedColor.images}
          colorName={selectedColor.colorName}
          fallbackImages={fallbackImages}
          onClick={setMainImage}
        />
      </div>
    </div>
  );
};
export default ImageDisplay;
