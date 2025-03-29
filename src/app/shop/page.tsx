import Filter from "@/compoments/Filter";
import ShopAllProduct from "@/compoments/ShopAllProduct";

export default function Shop() {
  return (
   <div className="container mx-auto">


    <div className="flex">
        <div className="md:w-[30%]">
            <Filter/>

        </div>
        <div className="md:w-[70%]">
            <ShopAllProduct/>
        </div>



    </div>

   </div>
  );
}