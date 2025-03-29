"use client";
import ProductCard from "./ProductCard";
import Pagination from "@mui/material/Pagination";
import { fetchDataJson } from "@lib/fetch"; // Adjust the import path as necessary
import { useEffect, useState } from "react";

export default function ShopAllProduct() {
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Change this value to adjust products per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await fetchDataJson("products", { method: "GET" });
        setProducts(result.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <div className="flex flex-wrap gap-y-3 gap-x-3 justify-center">
        {currentProducts.map((product, index) => (
          <ProductCard
            key={product.id || index}
            product={{
              id: product.id,
              name: product.name || `Product ${index + 1}`,
              price: product.stocks[0]?.web_price || 0,
              imageUrl: product.imageUrl || "/sauce.svg",
            }}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center">
        <Pagination
          count={Math.ceil(products.length / productsPerPage)}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
}
