import BestSellersCard from "./BestSellersCard";
import { useEffect, useState } from "react";
import { fetchDataJson } from "@/lib/fetch";
import { ProductType } from "@/types/type";
import calculatePrice from "@/lib/priceCalcuator";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import '@public/swipper.css'; // Import your custom CSS file for Swiper styles

// import required modules
import { Navigation, Autoplay } from 'swiper/modules';

export default function BestSellers() {
    const [bestSellers, setBestSellers] = useState<ProductType[]>([]);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const getProductsBestSellers = async () => {
            const res = await fetchDataJson<{ data: ProductType[] }>('products?with=all&');
            setBestSellers(res.data);
            console.log("Best Selling Products fetched");
        };
        getProductsBestSellers();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768); // Medium breakpoint (768px)
        };

        handleResize(); // Check on initial render
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (bestSellers.length === 0) {
        return null; // Hide the section if there are no best sellers
    }

    return (
        <div>
            <div className="mt-8">
                <h2 className="font-medium text-[30px] md:mx-8 text-center md:text-start mb-8">Best Sellers</h2>
            
                <div className="flex  md:flex-row md:gap-0 gap-6 flex-col flex-wrap md:px-8 px-2">
                    {isMobileView ? (
                        <Swiper
                            cssMode={true}
                            navigation={false}
                            loop={true}
                            effect="fade"
                            fadeEffect={{ crossFade: true }}
                            keyboard={{ enabled: true }}
                            mousewheel={{ enabled: true }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }} // Ensure autoplay works even after interaction
                            modules={[Navigation, Autoplay]} // Include Autoplay module
                            className="mySwiper"

                            slidesPerView={1}
                            spaceBetween={10}
                            breakpoints={{
                                648: {
                                    slidesPerView: 3,
                                },
                                0: {
                                    slidesPerView: 1,
                                }
                            }}
                        >
                            {bestSellers.slice(0, 6).map((product, index) => (
                                <SwiperSlide key={index}>
                                    <BestSellersCard
                                        key={product.id || index}
                                        BestSellerProduct={{
                                            id: product.id,
                                            slug: product.slug,
                                            name: product.name || `Product ${index + 1}`,
                                            description: product.description || "No description available",
                                            price: product.stocks ? calculatePrice(product.stocks) : '0',
                                            imageUrl: product.primary_image,
                                        }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        bestSellers.slice(0, 4).map((product, index) => (
                            <BestSellersCard
                                key={product.id || index}
                                BestSellerProduct={{
                                    id: product.id,
                                    slug: product.slug,
                                    name: product.name || `Product ${index + 1}`,
                                    description: product.description || "No description available",
                                    price: product.stocks ? calculatePrice(product.stocks) : '0',
                                    imageUrl: product.primary_image,
                                }}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}