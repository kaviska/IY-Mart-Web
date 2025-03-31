"use client";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Search from "./Search";
import * as React from "react";
import { fetchDataJson } from "@lib/fetch"; // Adjust the import path as necessary
import { useSearchParams, useRouter } from "next/navigation"; // For URL manipulation

interface TypePropsInterface {
  type: string;
  searchAvailable: boolean;
}

export default function CheckBoxWithSearchFilter({
  type,
  searchAvailable,
}: TypePropsInterface) {
  const [category, setCategory] = React.useState<any[]>([]);
  const [filteredCategory, setFilteredCategory] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const fetchCategory = async () => {
      try {
        const result = await fetchDataJson(type, { method: "GET" });
        setCategory(result.data);
        setFilteredCategory(result.data); // Initialize filteredCategory with all categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategory();
  }, [type]);

  // Filter categories based on the search query
  React.useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCategory(category); // Show all categories if search query is empty
    } else {
      const filtered = category.filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategory(filtered);
    }
  }, [searchQuery, category]);

  // Update URL when selected items change
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === "brands") {
      params.set("brand", selectedItems.join(",")); // Update the "brand" query parameter
    } else if (type === "categories") {
      params.set("category", selectedItems.join(",")); // Update the "category" query parameter
    }
    router.replace(`?${params.toString()}`); // Use `replace` to avoid adding to history
  }, [selectedItems, type, router, searchParams]);

  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id) // Remove if already selected
        : [...prev, id] // Add if not selected
    );
  };

  return (
    <div className="flex flex-col mt-4">
      <div className="mb-3">
        {searchAvailable && (
          <Search
            data={category}
            onSearch={(query) => setSearchQuery(query)} // Pass search query to state
          />
        )}
      </div>
      <div className="px-3 flex flex-col gap-0 category-section">
        {filteredCategory.map((cat, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                color="success"
                size="small"
                checked={selectedItems.includes(cat.id)}
                onChange={() => handleCheckboxChange(cat.id)}
              />
            }
            label={<span style={{ fontSize: "14px" }}>{cat.name}</span>}
          />
        ))}
      </div>
    </div>
  );
}