"use client";
import React, { useEffect, useState } from "react";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import StepperNav from "@/compoments/StepperNav";
import Toast from "@/compoments/Toast";

const stripePromise = loadStripe(
  "pk_test_51R5LWNQwRy5Q2zLn7NTHVCJMc9McLjzpuAIn5mfLuyueQHPNq62lszwRED0yXhEmUILcgxxg3voCO0fgSs8Zvrh600ylwumbte"
);

interface PaymentType {
  order_details: {
    subtotal: number;
    shipping_cost: number;
    tax: number;
    total_discount: number;
    total: number;
    order_number?: string;
    payment_method?: string;
    user_address_line1?: string;
    user_address_line2?: string;
    user_city?: string;
    user_prefecture?: string;
    user_country?: string;
    user_postal_code?: string;
  };
}

export default function CheckoutStep2() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [elements, setElements] = useState<StripeElements | null>(null);
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string | undefined;
    type: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    type: "success", // 'success', 'error', 'info', 'warning'
  });
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [payment, setPayment] = useState<PaymentType | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await stripePromise;

      // const user= JSON.parse(localStorage.getItem('user') || '{}');
      // const email = user.email;
      // const mobile=user.mobile
      // const name=user.name;
      let payment: PaymentType | null = null;
      if (typeof window !== "undefined") {
         payment = JSON.parse(
          localStorage.getItem("payment") || "{}"
        ) as PaymentType;
      }

      setPayment(payment);
      console.log("payment", payment);

      if (!stripeInstance) {
        console.error("Stripe failed to load.");
        return;
      }

      setStripe(stripeInstance);
      let clientSecret ;

      if(typeof window !== 'undefined'){
        clientSecret = localStorage.getItem("payment_intent");

     }
 

      // Fetch client secret from your backend
      //const response = await fetch('/api/payment-intent'); // Replace with your actual API endpoint
      // Replace with your actual client secret from the backend
      console.log("Client Secret:", clientSecret);

      if (!clientSecret) {
        //redirect to the step1
        window.location.href = "/checkout/step1"; // Replace with your actual step 1 URL
        return;
      }

      const appearance = {
        theme: "stripe" as const,

        colorBackground: "#ffffff",
        colorText: "#30313d",
        colorDanger: "#df1b41",
        fontFamily: "Ideal Sans, system-ui, sans-serif",
        spacingUnit: "2px",
        borderRadius: "4px",
        fontSizeBase: "16px",
      };
      const options = {
        clientSecret,
        appearance,
      };

      const elementsInstance = stripeInstance.elements(options);
      setElements(elementsInstance);

      const paymentElement = elementsInstance.create("payment", {
        layout: "accordion",
        business: {
          name: "IY Mart",
        },
      });
      paymentElement.mount("#payment-element");
    };

    initializeStripe();
  }, []);

  useEffect(() => {
    const storedPaymentMethod = localStorage.getItem("paymentMethod");
    if (storedPaymentMethod) {
      setPaymentMethod(storedPaymentMethod);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      alert("Stripe has not been initialized.");
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/success", // Replace with your actual success page
      },

      redirect: "if_required",
    });

    if (error) {
      //   alert(error.message);
      setToast({
        open: true,
        message: error.message,
        type: "error",
      });
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("Payment successful!");
      setIsProcessing(false);
      setToast({
        open: true,
        message: "payment success",
        type: "success",
      });
      //navugate to the step3
      updateOrderStatus();

      window.location.href = "/checkout/step3"; // Replace with your actual step 3 URL
      // Navigate or show a success message
    }
  };
  const updateOrderStatus = async () => {
    // setToast({
    //   open: true,
    //   message: "Please wait while we are processing your payment",
    //   type: "info",
    // });
    let token
    let orderId
    if(typeof window !== 'undefined'){
      token = localStorage.getItem("token"); // Replace with your actual token
      orderId = localStorage.getItem("orderId"); // Replace with your actual order ID
    }

    const response = await fetch("https://api.iymart.jp/api/update/order-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // Replace with your actual token
      },
      body: JSON.stringify({
        order_id: orderId, // Replace with your actual order ID
        status: "completed",
        isCreateInvoice: true,
        isSendInvoice: true,
      }),
    });

    if (!response.ok) {
      console.error("Failed to update order status:", response.statusText);
      setToast({
        open: true,
        message: "Failed to update order status, Please Contact Our Support",
        type: "error",
      });
    } else {
      console.log("Order status updated successfully!");
    }
  };
  const renderUserInterface = () => {
    if (paymentMethod === "cash_on_delivery") {
      return (
        <div className="mt-5 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800">Cash on Delivery</h2>
          <p className="mt-4 text-gray-700">
            Please ensure you have the{" "}
            <span className="font-semibold">exact amount</span> ready at the
            time of delivery. Our delivery personnel will{" "}
            <span className="font-semibold">not carry change</span>.
          </p>
          <p className="mt-4 text-gray-700">
            By choosing this option, you agree to pay the{" "}
            <span className="font-semibold">full amount</span> upon delivery.
          </p>
          <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
            <p className="font-medium">Important:</p>
            <p>
              Ensure someone is available to receive the delivery and make the
              payment.
            </p>
          </div>
          <button
            onClick={() => (window.location.href = "/checkout/step3")}
            className="mt-6 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Proceed to Step 3
          </button>
        </div>
      );
    } else if (paymentMethod === "card") {
      return (
        <>
          <div id="payment-element" style={{ marginTop: "20px" }}></div>
          <div className="flex justify-center">
            <button
              id="submit"
              className="text-white cursor-pointer bg-primary px-4 py-2 mt-5 rounded-[6px] w-full"
              onClick={handleSubmit}
              disabled={isProcessing}
            >
              <span id="button-text">
                {isProcessing ? "Processing..." : "Pay Now"}
              </span>
            </button>
          </div>

          <div id="payment-message" className="mt-4"></div>
        </>
      );
    } else if (paymentMethod === "bank_transfer") {
      return (
        <div className="mt-5 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800">Bank Transfer</h2>
          <p className="mt-4 text-gray-700">
            Please transfer the total amount to the following bank account:
          </p>
          <ul className="mt-4 bg-white p-4 rounded-lg shadow-inner">
            <li className="text-gray-800">
              <span className="font-semibold">Bank Name:</span> XYZ Bank
            </li>
            <li className="text-gray-800 mt-2">
              <span className="font-semibold">Account Number:</span> 123456789
            </li>
            <li className="text-gray-800 mt-2">
              <span className="font-semibold">Account Name:</span> IY Mart
            </li>
            <li className="text-gray-800 mt-2">
              <span className="font-semibold">SWIFT Code:</span> XYZ123
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            Once the transfer is complete, please email the receipt to
            <a
              href="mailto:support@iymart.jp"
              className="text-blue-600 underline ml-1"
            >
              support@iymart.jp
            </a>
            for verification.
          </p>
          <div className="mt-6 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
            <p className="font-medium">Note:</p>
            <p>
              Ensure you include your order ID in the transfer details for
              faster processing.
            </p>
          </div>
          <button
            onClick={() => (window.location.href = "/checkout/step3")}
            className="mt-6 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Proceed to Step 3
          </button>
        </div>
      );
    } else {
      return <p className="mt-5 text-gray-700">Loading payment method...</p>;
    }
  };

  return (
    <div>
      <div className="mt-5">
        <StepperNav activeStep={2} />
      </div>
      <div className="container mx-auto max-w-5xl px-10 mt-8">
        <div className="payment-details bg-gray-100 p-6 rounded-lg shadow-md mt-5">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-700">Subtotal:</span>
            <span className="font-semibold text-gray-800">
              ¥{payment?.order_details?.subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <span className="text-gray-700">Shipping Fee:</span>
            <span className="font-semibold text-gray-800">
              ¥{payment?.order_details?.shipping_cost.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <span className="text-gray-700">Tax:</span>
            <span className="font-semibold text-gray-800">
              ¥{payment?.order_details?.tax.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <span className="text-gray-700">Discount:</span>
            <span className="font-semibold text-gray-800">
              ¥{payment?.order_details?.total_discount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-gray-800">Total:</span>
            <span className="text-lg font-bold text-green-600">
              ¥{payment?.order_details?.total.toLocaleString()}
            </span>
          </div>
          {/* <div className="mt-4 text-gray-700">
            <p><span className="font-semibold">Order Number:</span> {payment?.order_details?.order_number}</p>
            <p><span className="font-semibold">Payment Method:</span> {payment?.order_details?.payment_method}</p>
            <p><span className="font-semibold">Shipping Address:</span></p>
            <p>{payment?.order_details?.user_address_line1}, {payment?.order_details?.user_address_line2}</p>
            <p>{payment?.order_details?.user_city}, {payment?.order_details?.user_prefecture}, {payment?.order_details?.user_country}</p>
            <p>{payment?.order_details?.user_postal_code}</p>
          </div> */}
        </div>
        {renderUserInterface()}
        {/* <div id="payment-element" style={{ marginTop: "20px" }}></div>
        <div className="flex justify-center">
          <button
            id="submit"
            className="text-white cursor-pointer bg-primary px-4 py-2 mt-5 rounded-[6px] w-full"
            onClick={handleSubmit}
            disabled={isProcessing}
          >
            <span id="button-text">
              {isProcessing ? "Processing..." : "Pay Now"}
            </span>
          </button>
        </div>

        <div id="payment-message" className="mt-4"></div> */}
      </div>
      {/* Toast Component */}
      <Toast
        open={toast.open}
        message={toast.message || ""}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
}
