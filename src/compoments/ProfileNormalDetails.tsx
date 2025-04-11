import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

export default function ProfileNormalDetails() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    postal_code: "",
    address_line_1: "",
    address_line_2: "",
    country: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const addressData = localStorage.getItem("address");

    const parsedUser = userData ? JSON.parse(userData) : {};
    const parsedAddress = addressData ? JSON.parse(addressData) : {};

    setUser({
      name: parsedUser.name || "",
      email: parsedUser.email || "",
      mobile: parsedUser.mobile || "",
      city: parsedAddress.city || "",
      postal_code: parsedAddress.postal_code || "",
      address_line_1: parsedAddress.address_line_1 || "",
      address_line_2: parsedAddress.address_line_2 || "",
      country: parsedAddress.country || "",
    });
  }, []);

  return (
    <div>
      <div className="flex gap-6">
        <TextField
          label="Name"
          value={user.name}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "5px",
              height: "50px",
            },
          }}
          slotProps={{
            inputLabel: { sx: { fontSize: "15px" } },
          }}
        />

        <TextField
          label="Email Address"
          value={user.email}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "5px",
              height: "50px",
            },
          }}
          slotProps={{
            inputLabel: { sx: { fontSize: "15px" } },
          }}
        />
      </div>
      <div className="flex gap-6">
        <TextField
          label="Mobile Number"
          value={user.mobile}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "5px",
              height: "50px",
            },
          }}
          slotProps={{
            inputLabel: { sx: { fontSize: "15px" } },
          }}
        />
      </div>
      <div className="flex gap-6">
        <TextField
          label="City"
          value={user.city}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "5px",
              height: "50px",
            },
          }}
          slotProps={{
            inputLabel: { sx: { fontSize: "15px" } },
          }}
        />

        <TextField
          label="Postal Code"
          value={user.postal_code}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "5px",
              height: "50px",
            },
          }}
          slotProps={{
            inputLabel: { sx: { fontSize: "15px" } },
          }}
        />
      </div>
      <div className="flex gap-6">
        <TextField
          label="Address Line 1"
          value={user.address_line_1}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "5px",
              height: "50px",
            },
          }}
          slotProps={{
            inputLabel: { sx: { fontSize: "15px" } },
          }}
        />

        <TextField
          label="Address Line 2"
          value={user.address_line_2}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "5px",
              height: "50px",
            },
          }}
          slotProps={{
            inputLabel: { sx: { fontSize: "15px" } },
          }}
        />
      </div>
      <div className="flex gap-6">
        <TextField
          label="Country"
          value={user.country}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "5px",
              height: "50px",
            },
          }}
          slotProps={{
            inputLabel: { sx: { fontSize: "15px" } },
          }}
        />
      </div>
    </div>
  );
}