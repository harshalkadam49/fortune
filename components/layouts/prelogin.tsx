import { Box, Container } from "@mui/material";
import Loader from "./loader";
import { Router } from "next/router";
import { useState } from "react";

export default function PreloginLayout({ children }: any) {
  const [isLoading, setIsLoading] = useState(false);
  Router.events.on("routeChangeStart", () => setIsLoading(true));
  Router.events.on("routeChangeComplete", () => setIsLoading(false));
  return (
    <>
      <Container sx={{ p: "0" }}>
        <Loader isLoading={isLoading} />
        {children}
      </Container>
    </>
  );
}
