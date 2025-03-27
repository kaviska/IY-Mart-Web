export default function Hero() {
    return (
        <div className="hero">
            <div className="flex flex-col justify-end items-end h-[100vh] lg:px-20 px-8 py-10">
                <div className="md:block flex flex-col items-center text-center md:text-start">
                    <h1 className="text-white font-medium md:text-[64px] text-[60px] leading-[1.2]">
                        <span>Your Spice Heaven</span> <br />
                        <span className="md:text-[48px] text-[22px] font-normal">Sri Lankan In Japan</span>
                    </h1>
                    <button className="md:mt-7 mt-4 border border-white text-[16px] px-12 py-3 text-white">
                        Shop Now
                    </button>
                </div>
            </div>
        </div>
    );
}
