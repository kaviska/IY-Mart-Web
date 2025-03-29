import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input"; // Import Input component
import * as React from "react";

function valuetext(value: number) {
  return `${value}°C`;
}

export default function ProductRange() {
  const [value, setValue] = React.useState<number[]>([20, 37]);

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
    if (newValue[index] < 0) {
      newValue[index] = 0;
    } else if (newValue[index] > 100) {
      newValue[index] = 100;
    }
    setValue(newValue);
  };

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
              step: 10,
              min: 0,
              max: 100,
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
              step: 10,
              min: 0,
              max: 100,
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
        getAriaLabel={() => "Temperature range"}
        color="success"
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={100}
      />
      </div>
     
    </div>
  );
}
