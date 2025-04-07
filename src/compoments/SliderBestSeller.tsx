import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import '@public/swipper.css'; // Import your custom CSS file for Swiper styles

// import required modules
import { Navigation, Autoplay } from 'swiper/modules';
import ProductCard from './ProductCard';
import { ProductType } from '@/types/type';
import calculatePrice from '@/lib/priceCalcuator';
import discountCalcuator from '@/lib/discountCalcuator';

interface AppProps {
  ProductArray: ProductType[];
  sliderPerView: number;
}

export default function App({ ProductArray, sliderPerView }: AppProps) {
  console.log("ProductArray", ProductArray);
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        keyboard={{ enabled: true }}
        mousewheel={{ enabled: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Ensure autoplay works even after interaction
        modules={[Navigation, Autoplay]} // Include Autoplay module
        className="mySwiper"
        slidesPerView={sliderPerView}
        spaceBetween={10}
        breakpoints={{
          1024: {
            slidesPerView: 4,
          },

          768: {
            slidesPerView: 3,
          },

          648: {
            slidesPerView: 3,
          },
          0:{
            slidesPerView: 1,
          }
        
        }}
      >
        {ProductArray.map((product: ProductType, index: number) => (
          <SwiperSlide key={index}>
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                         discount: discountCalcuator(product.stocks) || null, 
               
                name: product.name,
                price: calculatePrice(product.stocks) || '0',
                imageUrl: "/sauce.svg",
              }}
              slug={product.slug}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
