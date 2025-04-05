import Image from "next/image";
import WishListImage from "@public/wishlist.svg";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: string;
    discount ?: number;
    imageUrl: string;
  };
}

export default function ProductCard({product}:ProductCardProps) {
  return (
    <div className="">
      <div className="flex flex-col w-[230px] min-h-[400px] max-h-[400px] gap-0 py-4  bg-[#F6F6F6] items-center rounded-[10px]">
        <Image
          src={WishListImage}
          alt="wishlist-icon"
          className=" self-end mx-4 mb-3 "
        />

        <Image
          src={product.imageUrl}
          alt="product-image"
          width={180}
          height={180}
          className="mb-3"
        ></Image>
        <h4 className="text-[14px] primary">{product.name}</h4>
        {product.discount ? (
          <div className="flex flex-row items-center gap-3">
            <p className="text-[16px] line-through text-gray-500 ">Rs. {product.price}</p>
            {/* <p className="text-[16px] text-red-500 font-bold">
              Rs. {(product.price - (product.discount) ).toFixed(2)}
            </p> */}
          
          </div>
        ) : (
          <p className="text-[16px] text-black">Rs. {product.price}</p>
        )}
        <button className="flex text-[14px] cursor-pointer justify-center mt-3 px-6 py-2 rounded-[10px] bg-primary text-white">
          Buy Now
        </button>
      </div>
    </div>
  );
}
