// components/WhatsAppButton.tsx
"use client";
import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { IconButton, Box, Tooltip } from "@mui/material";

const WhatsAppButton = () => {
  const phoneNumber = "94771234567"; // Replace with your number
  const message = "Hi! I'm interested in your products.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1300,
      }}
    >
      <Tooltip title="Chat with us" placement="left">
        <IconButton
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: "#25D366",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1ebe5d",
            },
            boxShadow: 3,
            width: 56,
            height: 56,
          }}
        >
          <WhatsAppIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default WhatsAppButton;
