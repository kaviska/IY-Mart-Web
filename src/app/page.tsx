"use client";
import Hero from "@/compoments/Hero";
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
import SliderProduct from "@/compoments/SliderProduct";
import SpaIcon from '@mui/icons-material/Spa';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import FastfoodIcon from '@mui/icons-material/Fastfood';


export default function Home() {
  const [newlyArriveProducts, setNewlyArriveProducts] = useState<ProductType[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<ProductType[]>([]);
  const [meatProducts, setMeatProducts] = useState<ProductType[]>([]);
  const [spicesProducts, setSpicesProducts] = useState<ProductType[]>([]);
  const [riceProducts, setRiceProducts] = useState<ProductType[]>([]);
  const [activeTab, setActiveTab] = useState<"newArrival" | "discounted">("newArrival");

  useEffect(() => {
    const getProductsNewlyArrived = async () => {
      const res = await fetchDataJson<{ data: ProductType[] }>("products?newly_arrived=1&with=all");
      setNewlyArriveProducts(res.data);
    };

    const getDiscountedProducts = async () => {
      const res = await fetchDataJson<{ data: ProductType[] }>("products?has_web_discount=1&with=all");
      setDiscountedProducts(res.data);
    };

    const fetchCategoryProducts = async (category: string, setter: (products: ProductType[]) => void) => {
      const res = await fetchDataJson<{ data: ProductType[] }>(
        `products?search=${category}&with=all`
      );
      setter(res.data);
    };

    getProductsNewlyArrived();
    getDiscountedProducts();
    fetchCategoryProducts("juice", setMeatProducts);
    fetchCategoryProducts("spices", setSpicesProducts);
    fetchCategoryProducts("rice", setRiceProducts);
  }, []);

  return (
    <div>
      <Hero />

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

      <BestSellers />

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


     
{/* What We Sell Section */}
<div className="mt-20 bg-gradient-to-r from-green-400 to-blue-500 py-10 text-white">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center mb-8">What We Sell</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Fruits & Vegetables */}
      <div className="text-center">
        <div className="flex justify-center items-center w-16 h-16 bg-white rounded-full mx-auto mb-4">
          <SpaIcon className="text-green-500" fontSize="large" />
        </div>
        <h3 className="text-xl font-semibold">Fruits & Vegetables</h3>
        <p className="text-white/90">Fresh and organic produce for your daily needs.</p>
      </div>
      
      {/* Dairy Products */}
      <div className="text-center">
        <div className="flex justify-center items-center w-16 h-16 bg-white rounded-full mx-auto mb-4">
          <LocalCafeIcon className="text-green-500" fontSize="large" />
        </div>
        <h3 className="text-xl font-semibold">Dairy Products</h3>
        <p className="text-white/90">Milk, cheese, butter, and more from trusted brands.</p>
      </div>
      
      {/* Snacks & Beverages */}
      <div className="text-center">
        <div className="flex justify-center items-center w-16 h-16 bg-white rounded-full mx-auto mb-4">
          <FastfoodIcon className="text-green-500" fontSize="large" />
        </div>
        <h3 className="text-xl font-semibold">Snacks & Beverages</h3>
        <p className="text-white/90">Tasty treats and refreshing drinks for every occasion.</p>
      </div>

    </div>
  </div>
</div>



       {/* Meat Products Slider */}
       <div className="mt-20 md:px-20 px-6">
        <h2 className="text-[27px] font-medium mb-6">Juice</h2>
        <SliderProduct ProductArray={meatProducts} sliderPerView={4} />
      </div>

      {/* Spices Slider */}
      <div className="mt-20 md:px-20 px-6">
        <h2 className="text-[27px] font-medium mb-6">Spices</h2>
        <SliderProduct ProductArray={spicesProducts} sliderPerView={4} />
      </div>

      {/* Rice Slider */}
      <div className="mt-20 md:px-20 px-6">
        <h2 className="text-[27px] font-medium mb-6">Rice</h2>
        <SliderProduct ProductArray={riceProducts} sliderPerView={4} />
      </div>

      

      

     
    </div>
  );
}