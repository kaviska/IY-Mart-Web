"use client";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

function valuetext(value: number) {
  return `${value}`;
}

export default function ProductRange() {
  const [value, setValue] = React.useState<number[]>([1000, 4000]); // Initial state set to [1000, 4000]
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = [...value];
    newValue[index] =
      event.target.value === "" ? 0 : Number(event.target.value);
    setValue(newValue);
  };

  const handleBlur = (index: number) => {
    const newValue = [...value];
    if (newValue[index] < 50) {
      newValue[index] = 50; // Minimum value is 50
    } else if (newValue[index] > 5000) {
      newValue[index] = 5000; // Maximum value is 5000
    }
    setValue(newValue);
  };

  // Update the URL when the price range changes
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("price_range", `${value[0]}-${value[1]}`);
    router.push(`?${params.toString()}`);
  }, [value, router, searchParams]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[14px] text-[#A7A7A7]">From</span>
          <Input
            value={value[0]}
            size="small"
            onChange={(e) => handleInputChange(e, 0)}
            onBlur={() => handleBlur(0)}
            inputProps={{
              step: 50, // Increment by 50
              min: 50, // Minimum value is 50
              max: 5000, // Maximum value is 5000
              type: "number",
              "aria-labelledby": "input-slider",
              style: { fontSize: "14px" },
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[14px] text-[#A7A7A7]">To</span>
          <Input
            value={value[1]}
            size="small"
            onChange={(e) => handleInputChange(e, 1)}
            onBlur={() => handleBlur(1)}
            inputProps={{
              step: 50, // Increment by 50
              min: 50, // Minimum value is 50
              max: 5000, // Maximum value is 5000
              type: "number",
              "aria-labelledby": "input-slider",
              style: { fontSize: "14px" },
            }}
          />
        </div>
      </div>
      <div className="mt-4">
        <Slider
          size="small"
          getAriaLabel={() => "Price range"}
          color="success"
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={50} // Minimum value is 50
          max={5000} // Maximum value is 5000
          step={50} // Increment by 50
        />
      </div>
    </div>
  );
}