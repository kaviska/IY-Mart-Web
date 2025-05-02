"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const images = [
  { uri: "/hero-banner.svg" },
  { uri: "/hero-2.jpg" },
  { uri: "https://apivtwo.iymart.jp/storage/images/assets/app_img/branding/carousel_image_3.png" },
  { uri: "https://apivtwo.iymart.jp/storage/images/assets/app_img/branding/carousel_image_4.png" },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Preload all images
    images.forEach((image) => {
      const img = new Image();
      img.src = image.uri;
    });

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 8 seconds interval

    return () => clearInterval(interval); // Clean up
  }, []);

  return (
    <div
      className="hero transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${images[currentIndex].uri})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col justify-end items-center md:items-end md:h-screen h-[80vh] lg:px-20 px-8 py-10 bg-black/40">
        <div className="flex flex-col items-center text-center md:items-start md:text-start">
          <h1 className="text-white font-medium md:text-[64px] text-[60px] md:leading-[1.2] leading-[1]">
            <span>Your Spice Heaven</span> <br />
            <span className="md:text-[48px] text-[22px] font-normal">Sri Lankan In Japan</span>
          </h1>
          <Link href="/shop" passHref>
            <button className="md:mt-7 mt-4 border cursor-pointer border-white text-[16px] px-12 py-3 text-white transition duration-300 ease-in-out hover:bg-white hover:text-black">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}