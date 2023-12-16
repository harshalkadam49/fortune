import {
  AppBar,
  Box,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
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
  const handleBack = (viewedFrom: any) => {
    if (viewedFrom == 1) {
      router.push({
        pathname: "/postLogin/",
        query: { viewedFrom: viewedFrom },
      });
    } else if (viewedFrom == 2) {
      router.push({
        pathname: "/postLogin/",
        query: { viewedFrom: viewedFrom },
      });
    } else {
      history.back();
    }
  };
  const redirectToHome = () => {
    router.push({
      pathname: "/postLogin/",
      query: { viewedFrom: 1 },
    });
  };

  const styles = {
    bgContainer: {
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      height: "100%",
      overflow: "hidden",
      width: "100%",
      p: "0rem",
      pb: "6rem",
    },
    mainContainer: {
      background: "#000 !important",
      width: { lg: "25%", xs: "100%" },
      height: "100vh",
      overflowX: "hidden",
      overflowY: "Scroll",
      p: "0rem",
    },
  };
  return (
    <>
      <Box sx={styles.bgContainer}>
        <Container sx={styles.mainContainer} className="main_wrapper">
          <Loader isLoading={isLoading} />
          <Box>
            {showHeader && (
              <AppBar
                position="fixed"
                sx={{ background: "#000" }}
                elevation={0}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  p="1rem 0.5rem"
                  sx={{ width: { lg: "25%", xs: "100%" }, mx: "auto" }}
                >
                  <Stack direction="row" alignItems="center">
                    <IconButton
                      onClick={() => handleBack(props.viewedFrom)}
                      aria-label="menu"
                      sx={{ mr: 2 }}
                    >
                      <ArrowBackIosNewIcon
                        sx={{ fontSize: "1.2rem", color: "#fff" }}
                      />
                    </IconButton>

                    <Typography variant="h1" textTransform="capitalize">
                      {pageTitle}
                    </Typography>
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
      </Box>
    </>
  );
}
