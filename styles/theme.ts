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
    fontFamily: "Roboto",
    fontSize: 1,
    htmlFontSize: 16,
    h1: {
      fontSize: 20,
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: 400,
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
          ":focus":{
            background: "#fff",
            color: "#000",
          }
        },
        text:{
         textTransform: "capitalize",
         fontSize: 16,
         fontWeight: 400,
         ":focus":{
           color: "#fff",
         }
        }
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
