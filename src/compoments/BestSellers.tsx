import BestSellersCard from "./BestSellersCard";

export default function BestSellers(){
    return(
        <div>
           <div className="mt-8">
            <h2 className=" font-medium  text-[40px] md:mx-8 text-center md:text-start mb-8">Best Sellers</h2>

            <div className="flex flex-wrap">
                <BestSellersCard></BestSellersCard>
                <BestSellersCard></BestSellersCard>
                <BestSellersCard></BestSellersCard>
                <BestSellersCard></BestSellersCard>
            </div>
           </div>
        </div>
    )
}