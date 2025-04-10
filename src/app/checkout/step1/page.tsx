"use client"
import StepperNav from "@/compoments/StepperNav";
import CheckOutForm from "@/compoments/CheckOutForm";

export default function CheckoutStep1() {
  return (
    <div>
      <div className="mt-5">
        <StepperNav activeStep={1} />
      </div>
      <div className='container mx-auto max-w-5xl px-10 mt-8'>
        <CheckOutForm />


      </div>
    </div>
  );
}
