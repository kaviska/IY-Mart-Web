import LogoOne from "@public/logo-1.svg";
import callImage from "@public/call.svg";
import Facebook from "@public/Facebook.svg";
import Instagram from "@public/Instagram.svg";
import Twitter from "@public/Twitter.svg";
import Tiktok from "@public/Tiktok.svg";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className=" md:py-14 md:pt-8 pt-10 py-5 bg-primary mt-8">
      <div className="flex container mx-auto max-w-6xl flex-col md:flex-row md:justify-between md:items-start items-center md:gap-0 gap-5 ">
       
        <div className=" md:hidden flex flex-col justify-center items-center">
            <Image src={LogoOne} alt="logo" width={140} height={140}></Image>
            <h3 className="text-white text-[14px] mt-1 ">
              Copyright © 2025 IYMart (Pvt) Ltd. All Rights Reserved.
            </h3>
          </div>

        
        <div className="md:order-0 order-1">
          <div className=" md:block hidden">
            <Image src={LogoOne} alt="logo" width={140} height={140}></Image>
            <h3 className="text-white text-[14px] mt-1 ">
              Copyright © 2025 IYMart (Pvt) Ltd. All Rights Reserved.
            </h3>
          </div>

          <div className="flex md:justify-start justify-center  md:gap-3 gap-8 mt-5">
            <Image
              src={callImage}
              alt="call-icon"
              width={20}
              height={20}
            ></Image>
            <span className="text-white text-[16px]">+94 112 123 123</span>
          </div>
          <div className="mt-8  ">
            <div className="md:w-[370px]  w-full text-[12px]   h-10 rounded-[8px] border  border-white flex gap-3">
              <input
                type="text"
                placeholder="Enter your email to subscribe to our newsletter"
                className="px-4 py-2 flex-1 text-white  placeholder-white focus:outline-none h-10"
              />
               <button className=" px-4 bg-secondary text-white rounded-[8px] h-10">
                Subscribe
              </button>
            </div>
            {/* <div className="relative">
              <input
                type="text"
                placeholder="Enter your email to subscribe to our newsletter"
                className="px-4 py-2 md:w-[370px] w-[200px] text-[12px] rounded-[8px] border border-white placeholder-white focus:outline-none"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-secondary text-white rounded-[8px]">
                Subscribe
              </button>
            </div> */}
          </div>
          <div className="flex md:justify-start justify-center gap-5 mt-5">
            <Image src={Twitter} alt="call-icon" width={15} height={15}></Image>
            <Image
              src={Facebook}
              alt="call-icon"
              width={15}
              height={15}
            ></Image>
            <Image
              src={Instagram}
              alt="call-icon"
              width={15}
              height={15}
            ></Image>
            <Image src={Tiktok} alt="call-icon" width={15} height={15}></Image>
          </div>
        </div>
        <div className="">
          <h3 className="text-[16px] font-bold text-white">Main Links</h3>
            <ul className="bullet-none text-[14px] md:mt-5 mt-3 text-[#CFCFCF] space-y-1 md:text-start text-center">
            <li>
              <Link
              href="/"
              className="hover:text-white transition-colors duration-200"
              >
              Home
              </Link>
            </li>
            <li>
              <Link
              href="/shop"
              className="hover:text-white transition-colors duration-200"
              >
              Shop
              </Link>
            </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-white">Terms & Condition</h3>
            <ul className="bullet-none text-[14px] md:mt-5 mt-3 text-[#CFCFCF] space-y-1 md:text-start text-center">
            <li>
              <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors duration-200"
              >
              Privacy Policy
              </Link>
            </li>
            <li>
              <Link
              href="/return-policy"
              className="hover:text-white transition-colors duration-200"
              >
              Return Policy
              </Link>
            </li>
            <li>
              <Link
              href="/terms-and-conditions"
              className="hover:text-white transition-colors duration-200"
              >
              Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
              href="/contact"
              className="hover:text-white transition-colors duration-200"
              >
              Contact
              </Link>
            </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-white">Useful Links</h3>
            <ul className="bullet-none text-[14px] md:mt-5 mt-3 text-[#CFCFCF] space-y-1 md:text-start text-center">
            <li>
              <Link
              href="/about-us"
              className="hover:text-white transition-colors duration-200"
              >
              About Us
              </Link>
            </li>
            <li>
              <Link
              href="/contact-us"
              className="hover:text-white transition-colors duration-200"
              >
              Contact Us
              </Link>
            </li>
            <li>
              <Link
              href="/blog"
              className="hover:text-white transition-colors duration-200"
              >
              Blog
              </Link>
            </li>
            <li>
              <Link
              href="/login"
              className="hover:text-white transition-colors duration-200"
              >
              Login
              </Link>
            </li>
            <li>
              <Link
              href="/register"
              className="hover:text-white transition-colors duration-200"
              >
              Register
              </Link>
            </li>
            </ul>
          </div>
      </div>
    </div>
  );
}
