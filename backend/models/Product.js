import mongoose from "mongoose";
import { nanoid } from "nanoid";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      default: () => nanoid(4),
      unique: true, // `index: { unique: true }` is redundant
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    lowStockThreshold: {
      type: Number,
      required: true,
      default: 5,
    },

    description: {
      type: String,
      default: "",
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    price: { type: Number, required: true, min: 0 },
    colors: [
      {
        colorName: { type: String, required: true }, // e.g., "Red", "Blue"
        code: { type: String, required: true }, // e.g., "#FF0000", "#0000FF"
        images: [{ type: String, required: true }], // Array of image URLs
      },
    ],

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0, // Prevents negative stock
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
