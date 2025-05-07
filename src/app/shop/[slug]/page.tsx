"use client";

import CanImage from "@public/Can.svg";
import DownArrowImage from "@public/DownArrow.svg";

import { useEffect, useState } from "react";
import { fetchDataJson } from "@/lib/fetch";
import calculatePrice from "@/lib/priceCalcuator";
import discountCalcuator from "@/lib/discountCalcuator";
import type { ProductType } from "@/types/type";
import Slider from "@/compoments/SliderProduct";
import Toast from "@/compoments/Toast";

export default function SingleProductPage() {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const [quantity, setQuantity] = useState<number>(1); // State for quantity
  const [showFullDescription, setShowFullDescription] =
    useState<boolean>(false); // State for toggling description
  const [selectedVariation, setSelectedVariation] = useState<
    ProductType["stocks"][0] | null
  >(null); // State for selected variation
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    type: "success", // 'success', 'error', 'info', 'warning'
  });

  const updateGuestCart = (
    action: string,
    productId: number,
    quantity: number,
    stockId: number
  ) => {
    let cart;
    if (typeof window !== "undefined") {
      cart = JSON.parse(
        localStorage.getItem("guest_cart") || '{"guest_cart": []}'
      );
    }

    const existingItemIndex = cart.guest_cart.findIndex(
      (item: { id: number; stock_id: number }) =>
        item.id === productId && item.stock_id === stockId
    );

    if (existingItemIndex !== -1) {
      // Update quantity if the item already exists
      cart.guest_cart[existingItemIndex].quantity = quantity;
    } else {
      // Add new item to the cart
      cart.guest_cart.push({
        action,
        id: productId,
        quantity,
        stock_id: stockId,
      });
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("guest_cart", JSON.stringify(cart));
    }

    console.log("Updated Cart:", cart);
  };
  const handleAddToCart = () => {
    if (!product || !selectedVariation) return;

    updateGuestCart("add", product.id, quantity, selectedVariation.id);
    setToast({
      open: true,
      message: "Product added to cart",
      type: "success",
    });
  };
  const handlleBuyNow = () => {
    if (!product || !selectedVariation) return;

    updateGuestCart("add", product.id, quantity, selectedVariation.id);
    setToast({
      open: true,
      message: "Processing Checkout",
      type: "success",
    });
    // Redirect to checkout page
    window.location.href = "/checkout/step1"; // Replace with your actual checkout URL
  };

  const handleVariationChange = (variation: ProductType["stocks"][0]) => {
    setSelectedVariation(variation); // Update selected variation
    if (product) {
      updateGuestCart("add", product.id, quantity, variation.id);
    }
  };
  const calculateFinalPrice = (
    variation: ProductType["stocks"][0] | null,
    quantity: number
  ) => {
    if (!variation) return null;
    const discountedPrice = variation.web_price - (variation.web_discount || 0);
    return {
      pricePerUnit: discountedPrice,
      totalPrice: discountedPrice * quantity,
    };
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const slug = window.location.pathname.split("/").pop();
        console.log(slug);
        const productResult = await fetchDataJson<{ data: ProductType[] }>(
          `products?slug=${slug}`,
          { method: "GET" }
        );
        console.log("Product List", productResult);
        setProduct(productResult.data[0]);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Runs only once when the component mounts

  useEffect(() => {
    if (product && product.stocks.length > 0) {
      setSelectedVariation(product.stocks[0]); // Automatically select the first variation
    }
  }, [product]); // Runs whenever `product` changes

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return; // Ensure product is loaded before fetching related products

      try {
        const relatedProductsResult = await fetchDataJson<{
          data: ProductType[];
        }>(`products`, { method: "GET" });
        console.log("Related Products List", relatedProductsResult);
        setRelatedProducts(relatedProductsResult.data);
      } catch (error) {
        console.log("Error fetching related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [product]); // Runs whenever `product` changes

  const handleQuantityChange = (value: number) => {
    if (value < 1) return; // Prevent quantity from going below 1
    setQuantity(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
    if (product && selectedVariation) {
      updateGuestCart("add", product.id, value, selectedVariation.id);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="my-5">
      <div className="flex md:flex-row flex-col container mx-auto md:px-0 px-10">
        <div className="md:w-[50%] flex md:flex-row flex-col gap-10 cursor-pointer">
          <img
            src={
              product?.primary_image
                ? "https://apivtwo.iymart.jp/" + product.primary_image
                : CanImage
            }
            alt="can"
            width={100}
            height={100}
            className="md:self-start md:order-1 order-2 self-center"
          ></img>
          <img
            src={
              product?.primary_image
                ? "https://apivtwo.iymart.jp/" + product.primary_image
                : CanImage
            }
            alt="can"
            width={400}
            height={400}
            className="md:order-2 order-1"
          ></img>
        </div>
        <div className="md:w-[50%]">
          <h1 className="md:text-[40px] text-[34px] font-bold order-1">
            {product?.name || ""}
          </h1>
          <div className="flex flex-col gap-3 mt-0">
            {discountCalcuator(product?.stocks || []) ? (
              <div className="flex items-center gap-3">
                <span className="text-[16px] text-[#A4A4A4] line-through">
                ¥ {calculatePrice(product?.stocks || [])}
                </span>
                <span className="md:text-[32px] text-[28px] text-[#27AE60] font-bold">
                ¥ {discountCalcuator(product?.stocks || [])}
                </span>
              </div>
            ) : (
              <span className="md:text-[32px] text-[28px] mt-5">
                ¥ {calculatePrice(product?.stocks || [])}
              </span>
            )}
          </div>

          <div className="flex gap-8 mt-10">
            <div className="flex gap-3">
                <div className="bg-primary px-2 py-3 rounded-[11px]">
                  <img
                  src="/Truck.svg"
                  alt="truck"
                  width={20}
                  height={20}
                  />
                </div>
              <div className="text-[14px] flex flex-col gap-0">
                <span className="text-[#A4A4A4]">Fast Delivery</span>
                <span>1-7 Day</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-primary px-2 py-2 rounded-[11px]">
                <img
                  src="/Shop.svg"
                  alt="shop"
                  width={20}
                  height={20}
                ></img>
              </div>
              <div className="text-[14px] flex flex-col gap-0">
                <span className="text-[#A4A4A4]">Cash on Delivery</span>
                <span>1-7 Day</span>
              </div>
            </div>
          </div>

                                   <div className="mt-5">
                    <label
                      htmlFor="variation"
                      className="block text-[16px] font-medium mb-3"
                    >
                      Select Variation:
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        ...new Map(
                          // Reverse the stocks array to prioritize the last occurrence
                          product?.stocks
                            .slice()
                            .reverse()
                            .map((stock) => [
                              stock.variation_stocks[0]?.variation_option.id,
                              stock,
                            ])
                        ).values(),
                      ].map((stock) => (
                        <button
                          key={stock.id}
                          className={`px-4 py-2 border cursor-pointer border-gray-300 rounded-full text-[14px] transition duration-200 ${
                            selectedVariation?.id === stock.id
                              ? "bg-primary text-white"
                              : "hover:bg-primary hover:text-blue-500"
                          }`}
                          onClick={() => handleVariationChange(stock)}
                        >
                          {stock.variation_stocks[0]?.variation_option.name || "Default"}
                        </button>
                      ))}
                    </div>
                  </div>

          <div className="flex flex-col md:flex-row gap-5 mt-7 items-stretch">
            {/* Price Section */}
            <div className="RealPriceSection flex-2 bg-white px-6 py-3 rounded-lg shadow-lg border border-gray-200">
              {selectedVariation ? (
                <>
                  <div className="text-[20px] font-bold text-[#27AE60]">
                  ¥{" "}
                    {calculateFinalPrice(
                      selectedVariation,
                      quantity
                    )?.pricePerUnit.toFixed(2)}
                  </div>
                  {selectedVariation.web_discount > 0 && (
                    <div className="text-[12px] text-gray-500 line-through mt-1">
                      ¥ {selectedVariation.web_price.toFixed(2)}
                    </div>
                  )}
                  <div className="text-[16px] font-medium mt-2">
                    Total:{" "}
                    <span className="text-[16px] font-bold text-[#27AE60]">
                    ¥{" "}
                      {calculateFinalPrice(
                        selectedVariation,
                        quantity
                      )?.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-[16px] text-gray-500">
                  Please select a variation
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-1 items-center justify-between bg-white md:w-[30%] w-full px-4 py-3 rounded-lg shadow-lg border border-gray-200">
              <button
                className="w-10 h-10 flex justify-center items-center text-[20px] font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full transition duration-200"
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                -
              </button>
              <input
                type="number"
                className="w-16 text-center border border-gray-300 rounded-md text-[18px] font-medium outline-none focus:ring-2 focus:ring-primary"
                value={quantity}
                onChange={handleInputChange}
              />
              <button
                className="w-10 h-10 flex justify-center items-center text-[20px] font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full transition duration-200"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex md:flex-row flex-col mt-7 md:gap-12 gap-5">
            <button
              onClick={handleAddToCart}
              className="border cursor-pointer hover:text-white hover:bg-[#2F80ED] border-[#27AE60] text-[#27AE60] text-[16px] px-16 py-2"
            >
              Add to Cart
            </button>
            <button
              onClick={handlleBuyNow}
              className="bg-[#2F80ED] cursor-pointer hover:bg-[#27AE60] text-white text-[16px] px-16 py-2"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#FAFAFA] md:px-20 px-10 py-0 mt-10">
        <div className="bg-white md:p-10">
          <h3 className="text-[24px]">Details</h3>
          <p className="text-[#9D9D9D] text-[14px] mt-5">
            {product?.description
              ? showFullDescription
                ? product.description
                : product.description.split(" ").slice(0, 60).join(" ") + "..."
              : "Loading..."}
          </p>
          {product?.description &&
            product.description.split(" ").length > 60 && (
              <div className="flex justify-center mt-10">
                <button
                  className="text-[16px] px-16 py-2 border border-black flex justify-center gap-3"
                  onClick={toggleDescription}
                >
                  {showFullDescription ? "View Less" : "View More"}
                  <img
                    src={DownArrowImage}
                    width={15}
                    height={15}
                    alt="arrow"
                  ></img>
                </button>
              </div>
            )}
        </div>
      </div>
      <div className="mt-10 container mx-auto md:px-0 px-10">
        <h3 className="text-[24px]">Related Products</h3>
        <div className="flex justify-between flex-wrap mt-5">
          <Slider ProductArray={relatedProducts} sliderPerView={4} />
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
