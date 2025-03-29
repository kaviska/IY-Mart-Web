import SauceImage from "@public/sauce.svg";
import Image from "next/image";
import WishListImage from "@public/wishlist.svg";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export default function ProductCard({product}:ProductCardProps) {
  return (
    <div className="">
      <div className="flex flex-col w-[230px] gap-0 py-4  bg-[#F6F6F6] items-center rounded-[10px]">
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
        <p className="text-[16px]">Rs. {product.price}</p>
        <button className="flex text-[14px] justify-center mt-3 px-6 py-2 rounded-[10px] bg-primary text-white">
          Buy Now
        </button>
      </div>
    </div>
  );
}
