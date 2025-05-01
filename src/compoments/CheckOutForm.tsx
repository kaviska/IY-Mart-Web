"use client";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { fetchDataJson } from "@lib/fetch"; // Adjust the import path as necessary
import { validator } from "@lib/validator"; // Import the validator function
import { useEffect, useState } from "react";
import Toast from "@/compoments/Toast"; // Adjust the import path as necessary
import Divider from "@mui/material/Divider";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Autocomplete from "@mui/material/Autocomplete";

// Common styles for TextField
const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
    height: "50px",
  },
};

interface Prefecture {
  id: string;
  prefecture_name: string;
}
interface Region {
  id: string;
  name: string;
}

// Common slotProps for TextField
const textFieldSlotProps = {
  inputLabel: { sx: { fontSize: "15px" } }, // Adjust label font size
};

export default function CheckOutForm() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("card"); // Default payment method
  const userId = (() => {
    try {
      let user;
      if (typeof window !== "undefined") {
        user = localStorage.getItem("user");
      }

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
    postal_code: "",
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

  useEffect(() => {
    loadRegions();
  }, []);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      console.log("user Avalilable", localStorage.getItem("user"));
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const address = JSON.parse(localStorage.getItem("address") || "{}");
      setSelectedRegion(address.region.id);
      setFormData((prevData) => ({
        ...prevData,
        region_id: address.region.id, // Update region_id in formData
        prefecture_id: "", // Reset prefecture_id when region changes
      }));
      setPrefectures([]); // Clear prefectures when region changes
      if (address.region.id) {
        loadPerfectures(address.region.id); // Load prefectures for the selected region
      }

      setFormData((prevData) => ({
        ...prevData,
        user_id: user.id,
        email: user.email,
        mobile: user.mobile,
        name: user.name,
        city: address.city,
        prefecture_id: address.prefecture.id,
        region_id: address.region.id,
        postal_code: address.postal_code,
        address_line_1: address.address_line_1,
        address_line_2: address.address_line_2,
      }));
    }
  }, []);

  useEffect(() => {
    //is guest cart is empty show tost messgae and rdirect to the shop page
    const localCart = JSON.parse(
      localStorage.getItem("guest_cart") || '{"guest_cart": []}'
    );
    if (localCart.guest_cart.length === 0) {
      setToast({
        open: true,
        message: "Your cart is empty. Please add items to your cart.",
        type: "error",
      });
      setTimeout(() => {
        window.location.href = "/shop"; // Redirect to the shop page
      }, 3000); // Redirect after 3 seconds
    }
  }, []);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      const prefecture = await fetchDataJson<{
        result: string;
        data: any[];
        status: string;
      }>(`prefectures?region_id=${regionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (prefecture.status === "success") {
        setPrefectures(prefecture.data);
      }
    } catch (error) {
      console.error("Error loading prefectures:", error);
    }
  };

  const [postalCodes, setPostalCodes] = useState<string[]>([]); // Store fetched postal codes
  const [postalCodeWithCity, setPostalCodeWithCity] = useState<{ postal_code: string; city_name: string }[]>([]); // Store fetched postal codes with city

  const handlePrefectureChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const prefectureId = event.target.value;
    const selectedPrefecture = prefectures.find((p) => p.id === prefectureId);

    setFormData((prevData) => ({
      ...prevData,
      prefecture_id: prefectureId, // Update prefecture_id in formData
      postal_code: "", // Reset postal_code when prefecture changes
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      postal_code: "", // Clear postal_code errors
    }));
if (selectedPrefecture) {
  try {
    const postalData = await fetchDataJson<{
      status: string;
      data: { data: { postal_code: string; city_name_en: string }[] };
    }>(
      `postal-data?prefecture_name=${selectedPrefecture.prefecture_name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (postalData.status === "success") {
      // Extract postal codes and cities from the response
      const postalCodesList = postalData.data.data.map((item) => ({
        postal_code: item.postal_code,
        city_name: item.city_name_en,
      }));

      setPostalCodeWithCity(postalCodesList); // Store postal codes with city
      setPostalCodes(postalCodesList.map((item) => item.postal_code)); // Store only postal codes
    } else {
      setPostalCodes([]);
      setPostalCodeWithCity([]);
    }
  } catch (error) {
    console.error("Error loading postal codes:", error);
    setPostalCodes([]);
    setPostalCodeWithCity([]);
  }
} else {
  setPostalCodes([]);
  setPostalCodeWithCity([]);
}
  };
  const handlePostalCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
  
    // Find the city corresponding to the selected postal code
    const selectedPostalCode = postalCodeWithCity.find(
      (item) => item.postal_code === value
    );
  
    if (selectedPostalCode || value === "") {
      setFormData((prevData) => ({
        ...prevData,
        postal_code: value,
        city: selectedPostalCode ? selectedPostalCode.city_name : "", // Set city automatically
      }));
  
     
    } else {
     
    }
  };

  const loadRegions = async () => {
    try {
      const region = await fetchDataJson<{
        result: string;
        data: any[];
        status: string;
      }>("regions", {
        method: "GET",
      });
      if (region.status === "success") {
        setRegions(region.data);
      }
    } catch (error) {
      console.error("Error loading regions:", error);
    }
  };

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

    const errors = Object.keys(formData).reduce(
      (acc, key) => {
        if (!formData[key as keyof typeof formData]) {
          acc[key as keyof typeof formErrors] = "This field is required";
        } else {
          const validationError = validator(
            formData[key as keyof typeof formData],
            key
          );
          if (typeof validationError === "string")
            acc[key as keyof typeof formErrors] = validationError;
        }
        return acc;
      },
      { ...formErrors }
    );

    setFormErrors(errors);
    console.log(errors);
    let localCart;

    if (typeof window !== "undefined") {
      localCart = JSON.parse(
        localStorage.getItem("guest_cart") || '{"guest_cart": []}'
      );
    }

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
      let token;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("user-token") || null;
      }

      console.log("user token when sending the request", token);
      const response = await fetch(
        "https://apivtwo.iymart.jp/api/place-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(token && { Authorization: `Bearer ${token}` }), // Include token if available
          },
          body: JSON.stringify(orderData),
        }
      );

      const result = await response.json();

      console.log(result);

      if (result.status === "success") {
        setToast({
          open: true,
          message: "Order placed successfully!",
          type: "success",
        });
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "payment_intent",
            result.data?.payment.paymentIntent || ""
          );
          console.log("Payment Intent:", result.data?.payment.paymentIntent);
          console.log("user", result.data?.user);
          console.log("user-token", result.data?.user.token);

          if (result.data?.user?.token) {
            localStorage.setItem("user-token", result.data.user.token);
          }
          localStorage.setItem("user", JSON.stringify(result.data?.user) || "");
          localStorage.setItem(
            "address",
            JSON.stringify(result.data?.address) || ""
          );
          localStorage.setItem(
            "orderId",
            result.data?.payment.order_details?.id ?? ""
          );
          localStorage.setItem(
            "payment",
            JSON.stringify(result.data?.payment) || ""
          );
          //set payment method in local stoage
          console.log("Payment Method:", paymentMethod);
          localStorage.setItem("paymentMethod", paymentMethod);
          // localStorage.setItem("user", result.data?.user || "");
          console.log("User Token:", localStorage.getItem("user-token"));

          console.log("token", localStorage.getItem("user-token"));
          localStorage.removeItem("guest_cart");

          //clear the perfecture
          setFormData({
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
            user_id: userId ? userId : null,
          });
          setSelectedRegion("");
          setPrefectures([]);
          setPostalCodes([]);
          setFormErrors({
            city: "",
            prefecture_id: "",
            region_id: "",
            address_line_1: "",
            address_line_2: "",
            name: "",
            email: "",
            mobile: "",
            postal_code: "",
          });
        }

        // console.log("User Data:", localStorage.getItem("user"));

        // Redirect to the step2
        window.location.href = "/checkout/step2";
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
      console.error("Error placing order:", error);
      setToast({
        open: true,
        message:
          "Order Create Failed. Please check your details and try again.",
        type: "error",
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="flex md:flex-row flex-col gap-3">
          <TextField
            select
            label="Region"
            name="region_id"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={textFieldSx}
            slotProps={textFieldSlotProps}
            value={selectedRegion} // Set selectedRegion value from formData
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
            onChange={handlePrefectureChange} // Handle prefecture selection
            sx={textFieldSx}
            slotProps={textFieldSlotProps}
            disabled={!selectedRegion} // Disable if no region is selected
            error={!!formErrors.prefecture_id}
            helperText={formErrors.prefecture_id}
            value={formData.prefecture_id} // Set prefecture_id value from formData
          >
            {prefectures.map((prefecture) => (
              <MenuItem key={prefecture.id} value={prefecture.id}>
                {prefecture.prefecture_name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="flex md:flex-row flex-col gap-3">
                                           <Autocomplete
                        disablePortal
                        options={postalCodes} // Use the postalCodes state as options
                        value={formData.postal_code} // Set the selected postal code from formData
                        getOptionLabel={(option) => option} // Display the postal code as the label
                        sx={{ width: "100%", marginTop: "16px" }} // Adjust width and margin as needed
                        disabled={!formData.prefecture_id} // Disable if no prefecture is selected
                        onChange={(event, value) => {
                          // Update formData when a postal code is selected
                          const selectedPostalCode = postalCodeWithCity.find(
                            (item) => item.postal_code === value
                          );
                      
                          setFormData((prevData) => ({
                            ...prevData,
                            postal_code: value || "", // Set the selected postal code or empty if cleared
                            city: selectedPostalCode ? selectedPostalCode.city_name : "", // Set city automatically
                          }));
                      
                          setFormErrors((prevErrors) => ({
                            ...prevErrors,
                            postal_code: "", // Clear postal_code errors
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Postal Code"
                            variant="outlined"
                            error={!!formErrors.postal_code}
                            helperText={formErrors.postal_code}
                            sx={textFieldSx}
                          />
                        )}
                      />
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
            value={formData.city} // Set city value from formData
          />
         
        </div>
        <div className="flex md:flex-row flex-col gap-3">
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
            value={formData.address_line_1} // Set address_line_1 value from formData
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
            value={formData.address_line_2} // Set address_line_2 value from formData
          />
        </div>
        <div className="flex md:flex-row flex-col gap-3">
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
            value={formData.name} // Set name value from formData
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
            value={formData.email} // Set email value from formData
          />
        </div>
        <div className="flex md:flex-row flex-col gap-3">
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
            value={formData.mobile} // Set mobile value from formData
          />
        </div>
        <div className="mt-5">
          <div className="mb-5">
            <Divider />
          </div>
          <div className="px-4 mb-5">
            <RadioGroup
              row
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              sx={{ gap: { xs: 2, md: 4 } }} // Reduce gap on smaller screens
            >
              <FormControlLabel
                value="card"
                control={<Radio color="success" />}
                label={<span style={{ fontSize: "15px" }}>Card Payment</span>}
              />
              <FormControlLabel
                value="cash_on_delivery"
                control={<Radio color="success" />}
                label={
                  <span style={{ fontSize: "15px" }}>Cash On Delivery</span>
                }
              />
              <FormControlLabel
                value="bank_transfer"
                control={<Radio color="success" />}
                label={<span style={{ fontSize: "15px" }}>Bank Transfer</span>}
              />
              <FormControlLabel
                value="home_delivery_2"
                control={
                  <Radio
                    color="success"
                    disabled={
                      ![
                       "CHIBA KEN",
                            "SAITAMA KEN",
                            "TOKYO TO",
                            "IBARAKI KEN",
                            "KANAGAWA KEN",
                      ].includes(
                        prefectures.find((p) => p.id === formData.prefecture_id)
                          ?.prefecture_name || ""
                      )
                    }
                  />
                }
                label={<span style={{ fontSize: "15px" }}>Home Delivery</span>}
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
