import Image from "next/image";
import CanImage from "@public/Can.svg";
import CloseImage from "@public/close.svg";

interface CartCardProps {
  product: {
    name: string;
    id: number;
    primary_image: string;
  };
  quantity: number;
  price: number;
  discount: number;
  onQuantityChange: (newQuantity: number) => void;
  onRemove: () => void;
}

export default function CartCard({
  product,
  quantity,
  price,
  discount,
  onQuantityChange,
  onRemove,
}: CartCardProps) {
  const discountedPrice = price - discount;

  return (
    <div className="border-b py-5 flex flex-wrap justify-between items-center">
      {/* Product Image */}
      <div>
        <Image
          src={product.primary_image || CanImage}
          alt={product.name}
          width={75}
          height={75}
        />
      </div>

      {/* Product Details */}
      <div className="mt-2 max-w-[40%]">
        <h1 className="font-medium text-[18px]">{product.name}</h1>
        <span className="text-[14px] mt-3">#{product.id}</span>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center">
        <div className="flex w-[30%] px-4 items-center">
          <button
            className="px-5 py-2 border border-gray-300 rounded hover:bg-gray-200"
            onClick={() => onQuantityChange(quantity - 1)}
          >
            -
          </button>
          <span className="px-5 py-2">{quantity}</span>
          <button
            className="px-5 py-2 border border-gray-300 rounded hover:bg-gray-200"
            onClick={() => onQuantityChange(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Price Section */}
      <div className="flex items-center">
        <span className="font-medium text-[18px]">
          RS {discountedPrice.toFixed(2)}
        </span>
        {discount > 0 && (
          <span className="text-[14px] text-gray-500 line-through ml-2">
            RS {price.toFixed(2)}
          </span>
        )}
      </div>

      {/* Remove Button */}
      <div className="flex items-center">
        <button onClick={onRemove}>
          <Image
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