import { Box, Container } from "@mui/material";
import Loader from "../loader";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import ButtonAppBar from "../headers/backheader";

const styles = {
  bgContainer: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    height: "100%",
    overflow: "hidden",
    width: "100%",
    p: "0rem",
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

export default function PreloginLayout({ children, props }: any) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  Router.events.on("routeChangeStart", () => setIsLoading(true));
  Router.events.on("routeChangeComplete", () => setIsLoading(false));

  const isLoggedIn = () => {
    const UserData: any = localStorage.getItem("userData");
    if (UserData && UserData.length > 0) {
      router.replace("/postLogin/");
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <>
      <Box sx={styles.bgContainer}>
        <Container sx={styles.mainContainer} className="main_wrapper">
          <Loader isLoading={isLoading} />
          {children}
        </Container>
      </Box>
    </>
  );
}
