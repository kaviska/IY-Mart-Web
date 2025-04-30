"use client";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Search from "./Search";
import * as React from "react";
import { fetchDataJson } from "@lib/fetch"; // Adjust the import path as necessary
import { useSearchParams, useRouter } from "next/navigation"; // For URL manipulation
import { CategoryBrandType } from "@/types/type"; // Adjust the import path as necessary
import { Suspense } from "react"; // For lazy loading

interface TypePropsInterface {
  type: string;
  searchAvailable: boolean;
}

interface ResponseError {
  status: "error";
  message: string | null;
  errors: string;
}

interface ResponseSuccess {
  status: "success";
  message: string;
  data: CategoryBrandType[];
}

type Response = ResponseError | ResponseSuccess;

export default function CheckBoxWithSearchFilter({
  type,
  searchAvailable,
}: TypePropsInterface) {
  const [category, setCategory] = React.useState<CategoryBrandType[]>([]);
  const [filteredCategory, setFilteredCategory] = React.useState<CategoryBrandType[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [showAll, setShowAll] = React.useState<boolean>(false); // State to toggle showing all items

  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch categories or brands based on the type
  React.useEffect(() => {
    const fetchCategory = async () => {
      try {
        const result: Response = await fetchDataJson(`${type}?limit=1000000000`, { method: "GET" });
        if (result.status === "error") {
          throw new Error(result.message || "Error fetching categories");
        }
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
    console.log("Filtering categories with query:", searchQuery);
    if (searchQuery.trim() === "") {
      setFilteredCategory(category); // Show all categories if search query is empty
    } else {
      const filtered = category.filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategory(filtered); // Update filteredCategory with the search result
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

  // Handle checkbox selection
  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id) // Remove if already selected
        : [...prev, id.toString()] // Add if not selected
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
          {filteredCategory.length > 0 ? (
            filteredCategory
              .slice(0, showAll ? filteredCategory.length : 10) // Show only 10 items if `showAll` is false
              .map((cat, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      color="success"
                      size="small"
                      checked={selectedItems.includes(cat.id.toString())}
                      onChange={() => handleCheckboxChange(cat.id.toString())}
                    />
                  }
                  label={<span style={{ fontSize: "14px" }}>{cat.name}</span>}
                />
              ))
          ) : (
            <div className="text-gray-500 text-sm">No results found</div> // Show message if no results match
          )}
          {filteredCategory.length > 10 && (
            <button
              className="text-blue-500 mt-2 text-sm"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show Less" : `+ Show More (${filteredCategory.length - 10})`}
            </button>
          )}
        </div>
      </div>
    </Suspense>
  );
}