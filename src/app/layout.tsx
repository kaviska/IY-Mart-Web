"use client";
import { usePathname } from "next/navigation";
import Nav from "@/compoments/Nav";
import Footer from "@/compoments/Footer";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme"; // Adjust the path to your theme file

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define routes where the Nav and footer should be hidden
  const noLayoutRoutes = ["/login", "/register", "/otp"]; // Add more routes if needed

  const shouldShowLayout = !noLayoutRoutes.includes(pathname);

  return (
    <html lang="en">
      <head>
        <title>IYMart - Your Trusted Online Grocery Store</title>
        <meta
          name="description"
          content="Shop fresh groceries, organic produce, and household essentials at IYMart. Enjoy fast delivery, great prices, and a seamless shopping experience."
        />
        <meta name="apple-mobile-web-app-title" content="IYMart" />
      </head>
      <body>
        {shouldShowLayout && <Nav />}
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
        {shouldShowLayout && <Footer />}
      </body>
    </html>
  );
}