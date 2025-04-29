"use client";
import Hero from "@/compoments/Hero";
import Image from "next/image";
import scheduleImage from "@public/schedule.svg";
import BestSellers from "@/compoments/BestSellers";
import ProductCard from "@/compoments/ProductCard";
import { useEffect, useState } from "react";
import { fetchDataJson } from "@/lib/fetch";
import { ProductType } from "@/types/type";
import calculatePrice from "@/lib/priceCalcuator";
import discountCalcuator from "@/lib/discountCalcuator";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function Home() {
  const [newlyArriveProducts, setNewlyArriveProducts] = useState<ProductType[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<ProductType[]>([]);
  const [activeTab, setActiveTab] = useState<"newArrival" | "discounted">("newArrival");

  useEffect(() => {
    const getProductsNewlyArrived = async () => {
      const res = await fetchDataJson<{ data: ProductType[] }>("products?newly_arrived=1&with=all");
      setNewlyArriveProducts(res.data);
      console.log("Newly Arrived Products " + newlyArriveProducts);
    };

    const getDiscountedProducts = async () => {
      const res = await fetchDataJson<{ data: ProductType[] }>("products?has_web_discount=1&with=all");
      setDiscountedProducts(res.data);
      console.log("Discounted Products " + discountedProducts);
    };

    getProductsNewlyArrived();
    getDiscountedProducts();
  }, []);

  return (
    <div>
      <Hero></Hero>

      <div className="md:flex hidden md:gap-48 gap-0 bg-primary h-[90px] items-center md:justify-center">
        <div className="flex justify-center items-center gap-16">
          <div className="flex gap-3">
            <LocalShippingIcon className="text-white mt-1" fontSize="small" />
            <span className="text-white text-[16px]">Fast Delivery</span>
          </div>

          <div className="flex gap-3">
            <RestaurantIcon className="text-white mt-1" fontSize="small" />
            <span className="text-white text-[16px]">Quality Food</span>
          </div>

          <div className="flex gap-3">
            <EmojiFoodBeverageIcon className="text-white mt-1" fontSize="small" />
            <span className="text-white text-[16px]">Srilankan Taste</span>
          </div>

          <div className="flex gap-3">
            <SupportAgentIcon className="text-white mt-1" fontSize="small" />
            <span className="text-white text-[16px]">24Hrs Customer Support</span>
          </div>

          <div className="flex gap-3">
            <AccessTimeIcon className="text-white mt-1" fontSize="small" />
            <span className="text-white text-[16px]">Deliver Within 78 Hours</span>
          </div>
        </div>
      </div>

      <BestSellers></BestSellers>

      <div className="mt-20 md:px-20 px-6">
        <div className="flex flex-col">
          {/* Topic Section */}
          <div className="flex gap-5 mb-8 text-[16px] md:text-[18px] topic md:w-fit">
            <h2
              className={`cursor-pointer ${
                activeTab === "newArrival" ? "primary underline" : "text-[#8B8B8B]"
              }`}
              onClick={() => setActiveTab("newArrival")}
            >
              New Arrival
            </h2>
            <h2
              className={`cursor-pointer ${
                activeTab === "discounted" ? "primary underline" : "text-[#8B8B8B]"
              }`}
              onClick={() => setActiveTab("discounted")}
            >
              Discounted Items
            </h2>
          </div>

          {/* Product Cards Section */}
          <div
            className={`flex flex-wrap gap-7 justify-center transition-all duration-500 ${
              activeTab === "newArrival" ? "opacity-100" : "opacity-0"
            }`}
          >
            {activeTab === "newArrival" &&
              newlyArriveProducts.slice(0, 12).map((product) => (
                <ProductCard
                  key={product.id}
                  slug={product.slug}
                  product={{
                    id: product.id,
                    discount: discountCalcuator(product.stocks) || null,
                    name: product.name,
                    price: calculatePrice(product.stocks) || "0",
                    imageUrl: product.primary_image,
                  }}
                />
              ))}
          </div>

          <div
            className={`flex flex-wrap gap-7 justify-center transition-all duration-500 ${
              activeTab === "discounted" ? "opacity-100" : "opacity-0"
            }`}
          >
            {activeTab === "discounted" &&
              discountedProducts.slice(0, 12).map((product) => (
                <a href={`/shop/${product.slug}`} key={product.id}>
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      name: product.name,
                      price: calculatePrice(product.stocks) || "0",
                      imageUrl: product.primary_image,
                      discount: discountCalcuator(product.stocks) || null,
                    }}
                  />
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}