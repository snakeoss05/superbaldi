"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ColorOptions from "./ColorOptions";
import Image from "next/image";

const Product = () => {
  const [product, setProduct] = useState({
    productName: "",
    brandName: "",
    category: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
    colors: [],
  });
  const [variant, setVariant] = useState({ key: "", value: "" });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [SelectedparentCategory, setSelectedParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [colorInput, setColorInput] = useState(null);
  const [parentCategoryslist, setParentCategoryslist] = useState([]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addVariant = () => {
    if (variant.variantName && variant.variantValue) {
      setProduct({ ...product, variants: [...product.variants, variant] });
      setVariant({ key: "", value: "" });
    }
  };

  const removeVariant = (index) => {
    const updatedVariants = product.variants.filter((_, i) => i !== index);
    setProduct({ ...product, variants: updatedVariants });
  };
  const addColor = () => {
    setProduct((prevForm) => ({
      ...prevForm,
      colors: [...prevForm.colors, { ...colorInput, images: [] }],
    }));
    setColorInput("");
  };
  const handleColorImageUpload = (colorIndex, files) => {
    const updatedColors = [...product.colors];
    updatedColors[colorIndex].images = Array.from(files); // Ensure it's an array
    setProduct({ ...product, colors: updatedColors });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    // Append all other fields normally
    Object.entries(product).forEach(([key, value]) => {
      if (key !== "colors") {
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(`${key}[]`, item)); // Correctly append arrays
        } else {
          formData.append(
            key,
            typeof value === "string" ? value : JSON.stringify(value)
          );
        }
      }
    });

    // Filter out colors with invalid data before appending
    const validColors = product.colors.filter(
      (color) => color.colorName && color.images && color.images.length > 0
    );
    validColors.forEach((color) => {
      color.images.forEach((imageFile) => {
        formData.append(`colors[${color.colorName}]`, imageFile);
      });
    });

    // Append colors as JSON string (only once)
    formData.append("colors", JSON.stringify(validColors));

    try {
      const response = await axios.post(
        `https://superbaldi-production.up.railway.app/api/products`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Product added successfully!");
      } else {
        toast.error("Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding product");
    }
  };

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://superbaldi-production.up.railway.app/api/categories"
        );
        setCategories(response.data.data);
        const parentCategorys = response.data.data.filter(
          (category) => !category.parentCategory
        );
        setParentCategoryslist(parentCategorys);
      } catch (error) {}
    };

    fetchCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto  p-4 " dir="ltr">
      <h2 className="text-2xl font-semibold capitalize mb-6">
        Ajouter un nouveau produit
      </h2>
      <form className="space-y-4 capitalize" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-white p-6 border rounded-lg">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="relative dropdown sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={product.category}
              name="category"
              onChange={handleChange}
              className="px-3 w-full mt-1 py-2  border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Category</option>
              {parentCategoryslist.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2  ">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className=" h-28 w-full p-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="sm:col-span-2 space-y-4 mt-1">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                nom de la marque
              </label>
              <input
                type="text"
                name="brandName"
                value={product.brandName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div className=" grid grid-cols-2 gap-4">
              <div>
                <label className="block  text-sm font-medium text-gray-700 ">
                  stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Discount
                </label>
                <input
                  type="number"
                  name="discount"
                  value={product.discount}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-2xl font-semibold capitalize">Section des prix </p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-white p-4 rounded-lg border ">
            <div>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                prix de vente
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div className="space-y-4  ">
            <p className="text-2xl font-semibold capitalize">
              Section des images
            </p>
            <div className=" sm:col-span-2 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <ColorOptions
                  setColorInput={setColorInput}
                  colorInput={colorInput}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={addColor}
              className="px-4 py-2 h-fit bg-blue-500 text-white  border-0 p-0 rounded-md hover:bg-blue-600">
              Add
            </button>
            <div className="p-4 bg-gray-100 rounded-lg shadow-md col-span-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Product Colors
              </h2>

              {product.colors.map((color, index) => (
                <div key={index} className="flex flex-col  gap-4">
                  <div className="flex flex-row items-center gap-4">
                    <span
                      className="w-6 h-6 rounded-full shadow"
                      style={{ backgroundColor: color.code }}></span>
                    <span className="text-gray-700">{color.colorName}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updatedColors = product.colors.filter(
                          (c, i) => i !== index
                        );
                        setProduct((prevForm) => ({
                          ...prevForm,
                          colors: updatedColors,
                        }));
                      }}
                      className="text-red-500 hover:text-red-700">
                      Remove
                    </button>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    id={`color-image-${index}`}
                    multiple
                    onChange={(e) =>
                      handleColorImageUpload(index, e.target.files)
                    }
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <div className="flex gap-2 mt-2">
                    {color.images?.map((image, imgIndex) => (
                      <Image
                        key={imgIndex}
                        src={URL.createObjectURL(image)}
                        alt={`${color.colorName}-${imgIndex}`}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sm:col-span-4 flex justify-center">
          <button
            type="submit"
            className="block  mx-auto  w-full mt-4 justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            {loading ? "Loading..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Product;
