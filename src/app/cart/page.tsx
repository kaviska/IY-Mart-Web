"use client";
import { useEffect, useState } from "react";
import CartCard from "@/compoments/CartCard";
import { fetchDataJson } from "@/lib/fetch";

export default function Cart() {
  const [cartData, setCartData] = useState<any[]>([]); // State to store cart items
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalWithDiscounts, setTotalWithDiscounts] = useState<number>(0);
const fetchGuestCart = async () => {
  try {
    // Retrieve the actual guest cart from localStorage
    const localCart = JSON.parse(localStorage.getItem("guest_cart") || '{"guest_cart": []}');

    

    // Convert the actual guest cart to a query string
    const queryParams = new URLSearchParams();
    localCart.guest_cart.forEach((item: any, index: number) => {
      queryParams.append(`guest_cart[${index}][action]`, item.action);
      queryParams.append(`guest_cart[${index}][id]`, item.id.toString());
      queryParams.append(`guest_cart[${index}][quantity]`, item.quantity.toString());
      queryParams.append(`guest_cart[${index}][stock_id]`, item.stock_id.toString());
    });

    // Send the request to the server
    const response = await fetchDataJson(`guest_carts?${queryParams}`);

    if (!response.ok) {
      throw new Error("Failed to fetch guest cart data");
    }

    const result = await response.json();
    console.log("Fetched Cart Data:", result);

    if (result.status === "success") {
      setCartData(result.data.cart_items);
      setTotalAmount(result.data.total_amount);
      setTotalWithDiscounts(result.data.total_with_discounts);
    }
  } catch (error) {
    console.error("Error fetching guest cart:", error);
  }
};
  // Update guest cart in localStorage and send a request to the server
  const updateGuestCart = async (stockId: number, quantity: number) => {
    const localCart = JSON.parse(localStorage.getItem("guest_cart") || '{"guest_cart": []}');
    const existingItemIndex = localCart.guest_cart.findIndex((item: any) => item.stock_id === stockId);

    if (existingItemIndex !== -1) {
      // Update quantity if the item exists
      localCart.guest_cart[existingItemIndex].quantity = quantity;
    } else {
      // Add new item to the cart
      localCart.guest_cart.push({ action: "add", id: 0, quantity, stock_id: stockId });
    }

    localStorage.setItem("guest_cart", JSON.stringify(localCart));
    console.log("Updated Local Cart:", localCart);

    // Send updated cart to the server
    await fetchGuestCart();
  };

  // Handle quantity change
  const handleQuantityChange = (stockId: number, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    updateGuestCart(stockId, newQuantity);
  };

  useEffect(() => {
    fetchGuestCart(); // Fetch cart data on component mount
  }, []);

  return (
    <div className="container mx-auto">
      <div className="mt-5 flex gap-9">
        {/* Cart Items Section */}
        <div className="w-[50%] flex flex-col gap-4">
          <h1 className="font-medium text-[24px] text-black">Shopping Cart</h1>
          {cartData.map((item) => (
            <CartCard
              key={item.stock_id}
              product={item.stock.product}
              quantity={item.quantity}
              price={item.stock.web_price}
              discount={item.stock.web_discount}
              onQuantityChange={(newQuantity: number) => handleQuantityChange(item.stock_id, newQuantity)}
            />
          ))}
        </div>

        {/* Order Summary Section */}
        <div className="w-[50%] border border-[#D9D9D9] px-12 py-20">
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
              <span className="text-[14px]">Rs. {totalWithDiscounts.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-5">
            <button className="bg-primary rounded-[8px] text-[14px] px-3 py-4 w-full text-white">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}