"use client";
import { useEffect, useState } from "react";
import CartCard from "@/compoments/CartCard";
import { fetchDataJson } from "@/lib/fetch";
import Toast from "@/compoments/Toast";

export default function Cart() {
  const [cartData, setCartData] = useState<any[]>([]); // State to store cart items
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalWithDiscounts, setTotalWithDiscounts] = useState(0);
  
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmountWithTax, setTotalAmountWithTax] = useState(0);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    type: "success", // 'success', 'error', 'info', 'warning'
  });

  const fetchGuestCart = async () => {
    try {
      // Retrieve the actual guest cart from localStorage
      const localCart = JSON.parse(
        localStorage.getItem("guest_cart") || '{"guest_cart": []}'
      );

      if (localCart.guest_cart.length === 0) {
        console.log("Guest cart is empty.");
        // Update the UI to reflect an empty cart
        setCartData([]);
        setTotalAmount(0);
        setTotalWithDiscounts(0);
        
        setTaxAmount(0);
        setTotalAmountWithTax(0);
        return; // Exit early since there's no need to send a request
      }

      // Convert the actual guest cart to a query string
      const queryParams = new URLSearchParams();
      localCart.guest_cart.forEach((item: any, index: number) => {
        queryParams.append(`guest_cart[${index}][action]`, item.action);
        queryParams.append(`guest_cart[${index}][id]`, item.id.toString());
        queryParams.append(
          `guest_cart[${index}][quantity]`,
          item.quantity.toString()
        );
        queryParams.append(
          `guest_cart[${index}][stock_id]`,
          item.stock_id.toString()
        );
      });

      // Send the request to the server
      const result = await fetchDataJson<{ status: string; data: { cart_items: any[]; total_amount: string; total_with_discounts: string; tax_amount: string; total_amount_with_tax: string } }>(`guest_carts?${queryParams}`);
      console.log("Fetched Cart Data:", result);

      if (result.status === "success") {
        console.log("Cart Data:", result.data.cart_items);
        setCartData(result.data.cart_items);
        setTotalAmount(parseFloat(result.data.total_amount)); // Ensure proper number formatting
        setTotalWithDiscounts(parseFloat(result.data.total_with_discounts));
      
        setTaxAmount(parseFloat(result.data.tax_amount));
        setTotalAmountWithTax(parseFloat(result.data.total_amount_with_tax));
      }
    } catch (error) {
      console.error("Error fetching guest cart:", error);
    }
  };
  // Update guest cart in localStorage and send a request to the server
  const updateGuestCart = async (stockId: number, quantity: number) => {
    console.log("Updating Guest Cart:", stockId, quantity);
    const localCart = JSON.parse(
      localStorage.getItem("guest_cart") || '{"guest_cart": []}'
    );
    const existingItemIndex = localCart.guest_cart.findIndex(
      (item: any) => item.stock_id === stockId
    );

    if (existingItemIndex !== -1) {
      // Update quantity if the item exists
      localCart.guest_cart[existingItemIndex].quantity = quantity;
    } else {
      // Add new item to the cart
      localCart.guest_cart.push({
        action: "add",
        id: 0,
        quantity,
        stock_id: stockId,
      });
    }

    localStorage.setItem("guest_cart", JSON.stringify(localCart));
    console.log("Updated Local Cart:", localCart);

    // Send updated cart to the server
    await fetchGuestCart();
  };

  // Handle quantity change
  const handleQuantityChange = (stockId: number, newQuantity: number) => {
    console.log("Handling Quantity Change:", stockId, newQuantity);
    updateGuestCart(stockId, newQuantity);
  };

  const removeHandler = (stockId: number) => {
    console.log("Removing Item from Cart:", stockId);
    const localCart = JSON.parse(
      localStorage.getItem("guest_cart") || '{"guest_cart": []}'
    );
    const updatedCart = localCart.guest_cart.filter(
      (item: any) => item.stock_id !== stockId
    );
    localCart.guest_cart = updatedCart;
    localStorage.setItem("guest_cart", JSON.stringify(localCart));
    fetchGuestCart(); // Refresh cart data after removal
  };

  const checkoutHandler = () => {
    console.log("Proceeding to Checkout");
      //check guest cart empty if empty show toast message
    const localCart = JSON.parse(
      localStorage.getItem("guest_cart") || '{"guest_cart": []}'
    );
    if (localCart.guest_cart.length === 0) {
      console.log("Guest cart is empty. Cannot proceed to checkout.");
      setToast({
        open: true,
        message: "Your cart is empty. Please add items to proceed.",
        type: "warning",
      });
      return;
    }
    // Redirect to checkout page
    window.location.href = "/checkout/step1";
  };

  useEffect(() => {
    fetchGuestCart(); // Fetch cart data on component mount
  }, []);

  return (
    <div className="container mx-auto md:px-0 px-5">
      <div className="mt-5 flex md:flex-row flex-col md:gap-9 gap-6">
        {/* Cart Items Section */}
        <div className="md:w-[50%] flex flex-col gap-4">
          <h1 className="font-medium text-[24px] text-black">Shopping Cart</h1>
            {cartData.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
            cartData.map((item) => (
              <CartCard
              key={item.stock_id}
              product={item.stock.product}
              quantity={item.quantity}
              price={item.stock.web_price}
              stockId={item.stock.id}
              discount={item.stock.web_discount}
              onQuantityChange={handleQuantityChange}
              onRemove={removeHandler}
              />
            ))
            )}
        </div>

        {/* Order Summary Section */}
        <div className="md:w-[50%] border border-[#D9D9D9] md:px-12 px-6 py-20">
          <h2 className="font-medium text-[24px] text-black">Order Summary</h2>
          <div className="mt-5">
            <label htmlFor="promo-code" className="text-[14px]">
              Discount Code/Promo Code
            </label>
            <input
              type="text"
              id="promo-code"
              className="px-4 py-2 mt-3 outline-0 border border-[#D9D9D9] w-full rounded-[8px] text-[14px]"
            />
          </div>
          <div className="flex flex-col mt-5">
            <div className="mt-3 flex justify-between">
              <span className="text-[14px]">Subtotal</span>
              <span className="text-[14px]">Rs. {totalAmount.toFixed(2)}</span>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="text-[14px]">Total with Discounts</span>
              <span className="text-[14px]">
                Rs. {totalWithDiscounts.toFixed(2)}
              </span>
            </div>
          
            <div className="mt-3 flex justify-between">
              <span className="text-[14px]">Tax Amount</span>
              <span className="text-[14px]">Rs. {taxAmount.toFixed(2)}</span>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="text-[14px]">Total Amount with Tax</span>
              <span className="text-[14px]">
                Rs. {totalAmountWithTax.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-5">
            <button className="bg-primary cursor-pointer rounded-[8px] text-[14px] px-3 py-4 w-full text-white" onClick={checkoutHandler}>
              Checkout
            </button>
          </div>
        </div>
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
