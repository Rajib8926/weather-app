import { createTheme } from "@mui/material/styles";

// ✅ Extend Breakpoint type for TypeScript
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}
const muiTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#53b7ffff",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#ffffff",
      paper: "#c9c9c988",
    },
    text: {
      primary: "#252525",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    allVariants: {
      color: "#252525",
    },
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 400,
    },
  },
  spacing: 8,
});

export default muiTheme;
