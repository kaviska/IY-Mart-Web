"use client";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { fetchDataJson } from "@lib/fetch"; // Adjust the import path as necessary
import { validator } from "@lib/validator"; // Import the validator function
import { useEffect, useState } from "react";
import Toast from "@/compoments/Toast"; // Adjust the import path as necessary
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';


// Common styles for TextField
const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
    height: "50px",
  },
};

// Common slotProps for TextField
const textFieldSlotProps = {
  inputLabel: { sx: { fontSize: "15px" } }, // Adjust label font size
};

export default function CheckOutForm() {
  const [prefectures, setPrefectures] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card"); // Default payment method
  const userId = (() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user).id : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  })();

  const [formData, setFormData] = useState({
    city: "",
    prefecture_id: "",
    region_id: "",
    postal_code: "",
    address_line_1: "",
    address_line_2: "",
    name: "",
    email: "",
    mobile: "",
    device_name: "web",
    user_id: userId ? userId : null, // Use userId from localStorage
  });

  const [formErrors, setFormErrors] = useState({
    city: "",
    prefecture_id: "",
    region_id: "",
    
    address_line_1: "",
    address_line_2: "",
    name: "",
    email: "",
    mobile: "",
  });

  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    type: "success", // 'success', 'error', 'info', 'warning'
  });

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;

  // Update form data immediately
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));

  // Handle validation
   
    const error = validator(value, name); // Synchronous validation for other fields
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: typeof error === "string" ? error : "",
    }));
  
};

  const loadPerfectures = async (regionId: string) => {
    try {
      const prefecture = await fetchDataJson<{ result: string; data: any[] }>(
        `prefectures?region_id=${regionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (prefecture.status === "success") {
        setPrefectures(prefecture.data);
      }
    } catch (error) {
      console.error("Error loading prefectures:", error);
    }
  };

  const loadRegions = async () => {
    try {
      const region = await fetchDataJson<{ result: string; data: any[] }>(
        "regions",
        {
          method: "GET",
        }
      );
      if (region.status === "success") {
        setRegions(region.data);
      }
    } catch (error) {
      console.error("Error loading regions:", error);
    }
  };

  useEffect(() => {
    loadRegions();
  }, []);

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regionId = event.target.value;
    setSelectedRegion(regionId);
    setFormData((prevData) => ({
      ...prevData,
      region_id: regionId, // Update region_id in formData
      prefecture_id: "", // Reset prefecture_id when region changes
    }));
    setPrefectures([]); // Clear prefectures when region changes
    if (regionId) {
      loadPerfectures(regionId); // Load prefectures for the selected region
    }
  };

  const handlePlaceOrder = async () => {
    // Check for empty fields and validation errors

    const errors = Object.keys(formData).reduce((acc, key) => {
      if (!formData[key as keyof typeof formData]) {
        acc[key] = "This field is required";
      } else {
        const validationError = validator(formData[key as keyof typeof formData], key);
        if (validationError) acc[key] = validationError;
      }
      return acc;
    }, {} as Record<string, string>);

    setFormErrors(errors);
    console.log(errors)

    // // If there are errors, do not proceed
    // if (
    //   Object.entries(errors).some(
    //     ([key, error]) => error && key !== "postal_code" && key !== "user_id"
    //   )
    // ) {
    //   return;
    // }

    const localCart = JSON.parse(
      localStorage.getItem("guest_cart") || '{"guest_cart": []}'
    );
    const cartItems = localCart.guest_cart.map((item: any) => ({
      stock_id: item.stock_id,
      quantity: item.quantity,
    }));

    const orderData = {
      userData: {
        ...formData,
      },
      paymentData: {
        due_date: "2027-03-31 15:49:06",
        payment_method: paymentMethod,
      },
      cart_items: cartItems,
    };
    console.log("Order Data:", orderData);

    try {
      const response = await fetch("https://iymart.jp/api/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      
      console.log(result);
      
      if (result.status === "success") {
        setToast({
          open: true,
          message: "Order placed successfully!",
          type: "success",
        });
        localStorage.setItem('payment_intent', result.data?.payment.paymentIntent || "");
        console.log("Payment Intent:", result.data?.payment.paymentIntent);
        console.log('user', result.data?.user);
        console.log('user-token', result.data?.user.token);
        

        

        localStorage.setItem("user-token", result.data?.user?.token || "");
        // localStorage.setItem("user", result.data?.user || "");
        console.log("User Token:", localStorage.getItem("user-token"));

        // console.log("User Data:", localStorage.getItem("user"));

        
       // Redirect to the step2
        //window.location.href = "/checkout/step2";
        return;
      } else if (result.status === "error" && result.errors) {
        const firstErrorKey = Object.keys(result.errors)[0];
        const firstErrorMessage = result.errors[firstErrorKey][0];
        setToast({
          open: true,
          message: firstErrorMessage,
          type: "error",
        });
      }

      console.log("Order Response:", result);
    } catch (error: any) {
      console.error("Error placing order:",error);
      setToast({
        open: true,
        message: "Order Create Failed. Please check your details and try again.",
        type: "error",
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-3">
          <TextField
            select
            label="Region"
            name="region_id"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={textFieldSx}
            slotProps={textFieldSlotProps}
            value={selectedRegion}
            onChange={handleRegionChange} // Handle region selection
            error={!!formErrors.region_id}
            helperText={formErrors.region_id}
          >
            {regions.map((region) => (
              <MenuItem key={region.id} value={region.id}>
                {region.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Prefecture"
            name="prefecture_id"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleInputChange} // Handle prefecture selection
            sx={textFieldSx}
            slotProps={textFieldSlotProps}
            disabled={!selectedRegion} // Disable if no region is selected
            error={!!formErrors.prefecture_id}
            helperText={formErrors.prefecture_id}
          >
            {prefectures.map((prefecture) => (
              <MenuItem key={prefecture.id} value={prefecture.id}>
                {prefecture.prefecture_name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="flex gap-3">
          <TextField
            label="City"
            name="city"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleInputChange}
            sx={textFieldSx}
            slotProps={textFieldSlotProps}
            error={!!formErrors.city}
            helperText={formErrors.city}
          />
          <TextField
            label="Postal Code"
            name="postal_code"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleInputChange}
            sx={textFieldSx}
            slotProps={textFieldSlotProps}
          
          />
        </div>
        <div className="flex gap-3">
          <TextField
            label="Address Line 1"
            name="address_line_1"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleInputChange}
            sx={textFieldSx}
            slotProps={textFieldSlotProps}
            error={!!formErrors.address_line_1}
            helperText={formErrors.address_line_1}
          />
          <TextField
            label="Address Line 2"
            name="address_line_2"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleInputChange}
            sx={textFieldSx}
            slotProps={textFieldSlotProps}
            error={!!formErrors.address_line_2}
            helperText={formErrors.address_line_2}
          />
        </div>
        <div className="flex gap-3">
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleInputChange}
            sx={textFieldSx}
            slotProps={textFieldSlotProps}
            error={!!formErrors.name}
            helperText={formErrors.name}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleInputChange}
            sx={textFieldSx}
            slotProps={textFieldSlotProps}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
        </div>
        <div className="flex gap-3">
          <TextField
            label="Mobile"
            name="mobile"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleInputChange}
            sx={textFieldSx}
            slotProps={textFieldSlotProps}
            error={!!formErrors.mobile}
            helperText={formErrors.mobile}
          />
        </div>
        <div className='mt-5'>
          <div className='mb-5'>
                 <Divider/>          
          </div>
            <div className="px-4 mb-5">
            <RadioGroup
              row
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              sx={{ gap: 4 }} // Increase the gap between radio items
            >
              <FormControlLabel
              value="card"
              control={<Radio color="success" />}
              label={<span style={{ fontSize: "15px" }}>Card Payment</span>}
              />
              <FormControlLabel
              value="cash_on_delivery"
              control={<Radio color="success" />}
              label={<span style={{ fontSize: "15px" }}>Cash On Delivery</span>}
              />
              <FormControlLabel
              value="bank_transfer"
              control={<Radio color="success" />}
              label={<span style={{ fontSize: "15px" }}>Bank Transfer</span>}
              />
            </RadioGroup>
            </div>

        </div>
        <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
          Place Order
        </Button>
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