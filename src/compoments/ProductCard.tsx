"use client"
import Image from "next/image";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: string;
    discount?: number | string | null | undefined | boolean;
    imageUrl: string;
    
  };
  slug ?: string;
}

export default function ProductCard({ product, slug }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/shop/${slug}`);
  };

  return (
    <div
      className="cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col w-[230px] min-h-[350px] max-h-[400px] gap-0 py-4 bg-[#F6F6F6] items-center rounded-[10px] relative">
        <div
          className="self-end mx-4 mb-3 cursor-pointer"
          onClick={(event) => {
            event.stopPropagation(); // ✅ Prevent card click
            setIsFavorited(!isFavorited);
          }}
        >
          {isFavorited ? (
            <FavoriteIcon className="text-[24px] text-red-500 hover:scale-110 transition-transform" />
          ) : (
            <FavoriteBorderOutlinedIcon className="text-[24px] text-gray-500 hover:text-red-500 hover:scale-110 transition-transform" />
          )}
        </div>

      
          <div className="absolute top-3 left-2 bg-green-500 text-white text-[12px] px-2 py-1 rounded-full">
            In Stock
          </div>
      

        <img
          src={'https://apivtwo.iymart.jp/'+product.imageUrl}
          alt="product-image"
          className="mb-3 w-40 h-40 object-cover"
        />

        <h4 className="text-[14px] primary">{product.name}</h4>

        {product.discount ? (
          <div className="flex flex-row items-center gap-3">
            <div className='flex gap-3'>
              <p className="text-[16px] line-through text-gray-400 ">
                ¥ {product.price}
              </p>
              <p className="text-red-500">
                {product.discount}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-[16px] text-black">¥ {product.price}</p>
        )}

        <button
          className="flex text-[14px] cursor-pointer justify-center mt-3 px-6 py-2 rounded-[10px] bg-primary text-white"
          onClick={handleCardClick}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
