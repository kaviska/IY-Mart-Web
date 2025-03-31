"use client"
import Hero from "@/compoments/Hero";
import Image from "next/image";
import scheduleImage from "@public/schedule.svg";
import BestSellers from "@/compoments/BestSellers";
import ProductCard from "@/compoments/ProductCard";
import {useEffect, useState} from "react";
import { fetchDataJson } from "@/lib/fetch";
import { ProductType } from "@/types/type";
import calculatePrice from "@/lib/priceCalcuator";




export default function Home() {
  const [newlyArriveProducts, setNewlyArriveProducts] = useState<ProductType[]>([]);
  
  const [activeTab, setActiveTab] = useState<"newArrival" | "featured">("newArrival");

  const [bestSellers, setBestSellers] = useState<ProductType[]>([]);

  useEffect(()=>{
    
    const getProductsNewlyArrived = async () => {
      const res = await fetchDataJson<{ data: ProductType[] }>('products?newly_arrived=1&with=all');
      setNewlyArriveProducts(res.data);
      console.log("Newly Arrived Products "+ newlyArriveProducts)




    }
    const getProductsBestSellers = async () => {
      const res = await fetchDataJson<{ data: ProductType[] }>('products?with=all&best_seller=1');
      setBestSellers(res.data);
      console.log("Best Selling Products "+ bestSellers)

    }
    getProductsBestSellers();
    getProductsNewlyArrived();


  },[])
  return (
    <div>
      <Hero></Hero>

      <div className="md:flex hidden gap-40 bg-primary justify-center h-[90px] items-center">
        <div className="flex gap-3">
          <Image src={scheduleImage} width={20} height={20} alt="icon"></Image>
          <span className="text-white text-[16px]">
            Deliver Within 78 Hours
          </span>
        </div>

        <div className="flex gap-3">
          <Image src={scheduleImage} width={20} height={20} alt="icon"></Image>
          <span className="text-white text-[16px]">
            Deliver Within 78 Hours
          </span>
        </div>

        <div className="flex gap-3">
          <Image src={scheduleImage} width={20} height={20} alt="icon"></Image>
          <span className="text-white text-[16px]">
            Deliver Within 78 Hours
          </span>
        </div>

        <div className="flex gap-3">
          <Image src={scheduleImage} width={20} height={20} alt="icon"></Image>
          <span className="text-white text-[16px]">
            Deliver Within 78 Hours
          </span>
        </div>
      </div>

      <BestSellers></BestSellers>

      <div className="mt-20  px-20">
  <div className="flex flex-col ">
    {/* Topic Section */}
    <div className="flex gap-5 mb-8 text-[18px] topic w-fit">
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
        activeTab === "featured" ? "primary underline" : "text-[#8B8B8B]"
      }`}
      onClick={() => setActiveTab("featured")}
      >
      Featured Products
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
        <a href={`/shop/${product.slug}`} key={product.id}>
        <ProductCard
        key={product.id}
        product={{
          id: product.id,
          discount: product.stocks?.[0]?.web_discount || 0, // Fallback to 0 if undefined
          name: product.name,
          price: calculatePrice(product.stocks) || '0', // Fallback to 0 if undefined
          imageUrl: "./sauce.svg", // Assuming you have a default image for now
        }}
        />
      </a>

      ))}
    </div>

    <div
      className={`flex flex-wrap gap-7 justify-center transition-all duration-500 ${
      activeTab === "featured" ? "opacity-100" : "opacity-0"
      }`}
    >
      {activeTab === "featured" &&
      bestSellers.slice(0, 12).map((product) => (
        <a href={`/shop/${product.slug}`} key={product.id}>

        <ProductCard
        key={product.id}
        product={{
          id: product.id,
          name: product.name,
          price: calculatePrice(product.stocks) || '0', // Fallback to 0 if undefined
          imageUrl: "./sauce.svg", // Assuming you have a default image for now
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
