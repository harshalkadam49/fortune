import {
  AppBar,
  Box,
  Container,
  IconButton,
  Stack,
  Toolbar,
} from "@mui/material";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import Loader from "../loader";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import HomeIcon from "@mui/icons-material/Home";

export default function LayoutWithBackheader(props: any) {
  const router = useRouter();
  const { children, showHeader, pageTitle }: any = props;
  const [isLoading, setIsLoading] = useState(false);
  Router.events.on("routeChangeStart", () => setIsLoading(true));
  Router.events.on("routeChangeComplete", () => setIsLoading(false));
  const handleBack = () => {
    history.back();
  };
  const redirectToHome = () => {
    router.push("/postLogin/");
  };
  return (
    <>
      <Container sx={{ p: "0" }}>
        <Loader isLoading={isLoading} />
        <Box>
          {showHeader && (
            <AppBar position="fixed" sx={{ background: "#000" }} elevation={0}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                p="1rem 0.5rem"
              >
                <Stack direction="row" alignItems="center">
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
                </Stack>

                <Box onClick={redirectToHome}>
                  <HomeIcon sx={{ fontSize: "1.5rem" }} />
                </Box>
              </Stack>
            </AppBar>
          )}
        </Box>
        {children}
      </Container>
    </>
  );
}
