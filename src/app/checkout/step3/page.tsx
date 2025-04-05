"use client";
import StepperNav from "@/compoments/StepperNav";
export default function CheckoutStep3() {
  return (
    <div>
      <div className="mt-5">
        <StepperNav activeStep={3} />
      </div>
      <div className='container mx-auto max-w-5xl px-10 mt-8'>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b ">
    <div
        className="w-full max-w-2xl p-12 mx-4 text-center transition-all transform  rounded-xl hover:shadow-xl">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 rounded-full">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
        </div>

        <h1 className="mb-6 text-4xl font-extrabold text-green-600">
            Payment Successful!
        </h1>

        <p className="mb-8 text-xl text-gray-700">
            Thank you for your purchase.
        </p>

        <div className="p-6 mb-8 rounded-lg bg-blue-50">
            <p className="text-lg font-medium text-blue-700">
            Your order has been placed successfully and is now being processed. You will receive a confirmation email shortly with the details of your purchase.
            </p>
        </div>

       

        <div className="mt-12">
            <button onClick={() => (window.location.href = "/profile")}
                className="mt-6 w-full bg-green-500 cursor-pointer text-white py-2 px-4 rounded hover:bg-green-600 transition">
               View My Order
            </button>
        </div>
    </div>
</div>


      </div>
    </div>
  );
}
