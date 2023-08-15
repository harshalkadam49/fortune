import { AppBar, Box, Container, IconButton, Toolbar } from "@mui/material";
import { Router } from "next/router";
import { useState } from "react";
import Loader from "../loader";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function LayoutWithBackheader(props: any) {
  const { children, showHeader, pageTitle }: any = props;
  const [isLoading, setIsLoading] = useState(false);
  Router.events.on("routeChangeStart", () => setIsLoading(true));
  Router.events.on("routeChangeComplete", () => setIsLoading(false));
  const handleBack = () => {
    history.back();
  };
  return (
    <>
      <Container sx={{ p: "0" }}>
        <Loader isLoading={isLoading} />
        <Box>
          {showHeader && (
            <AppBar position="fixed" sx={{ background: "#000" }} elevation={0}>
              <Toolbar>
                <IconButton
                  onClick={handleBack}
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <ArrowBackIosNewIcon
                    sx={{ fontSize: "1.2rem", color: "#fff" }}
                  />
                </IconButton>
                {pageTitle}
              </Toolbar>
            </AppBar>
          )}
        </Box>
        {children}
      </Container>
    </>
  );
}
