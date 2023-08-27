import { Box, Container } from "@mui/material";
import Loader from "../loader";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import ButtonAppBar from "../headers/backheader";

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
      <Container sx={{ p: "0" }}>
        <Loader isLoading={isLoading} />
        {children}
      </Container>
    </>
  );
}
