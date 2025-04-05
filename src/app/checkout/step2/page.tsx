"use client"
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import StepperNav from '@/compoments/StepperNav';
import Toast from '@/compoments/Toast';

const stripePromise = loadStripe('pk_test_51R5LWNQwRy5Q2zLn7NTHVCJMc9McLjzpuAIn5mfLuyueQHPNq62lszwRED0yXhEmUILcgxxg3voCO0fgSs8Zvrh600ylwumbte');

export default function CheckoutStep2() {
    
  const [isProcessing, setIsProcessing] = useState(false);
  const [elements, setElements] = useState(null);
  const [stripe, setStripe] = useState(null);
  const [toast, setToast] = useState<{
      open: boolean;
      message: string;
      type: "success" | "error" | "info" | "warning";
    }>({
      open: false,
      message: "",
      type: "success", // 'success', 'error', 'info', 'warning'
    });
  

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await stripePromise;

      if (!stripeInstance) {
        console.error('Stripe failed to load.');
        return;
      }

      setStripe(stripeInstance);

      // Fetch client secret from your backend
      //const response = await fetch('/api/payment-intent'); // Replace with your actual API endpoint
      const clientSecret = localStorage.getItem('payment_intent');
       // Replace with your actual client secret from the backend
       console.log('Client Secret:', clientSecret);

      if (!clientSecret) {
       //redirect to the step1
        window.location.href = '/checkout/step1'; // Replace with your actual step 1 URL
        return;
      }

      const appearance = {
        theme: 'stripe',
       
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'Ideal Sans, system-ui, sans-serif',
        spacingUnit: '2px',
        borderRadius: '4px',
        fontSizeBase: '16px',
      };
      const options = {
        clientSecret,
        appearance,
      };

      const elementsInstance = stripeInstance.elements(options);
      setElements(elementsInstance);

      const paymentElement = elementsInstance.create('payment', { layout: 'accordion' });
      paymentElement.mount('#payment-element');
    };

    initializeStripe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      alert('Stripe has not been initialized.');
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/success', // Replace with your actual success page
      },
      redirect: 'if_required',
    });

    if (error) {
    //   alert(error.message);
    setToast({
        open: true,
        message: error.message,
        type: "error",
        });
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Payment successful!');
        setIsProcessing(false);
        setToast({
            open: true,
            message: 'payment success',
            type: 'success',
        })
        //navugate to the step3
        

        window.location.href = '/checkout/step3'; // Replace with your actual step 3 URL
      // Navigate or show a success message
    }
  };

  return (
    <div>
      <div className="mt-5">
        <StepperNav />
      </div>
      <div className="container mx-auto max-w-5xl px-10 mt-8">
        <div id="payment-element" style={{ marginTop: '20px' }}></div>
        <div className='flex justify-center'>
        <button
          id="submit"
          className="text-white bg-primary px-4 py-2 mt-5 rounded-[6px] w-full"
          onClick={handleSubmit}
          disabled={isProcessing}
        >
          <span id="button-text">{isProcessing ? 'Processing...' : 'Pay Now'}</span>
        </button>
        </div>
      
        <div id="payment-message" className="mt-4"></div>
      </div>
        {/* Toast Component */}
            <Toast
              open={toast.open}
              message={toast.message}
              type={toast.type}
              onClose={() => setToast({ ...toast, open: false })}
            />
    </div>
  );
}