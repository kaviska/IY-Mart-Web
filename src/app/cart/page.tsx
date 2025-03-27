import CartCard from "@/compoments/CartCard";
export default function Cart() {
  return (
    <div className="container mx-auto ">
      <div className="mt-5 flex gap-9">
        <div className="w-[50%] flex flex-col gap-4">
          <h1 className=" font-medium text-[24px] text-black ">
            Shopping Cart
          </h1>

          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
        </div>{" "}
        <div className="w-[50%] border border-[#D9D9D9] px-12 py-20">
          <h2 className=" font-medium text-[24px] text-black">Order Summary</h2>
          <div className='mt-5'>
            <label htmlFor="" className="text-[14px]">Disscount Code/Promo Code</label>
              <input type="text" className="px-4 py-2 mt-3 outline-0 border border-[#D9D9D9] w-full rounded-[8px] text-[14px]" />

             
          </div>

          <div className="flex flex-col  mt-5">
            <div className="mt-3 flex  justify-between">
              <span className="text-[14px]">Subtotal</span>
              <span className="text-[14px]">Rs. 1200.00</span>
            </div>

            <div className="mt-3 flex  justify-between">
              <span className="text-[14px]">Subtotal</span>
              <span className="text-[14px]">Rs. 1200.00</span>
            </div>

            <div className="mt-3 flex  justify-between">
              <span className="text-[14px]">Subtotal</span>
              <span className="text-[14px]">Rs. 1200.00</span>
            </div>

            <div className="mt-3 flex  justify-between">
              <span className="text-[14px]">Subtotal</span>
              <span className="text-[14px]">Rs. 1200.00</span>
            </div>
          
          </div>
          <div className="mt-5 ">
          <button className="bg-primary rounded-[8px] text-[14px] px-3 py-4 w-full text-white">Checkout</button>


          </div>

        </div>
      </div>
    </div>
  );
}
