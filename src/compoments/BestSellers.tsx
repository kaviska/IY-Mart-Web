import BestSellersCard from "./BestSellersCard";
import { useEffect, useState } from "react";
import { fetchDataJson } from "@/lib/fetch";
import { ProductType } from "@/types/type";
import calculatePrice from "@/lib/priceCalcuator";

export default function BestSellers() {
    const [bestSellers, setBestSellers] = useState<ProductType[]>([]);

    useEffect(() => {
        const getProductsBestSellers = async () => {
            const res = await fetchDataJson<{ data: ProductType[] }>('products?with=all&');
            setBestSellers(res.data);
            console.log("Best Selling Products fetched");
        };
        getProductsBestSellers();
    }, []);

    if (bestSellers.length === 0) {
        return null; // Hide the section if there are no best sellers
    }

    return (
        <div>
            <div className="mt-8">
                <h2 className="font-medium text-[40px] md:mx-8 text-center md:text-start mb-8">Best Sellers</h2>
            
                <div className="flex flex-wrap">
                   
                    {bestSellers.map((product, index) => {
                        return (
                            <BestSellersCard
                                key={product.id || index}
                                BestSellerProduct={{
                                    id: product.id,
                                    slug: product.slug,
                                    name: product.name || `Product ${index + 1}`,
                                    description: product.description || "No description available",
                                    price: product.stocks ? calculatePrice(product.stocks) : '0',
                                    imageUrl: "./kottu.svg",
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}