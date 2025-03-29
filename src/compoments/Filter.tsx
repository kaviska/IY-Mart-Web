"use client";
import * as React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/material/Divider";
import ProductRange from "./ProductRange";
import CheckBoxWithSearchFilter from "./CheckBoxWithSearchFilter";

export default function Filter() {
  return (
    <div className="px-12">
      <div>
        <div className="flex justify-between">
          <h2 className="text-[18px] font-medium">Price</h2>
          <KeyboardArrowDownIcon />
        </div>
        <div className="my-3">
          <Divider />
        </div>

        <ProductRange />
      </div>
      <div className="mt-5">
        <div className="flex justify-between">
          <h2 className="text-[18px] font-medium">Category</h2>
          <KeyboardArrowDownIcon />
        </div>
        <div className="my-3">
          <Divider />
        </div>

        <CheckBoxWithSearchFilter type={'categories'} searchAvailable={true} />
      </div>

      <div className="mt-5">
        <div className="flex justify-between">
          <h2 className="text-[18px] font-medium">Brand</h2>
          <KeyboardArrowDownIcon />
        </div>
        <div className="my-3">
          <Divider />
        </div>

        <CheckBoxWithSearchFilter type="brands" searchAvailable={true} />
      </div>
    </div>
  );
}
