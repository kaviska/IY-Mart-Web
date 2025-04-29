"use client";
import Image from "next/image";
import CanImage from "@public/Can.svg";
import CloseImage from "@public/close.svg";
import { useState } from "react";

interface CartCardProps {
  product: {
    name: string;
    id: number;
    primary_image: string;
  };
  stockId: number;
  quantity: number;
  price: number;
  discount: number;
  onQuantityChange: (stockId: number, newQuantity: number) => void;
  onRemove: (stockId: number) => void;
}

export default function CartCard({
  product,
  stockId,
  quantity,
  price,
  discount,
  onQuantityChange,
  onRemove,
}: CartCardProps) {
  const discountedPrice = price - discount;
  const [cartQuantity, setCartQuantity] = useState<number>(Number(quantity));

  const increment = () => {
    const newQuantity = Number(cartQuantity) + 1;
    setCartQuantity(newQuantity);
    onQuantityChange(stockId, newQuantity);
  };

  const decrement = () => {
    if (cartQuantity > 1) {
      const newQuantity = Number(cartQuantity) - 1;
      setCartQuantity(newQuantity);
      onQuantityChange(stockId, newQuantity);
    }
  };

  return (
    <div className="border-b py-5 flex flex-wrap justify-between items-center gap-4">
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0">
        <img src={CanImage} alt={product.name} width={75} height={75} />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-[150px]">
        <h1 className="font-medium text-[16px] sm:text-[18px]">{product.name}</h1>
        <span className="font-medium text-[16px] sm:text-[18px]">
        ¥ {discountedPrice.toFixed(2)}
        </span>
        {discount > 0 && (
          <span className="text-[14px] sm:text-[16px] text-gray-500 line-through ml-2">
            ¥ {price.toFixed(2)}
          </span>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center sm:px-0 px-5">
        <div className="flex items-center">
          <button
            className="px-3 py-1 sm:px-5 sm:py-2 border cursor-pointer border-gray-300 rounded hover:bg-gray-200"
            onClick={decrement}
            disabled={cartQuantity <= 1}
          >
            -
          </button>
          <span className="px-3 py-1 sm:px-5 sm:py-2">{cartQuantity}</span>
          <button
            className="px-3 py-1 sm:px-5 sm:py-2 border cursor-pointer border-gray-300 rounded hover:bg-gray-200"
            onClick={increment}
          >
            +
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <div className="flex items-center  sm:px-0 px-4">
        <button onClick={() => onRemove(stockId)}>
          <img
            src={CloseImage}
            width={20}
            height={20}
            alt="Remove item"
            className="cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
}
