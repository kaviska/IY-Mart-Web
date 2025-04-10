"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation"; // For navigation
import Toast from "@/compoments/Toast";
import { fetchDataJson } from "@/lib/fetch"; // Import the fetch function

export default function OTPVerification() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
   const [toast, setToast] = useState<{
     open: boolean;
     message: string;
     type: "success" | "error" | "info" | "warning";
   }>({
     open: false,
     message: "",
     type: "success", // 'success', 'error', 'info', 'warning'
   });
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const router = useRouter();

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus the next input
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Focus the previous input
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");

    if (!/^\d{4}$/.test(text)) return; // Ensure the pasted text is exactly 4 digits

    const newOtp = text.split("");
    setOtp(newOtp);

    // Focus the last input
    inputsRef.current[otp.length - 1]?.focus();
  };

  const resend =async()=>{
    try{
      console.log('function running')
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const response = fetchDataJson('/resend-otp',{
        method:'PUT',
        body: JSON.stringify({ email: user?.email || '' })
      })
      const result=await response
      console.log(result)

      
      setToast({
        open: true,
        message: "OTP Send To Your Email !",
        type: "success",
      });

    }
    catch{
      setToast({
        open: true,
        message: "OTP Send Failed",
        type: "error",
      });

    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("user-token "+ localStorage.getItem("user-token"));

    try {
      const response = fetchDataJson("verify-otp", {
        method: "POST",
        body: JSON.stringify({ otp: otpCode }),
      });

      const result = await response as { status: string }; // Type assertion
      if (result.status !== 'error') {
        setToast({
          open: true,
          message: "OTP verified successfully!",
          type: "success",
        });
        setTimeout(() => {
          router.push("/shop"); // Redirect to the shop page
        }, 2000); // Delay to show the toast

      }

    

      // if (response.ok) {
      //   setToast({
      //     open: true,
      //     message: "OTP verified successfully!",
      //     type: "success",
      //   });
      //   setTimeout(() => {
      //     router.push("/shop"); // Redirect to the shop page
      //   }, 2000); // Delay to show the toast
      //}
    } catch (error) {
      console.log(error)
      setToast({
        open: true,
        message: "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
          <p className="text-[15px] text-slate-500">
            Enter the 4-digit verification code that was sent to your email.
          </p>
        </header>
        <form id="otp-form" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxLength={1}
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                ref={(el) => {
                  inputsRef.current[index] = el!;
                }}
              />
            ))}
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              className="w-full cursor-pointer inline-flex justify-center whitespace-nowrap rounded-lg bg-primary px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
            >
              Verify Account
            </button>
          </div>
        </form>
        <div className="text-sm text-slate-500 mt-4">
          Didn&lsquo;t receive code?{" "}
          <button className="font-medium primary hover:text-indigo-600" onClick={resend}>
            Resend
          </button>
        </div>
      </div>
      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
}
