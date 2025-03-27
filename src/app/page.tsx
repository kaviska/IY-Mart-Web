import Hero from "@/compoments/Hero";
import Image from "next/image";
import scheduleImage from "@public/schedule.svg";
import BestSellers from "@/compoments/BestSellers";
import ProductCard from "@/compoments/ProductCard";

export default function Home() {
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
      <h2 className="primary underline">New Arrival</h2>
      <h2 className="text-[#8B8B8B]">Featured Products</h2>
    </div>

    {/* Product Cards Section */}
    <div className="flex flex-wrap gap-5 justify-start">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  </div>
</div>

    </div>
  );
}
