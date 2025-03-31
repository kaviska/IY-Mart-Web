"use client"
import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { validator } from "@lib/validator"; // Adjust the import path as necessary
import { fetchDataJson } from "@lib/fetch"; // Adjust the import path as necessary
import Toast from "@/compoments/Toast";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    mobile: "",
    password_confirmation: "",
    device_name: "web",
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    mobile: "",
    password_confirmation: "",
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate input
    const validationError = validator(value, name);
    setErrors({
      ...errors,
      [name]: validationError === true ? "" : (validationError as string),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    
    
    e.preventDefault();
    // Check for any remaining errors
    const newErrors = {
      email: validator(formData.email, "email") as string,
      name: validator(formData.name, "name") as string,
      password: validator(formData.password, "password") as string,
      mobile: validator(formData.mobile, "mobile") as string,
      password_confirmation:
        formData.password !== formData.password_confirmation
          ? "Passwords do not match"
          : "",
    };
    setErrors(newErrors);

    // If there is any error, return it
    if (Object.values(newErrors).some((error) => error !== "")) {
      console.log("Form contains errors:", newErrors);
      return;
    }
    console.log("Form data is valid:", formData);

    // Proceed with form submission
    const registerUser = async () => {
      try {
        console.log("Registration Processing");
        const response = await fetchDataJson("register", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        console.log("Registration successful:", response);

        // Show success toast
        setToast({
          open: true,
          message: "User Registration successful Please View Email For OTP!",
          type: "success",
        });
      } catch (error) {
        console.error("Registration failed:", error);

        // Show error toast
        setToast({
          open: true,
          message: String(error),
          type: "error",
        });
      }
    };

    registerUser();
  };

  return (
    <div className="container md:mx-5 mr-2 md:mt-5 mt-3">
      <div className="flex md:flex-row flex-col md:px-0 px-3 ">
        <div className="md:w-[50%] login-background md:h-[113vh] h-[130vh] flex md:items-end md:justify-start justify-center md:px-10 px-5 pb-28 ">
          <h2 className="text-white md:text-[64px] text-[50px] font-medium md:leading-20 leading-16 md:text-start text-center">
            Welcome To <br /> IY Mart
          </h2>
        </div>
        <div className="md:w-[50%] md:px-16 px-5 md:pt-4 pt-5 md:mt-0 mt-[-600px] mx-5 md:mx-0 rounded-[8px] bg-white md:shadow-none shadow-lg">
          <form onSubmit={handleSubmit}>
            <div>
              <h1 className="text-[40px] md:text-start text-center font-medium">
                Register
              </h1>
              <p className="text-[16px] md:text-start text-center secondary mt-2">
                Welcome! Please Register To Your Account,
                <span className="md:inline hidden">
                  {" "}
                  Please Enter Your Valid Details For Successful Registration
                </span>
              </p>
            </div>

            <div className="mt-5">
              <TextField
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px",
                    height: "50px",
                  },
                }} // Custom border radius
                slotProps={{
                  inputLabel: { sx: { fontSize: "15px" } }, // Adjust label font size
                }}
              />

              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px",
                    height: "50px",
                  },
                }} // Custom border radius
                slotProps={{
                  inputLabel: { sx: { fontSize: "15px" } }, // Adjust label font size
                }}
              />

              <TextField
                label="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                error={!!errors.mobile}
                helperText={errors.mobile}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px",
                    height: "50px",
                  },
                }} // Custom border radius
                slotProps={{
                  inputLabel: { sx: { fontSize: "15px" } }, // Adjust label font size
                }}
              />

              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px",
                    height: "50px",
                  },
                }} // Custom border radius
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                slotProps={{
                  inputLabel: { sx: { fontSize: "15px" } }, // Adjust label font size
                }}
              />

              <TextField
                label="Confirm Password"
                name="password_confirmation"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.password_confirmation}
                onChange={handleChange}
                error={!!errors.password_confirmation}
                helperText={errors.password_confirmation}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px",
                    height: "50px",
                  },
                }} // Custom border radius
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                slotProps={{
                  inputLabel: { sx: { fontSize: "15px" } }, // Adjust label font size
                }}
              />
            </div>

          

            <div className="mt-5">
              <button
                type="submit"
                className="w-full rounded-[5px] bg-primary text-white py-2 cursor-pointer"
              >
                Register
              </button>
            </div>

            <div className="mt-8 mb-4">
              <p className="text-[16px] text-[#4F4F4F]">
                Don&apos;t have an account?{" "}
                <span className="secondary">Create an account</span>
              </p>
            </div>
          </form>
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