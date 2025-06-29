import Thumbnail from "./Thumbnail";

const Thumbnails = ({ images, colorName, fallbackImages, onClick }) => (
  <div className="absolute top-0 left-0 m-4 space-y-4">
    {images.map((image, index) => (
      <Thumbnail
        key={index}
        src={image || fallbackImages[index] || fallbackImages[0]}
        alt={`${colorName}`}
        onClick={() =>
          onClick(image || fallbackImages[index] || fallbackImages[0])
        }
      />
    ))}
  </div>
);

export default Thumbnails;
