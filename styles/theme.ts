import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1920,
    },
  },
  spacing: 4,
  typography: {
    fontFamily: "Open Sans",
    fontSize: 1,
    htmlFontSize: 16,
    h1: {
      fontSize: 16,
      fontWeight: 600,
    },
    h2: {
      fontSize: 14,
      fontWeight: 500,
    },
    h3: {
      fontSize: 10,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 12,
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: false,
      },
      styleOverrides: {
        root: {},
        contained: {
          textTransform: "capitalize",
          padding: "8px 43px",
          color: "#000",
          fontSize: 16,
          fontWeight: 400,
          background: "#fff",
          ":focus": {
            background: "#fff",
            color: "#000",
          },
        },
        text: {
          textTransform: "capitalize",
          fontSize: 16,
          fontWeight: 400,
          ":focus": {
            color: "#fff",
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#fff",
          fontSize: "1.2rem",
          borderRadius: "0.8rem",
          background: "#ffffff0f",
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          background:"#ffffff24",
          borderRadius:"0.5rem"
        },
      },
    },
    MuiInputBase:{
      styleOverrides: {
        root: {
          color: "#fff",
          fontSize: "1.2rem",
          borderRadius: "0.8rem",
          background: "#000",
        },
      },
    }
  },
});
