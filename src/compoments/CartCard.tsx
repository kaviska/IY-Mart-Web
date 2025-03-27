import Image from "next/image";
import CanImage from "@public/Can.svg";
import CloseImage from "@public/close.svg";
export default function CartCard() {
  return (
    <div className=" border-b py-5  flex flex-wrap justify-between ">
      <div>
        <Image src={CanImage} alt="can" width={75} height={75}></Image>
      </div>
      <div className="mt-2 max-w-[40%]">
        <h1 className=" font-medium text-[18px]">Ride Red Berry Can 250ml  </h1>
        <span className="text-[14px] mt-3">#4665768787</span>
      </div>
      <div className="flex items-center">
        <div className="flex w-[30%] px-4">
          <button className=" px-5 py-2 ">-</button>
          <span className="px-5 py-2">1</span>
          <button className=" px-5 py-2">+</button>
        </div>
      </div>
      <div className="flex items-center">
        <span className=" font-medium text-[18px]">RS 1200.00</span>
      </div>
      <div className="flex items-center">
        <Image
          src={CloseImage}
          width={20}
          height={20}
          alt="close-image"
        ></Image>
      </div>
    </div>
  );
}
