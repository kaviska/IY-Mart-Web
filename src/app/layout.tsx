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

  // Define custom meta tags for specific routes
  const metaTags: Record<string, { title: string; description: string }> = {
    "/shop": {
      title: "Shop Online - Fresh Groceries & Essentials | IYMart",
      description:
        "Discover a wide range of fresh groceries, organic produce, and household essentials at IYMart. Shop online and enjoy fast delivery and great prices.",
    },
    default: {
      title: "IYMart - Your Trusted Online Grocery Store",
      description:
        "Shop fresh groceries, organic produce, and household essentials at IYMart. Enjoy fast delivery, great prices, and a seamless shopping experience.",
    },
  };

  const currentMeta = metaTags[pathname] ?? metaTags.default;

  return (
    <html lang="en">
      <head>
        <title>{currentMeta.title}</title>
        <meta name="description" content={currentMeta.description} />
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