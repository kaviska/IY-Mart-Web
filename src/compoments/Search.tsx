import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

interface dataPropsInterface {
  data: Array<{ name: string; id: number }>; // Adjust the type as per your data structure
  onSearch: (query: string) => void; // Callback function for search input
}

export default function FreeSolo({ data, onSearch }: dataPropsInterface) {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={data.map((option) => option.name)} // Extract names
        onInputChange={(_, value) => onSearch(value)} // Notify parent about search input
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search..."
            type="search"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "5px",
                height: "45px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              "& .MuiInputLabel-root": {
                fontSize: "15px", // Adjust label font size
              },
            }}
          />
        )}
      />
    </Stack>
  );
}