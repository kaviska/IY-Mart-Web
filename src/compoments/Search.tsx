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
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={data.map((option) => option.name)} // Extract names
          // Notify parent about search input
          sx={{ width: "100%", marginBottom: "4px" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                <React.Fragment>
                  <div>
                
                  Search...

                  </div>
                 
                </React.Fragment>
              }
              type="search"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "5px",
                  padding: "1px 10px 0px 10px",
                 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#F5F5F5",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "16px", // Adjust label font size
                  marginBottom: "500px",
                 

                },
              }}
            />
          )}
        />
      
    </Stack>
  );
}