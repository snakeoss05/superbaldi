import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function ProductCart({
  item,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItem,
  setItemQuantity,
}) {
  const dispatch = useDispatch();
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      dispatch(setItemQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  return (
    <tr className="border-b border-border ">
      <td className="p-2 flex flex-col sm:flex-row items-center gap-2 ">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="object-contain rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium ">{item.name}</h3>
        </div>
      </td>
      <td className="text-center p-2 text-danger ">{item.price} DT</td>
      <td className="text-center p-2 ">
        <div className="flex w-full sm:w-fit  mx-auto text-sm sm:text-lg justify-between items-center px-2 sm:px-3 py-2 bg-info-light border border-border  gap-6 rounded-lg">
          <button onClick={decreaseItemQuantity}>-</button>
          <input
            type="string"
            className="text-sm text-center w-16 bg-transparent  focus:outline-none"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
          />
          <button onClick={increaseItemQuantity}>+</button>
        </div>
      </td>
      <td>
        <div className="flex justify-center items-center p-2">
          <button
            onClick={removeItem}
            className="text-red text-sm hidden sm:block font-medium">
            Remove
          </button>
          <svg
            className="w-6 h-6 text-red-500 sm:hidden"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <circle
                opacity="0.5"
                cx={12}
                cy={12}
                r={10}
                stroke="#d6000b"
                strokeWidth="1.5"
              />{" "}
              <path
                d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                stroke="#d6000b"
                strokeWidth="1.5"
                strokeLinecap="round"
              />{" "}
            </g>
          </svg>
        </div>
      </td>
    </tr>
  );
}
