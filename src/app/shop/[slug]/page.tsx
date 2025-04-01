"use client";
import TruckImage from "@public/Truck.svg";
import ShopImage from "@public/Shop.svg";
import CanImage from "@public/Can.svg";
import DownArrowImage from "@public/DownArrow.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchDataJson } from "@/lib/fetch";
import type { ProductType } from "@/types/type";
import Slider from "@/compoments/SliderProduct";

export default function SingleProductPage() {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const [quantity, setQuantity] = useState<number>(1); // State for quantity
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false); // State for toggling description

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const slug = window.location.pathname.split("/").pop();
        console.log(slug);
        const productResult = await fetchDataJson<{ data: ProductType[] }>(`products?slug=${slug}`, { method: "GET" });
        console.log("Product List", productResult);
        setProduct(productResult.data[0]);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Runs only once when the component mounts

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return; // Ensure product is loaded before fetching related products

      try {
        const relatedProductsResult = await fetchDataJson<{ data: ProductType[] }>(`products`, { method: "GET" });
        console.log("Related Products List", relatedProductsResult);
        setRelatedProducts(relatedProductsResult.data);
      } catch (error) {
        console.log("Error fetching related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [product]); // Runs whenever `product` changes

  const handleQuantityChange = (value: number) => {
    if (value < 1) return; // Prevent quantity from going below 1
    setQuantity(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="">
      <div className="flex md:flex-row flex-col container mx-auto md:px-0 px-3">
        <div className="md:w-[50%] flex md:flex-row flex-col gap-10 cursor-pointer">
          <Image src={CanImage} alt="can" width={100} height={100} className="md:self-start md:order-1 order-2 self-center"></Image>
          <Image src={CanImage} alt="can" width={400} height={400} className="md:order-2 order-1"></Image>
        </div>
        <div className="md:w-[50%]">
          <h1 className="md:text-[40px] text-[34px] font-bold order-1">{product?.name || "Loading..."}</h1>
          <span className="md:text-[32px] text-[28px] mt-5">Rs.124.00</span>

          <div className="flex gap-8 mt-10">
            <div className="flex gap-3">
              <div className="bg-primary px-2 py-3 rounded-[11px]">
                <Image src={TruckImage} alt="truck" width={20} height={20}></Image>
              </div>
              <div className="text-[14px] flex flex-col gap-0">
                <span className="text-[#A4A4A4]">Free Delivery</span>
                <span>1-2 Day</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-primary px-2 py-3 rounded-[11px]">
                <Image src={ShopImage} alt="shop" width={20} height={20}></Image>
              </div>
              <div className="text-[14px] flex flex-col gap-0">
                <span className="text-[#A4A4A4]">Free Delivery</span>
                <span>1-2 Day</span>
              </div>
            </div>
          </div>

          <div className="mt-7 bg-[#D9D9D9] md:w-[30%] w-full px-2 py-1 flex justify-between items-center shadow-md">
            <button
              className="w-10 cursor-pointer h-10 flex justify-center items-center text-[16px] primary hover:bg-gray-400 active:bg-gray-500 rounded-full transition duration-200"
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              -
            </button>
            <input
              type="number"
              className="w-12 text-center border-none bg-transparent outline-none text-[16px] font-medium"
              value={quantity}
              onChange={handleInputChange}
            />
            <button
              className="w-10 cursor-pointer h-10 flex justify-center items-center text-[16px] primary hover:bg-gray-400 active:bg-gray-500 rounded-full transition duration-200"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>

          <div className="flex md:flex-row flex-col mt-7 md:gap-12 gap-5">
            <button className="border cursor-pointer border-[#27AE60] primary text-[16px] px-16 py-2">
              Add to Cart
            </button>
            <button className="bg-secondary cursor-pointer text-white text-[16px] px-16 py-2">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#FAFAFA] px-20 py-0 mt-10">
        <div className="bg-white p-10">
          <h3 className="text-[24px]">Details</h3>
          <p className="text-[#9D9D9D] text-[14px] mt-5">
            {product?.description
              ? showFullDescription
                ? product.description
                : product.description.split(" ").slice(0, 60).join(" ") + "..."
              : "Loading..."}
          </p>
          {product?.description && product.description.split(" ").length > 60 && (
            <div className="flex justify-center mt-10">
              <button
                className="text-[16px] px-16 py-2 border border-black flex justify-center gap-3"
                onClick={toggleDescription}
              >
                {showFullDescription ? "View Less" : "View More"}
                <Image src={DownArrowImage} width={15} height={15} alt="arrow"></Image>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 container mx-auto">
        <h3 className="text-[24px]">Related Products</h3>
        <div className="flex justify-between flex-wrap mt-5">
          <Slider ProductArray={relatedProducts} sliderPerView={4} />
        </div>
      </div>
    </div>
  );
}