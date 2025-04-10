import Link from "next/link";

export default function Hero() {
    return (
        <div className="hero">
            <div className="flex flex-col justify-end items-center md:items-end h-screen lg:px-20 px-8 py-10">
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
