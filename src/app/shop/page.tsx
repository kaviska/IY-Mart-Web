import Filter from "@/compoments/Filter";
import ShopAllProduct from "@/compoments/ShopAllProduct";
import React, { Suspense } from "react";

export default function Shop() {
  return (
    <Suspense fallback={<div>Loading...</div>}>

   <div className="container mx-auto mt-5">


    <div className="md:flex">
        <div className="md:w-[30%] w-[100%]">
            <Filter/>

        </div>
        <div className="md:w-[70%] w-[100%] md:mt-0 mt-5">
            <ShopAllProduct/>
        </div>



    </div>

   </div>
    </Suspense>
  );
}