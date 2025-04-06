"use client";
import ProductCard from "./ProductCard";
import Pagination from "@mui/material/Pagination";
import { fetchDataJson } from "@lib/fetch";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import calculatePrice from "@/lib/priceCalcuator";


export default function ShopAllProduct() {
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  // Update state when searchParams change
  useEffect(() => {
    const brand = searchParams.get("brand") || "";
    const category = searchParams.get("category") || "";
    const price_range = searchParams.get("price_range") || "";

    setPriceRange(price_range);
    setCategories(category ? category.split(",") : []);
    setBrands(brand ? brand.split(",") : []);
  }, [searchParams]);

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const filters = {
          category_ids: categories,
          brand_ids: brands,
          web_price_min: priceRange.split("-")[0] || null,
          web_price_max: priceRange.split("-")[1] || null,
        };
        console.log("Filters:", filters);

        const queryParams = new URLSearchParams({
          newly_arrived: "1",
          with: "all",
          ...(filters.web_price_min && { web_price_min: filters.web_price_min }),
          ...(filters.web_price_max && { web_price_max: filters.web_price_max }),
        });
        
        // Append category_ids as separate query parameters
        filters.category_ids.forEach(id => queryParams.append("category_ids[]", id));
        
        // Append brand_ids as separate query parameters
        filters.brand_ids.forEach(id => queryParams.append("brand_ids[]", id));
        
        console.log(queryParams.toString()); // Debugging the final URL parameters
        
        console.log(`products?${queryParams.toString()}`);

        const result = await fetchDataJson(`products?${queryParams.toString()}`, { method: "GET" });
        setProducts(result.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categories, brands, priceRange]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <div className="flex flex-wrap gap-y-3 gap-x-3 justify-center">
        {currentProducts.map((product, index) => (
      
            <ProductCard
              product={{
                id: product.id,
                name: product.name || `Product ${index + 1}`,
                price: calculatePrice(product.stocks) || '0',
                imageUrl: product.imageUrl || "/sauce.svg",
              }}
              slug={product.slug}
              key={product.id} // Use product ID as the key
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