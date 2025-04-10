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

  // const toggleFavorite = () => {
  //   setIsFavorited(!isFavorited);
  // };

  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/shop/${slug}`);
  };

  return (
    <div
      className="cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col w-[230px] min-h-[400px] max-h-[400px] gap-0 py-4 bg-[#F6F6F6] items-center rounded-[10px]">
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

        <Image
          src={'https://iymart.jp/'+product.imageUrl}
          alt="product-image"
          width={180}
          height={180}
          className="mb-3"
        />

        <h4 className="text-[14px] primary">{product.name}</h4>

        {product.discount ? (
          <div className="flex flex-row items-center gap-3">
            <div  className='flex gap-3'>
            <p className="text-[16px] line-through text-gray-400 ">
              Rs. {product.price}
            </p>
            <p className="text-red-500">
              {product.discount}
            </p>
            </div>
           
          </div>
        ) : (
          <p className="text-[16px] text-black">Rs. {product.price}</p>
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
