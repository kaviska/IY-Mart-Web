"use client";
import TruckImage from "@public/Truck.svg";
import ShopImage from "@public/Shop.svg";
import CanImage from "@public/Can.svg";
import DownArrowImage from "@public/DownArrow.svg";
import ProductCard from "@/compoments/ProductCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchDataJson } from "@/lib/fetch";
import type { ProductType } from "@/types/type";
import calculatePrice from "@/lib/priceCalcuator";
import Slider from "@/compoments/SliderProduct";

export default function SingleProductPage() {
    const [product, setProduct] = useState<ProductType | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);

    useEffect(() => {
      const fetchProducts = async () => {
          try {
              const slug = window.location.pathname.split("/").pop();
              console.log(slug);
              const productResult = await fetchDataJson(`products?slug=${slug}`, { method: "GET" });
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
             // const relatedProductsResult = await fetchDataJson(`products?category_id=${product.category_id}`, { method: "GET" });
              const relatedProductsResult = await fetchDataJson(`products`, { method: "GET" });

              console.log("Related Products List", relatedProductsResult);

              setRelatedProducts(relatedProductsResult.data);
          } catch (error) {
              console.log("Error fetching related products:", error);
          }
      };
  
      fetchRelatedProducts();
  }, [product]); // Runs whenever `product` changes

    return (
        <div className="">
            <div className="flex container mx-auto">
                <div className="w-[50%] flex gap-10">
                    <Image src={CanImage} alt="can" width={100} height={100} className="self-start"></Image>
                    <Image src={CanImage} alt="can" width={400} height={400}></Image>
                </div>
                <div className="w-[50%]">
                    <h1 className="text-[40px] font-bold ">
                        {product?.name || "Loading..."}
                    </h1>
                    <span className="text-[32px] mt-5">Rs.124.00</span>

                    <div className="flex gap-8 mt-18">
                        <div className="flex gap-3">
                            <div className="bg-primary px-2 py-3 rounded-[11px]">
                                <Image
                                    src={TruckImage}
                                    alt="truck"
                                    width={20}
                                    height={20}
                                ></Image>
                            </div>
                            <div className="text-[14px] flex flex-col gap-0">
                                <span className="text-[#A4A4A4]">Free Delivery</span>
                                <span>1-2 Day</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="bg-primary px-2 py-3 rounded-[11px]">
                                <Image
                                    src={ShopImage}
                                    alt="shop"
                                    width={20}
                                    height={20}
                                ></Image>
                            </div>
                            <div className="text-[14px] flex flex-col gap-0">
                                <span className="text-[#A4A4A4]">Free Delivery</span>
                                <span>1-2 Day</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-7 bg-[#D9D9D9] w-[30%] px-4">
                        <button className="px-5 py-2 secondary">-</button>
                        <span className="px-5 py-2">1</span>
                        <button className="px-5 py-2 secondary">+</button>
                    </div>

                    <div className="flex mt-7 gap-12">
                        <button className="border border-[#27AE60] primary text-[16px] px-16 py-2">
                            Add to Cart
                        </button>
                        <button className="bg-secondary text-white text-[16px] px-16 py-2">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-[#FAFAFA] px-20 py-0 mt-10">
                <div className="bg-white p-10">
                    <h3 className="text-[24px]">Details</h3>
                    <p className="text-[#9D9D9D] text-[14px] mt-5">
                        {product?.description || "Loading..."}
                    </p>
                    <div className="flex justify-center mt-10">
                        <button className="text-[16px] px-16 py-2 border border-black flex justify-center gap-3">
                            View More
                            <Image
                                src={DownArrowImage}
                                width={15}
                                height={15}
                                alt="arrow"
                            ></Image>
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-10 container mx-auto">
                <h3 className="text-[24px]">Related Products</h3>
                <div className="flex justify-between flex-wrap mt-5">
                    {/* Add related products here */}
                    <Slider 
  ProductArray={relatedProducts} 
  sliderPerView={4} 
 
/>

                </div>
            </div>
        </div>
    );
}