import React from "react";

export default function Price({ product }) {
  function calculateDiscount(price, discount) {
    const priceAfterDiscount = price - (price * discount) / 100;
    return priceAfterDiscount.toFixed(2);
  }

  const originalPrice = product.prix_passager; ;
  const discountedPrice =
    product.discount > 0
      ? calculateDiscount(originalPrice, product.discount)
      : null;

  return (
    <div className="flex flex-col sm:flex-row justify-start text-xs sm:text-sm sm:items-center gap-1 sm:gap-4">
      <p
        className={`text-nowrap font-semibold ${
          product.discount > 0 ? "line-through text-info" : "text-danger"
        }`}>
        {originalPrice} DT
      </p>

      {discountedPrice && (
        <span className="text-nowrap text-danger font-semibold">
          {discountedPrice} DT
        </span>
      )}
    </div>
  );
}
