"use client";
import * as React from "react";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/material/Divider";
import ProductRange from "./ProductRange";
import CheckBoxWithSearchFilter from "./CheckBoxWithSearchFilter";

export default function Filter() {
  const [showPrice, setShowPrice] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  const [showBrands, setShowBrands] = useState(true);

  return (
    <div className="px-12">
      {/* Price Section */}
      <div>
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => setShowPrice((prev) => !prev)}
        >
          <h2 className="text-[18px] font-medium">Price</h2>
          <KeyboardArrowDownIcon
            className={`transition-transform duration-300 ${
              showPrice ? "rotate-180" : ""
            }`}
          />
        </div>
        {showPrice && (
          <div className="transition-all duration-300">
            <div className="my-3">
              <Divider />
            </div>
            <ProductRange />
          </div>
        )}
      </div>

      {/* Category Section */}
      <div className="mt-5">
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => setShowCategory((prev) => !prev)}
        >
          <h2 className="text-[18px] font-medium">Category</h2>
          <KeyboardArrowDownIcon
            className={`transition-transform duration-300 ${
              showCategory ? "rotate-180" : ""
            }`}
          />
        </div>
        {showCategory && (
          <div className="transition-all duration-300">
            <div className="my-3">
              <Divider />
            </div>
            <CheckBoxWithSearchFilter type="categories" searchAvailable={true} />
          </div>
        )}
      </div>

      {/* Brand Section */}
      <div className="mt-5">
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => setShowBrands((prev) => !prev)}
        >
          <h2 className="text-[18px] font-medium">Brand</h2>
          <KeyboardArrowDownIcon
            className={`transition-transform duration-300 ${
              showBrands ? "rotate-180" : ""
            }`}
          />
        </div>
        {showBrands && (
          <div className="transition-all duration-300">
            <div className="my-3">
              <Divider />
            </div>
            <CheckBoxWithSearchFilter type="brands" searchAvailable={true} />
          </div>
        )}
      </div>
    </div>
  );
}