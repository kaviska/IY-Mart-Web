import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    success: {
      main: "#27AE60", // Your desired success color
      light: "#81C784",
      dark: "#388E3C",
      contrastText: "#fff",
    },
  },
});

export default theme;
