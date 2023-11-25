import LayoutWithBackheader from "@/components/layouts/withbackheader";
import { Box, Button, Typography } from "@mui/material";
import Lottie from "react-lottie";
import BottomStay from "@/components/bottomNavigation";
import { useRouter } from "next/router";
import RiskprofileConservative from "../../../public/postLogin/riskProfile/riskprofileConservative.json";
import RiskprofileBalanced from "../../../public/postLogin/riskProfile/riskprofileBalanced.json";
import RiskProfileAggressive from "../../../public/postLogin/riskProfile/riskProfileAggressive.json";
import { useEffect, useState } from "react";

export default function RiskprofileIndex() {
  const [riskProfileName, setRiskProfileName] = useState<any>("");
  const router = useRouter();

  const RiskprofileConservativeAnimation = {
    loop: false,
    autoplay: true,
    animationData: RiskprofileConservative,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const RiskprofileBalancedAnimation = {
    loop: false,
    autoplay: true,
    animationData: RiskprofileBalanced,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const RiskProfileAggressiveAnimation = {
    loop: false,
    autoplay: true,
    animationData: RiskProfileAggressive,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const onRedirectToHome = () => {
    router.push({
      pathname: "/postLogin",
    });
  };

  useEffect(() => {
    if (router.isReady) {
      setRiskProfileName(router.query.riskprofile);
    }
  }, [router.query]);

  return (
    <>
      <LayoutWithBackheader showHeader={false} pageTitle="Watchlist">
        <Box px="1rem" pt="5rem">
          <Box
            height={180}
            width={180}
            sx={{
              background: "#fff",
              borderRadius: "50%",
              mx: "auto",
              position: "relative",
            }}
          >
            {riskProfileName.toLowerCase() == "conservative" && (
              <Lottie
                options={RiskprofileConservativeAnimation}
                height={300}
                width={300}
                style={{
                  position: "absolute",
                  left: "-54.6px",
                  right: "0",
                  top: "-3.8rem",
                }}
              />
            )}

            {riskProfileName.toLowerCase() == "modrate" && (
              <Lottie
                options={RiskprofileBalancedAnimation}
                height={300}
                width={300}
                style={{
                  position: "absolute",
                  left: "-54.6px",
                  right: "0",
                  top: "-3.8rem",
                }}
              />
            )}

            {riskProfileName.toLowerCase() == "aggressive" && (
              <Lottie
                options={RiskProfileAggressiveAnimation}
                height={300}
                width={300}
                style={{
                  position: "absolute",
                  left: "-54.6px",
                  right: "0",
                  top: "-3.8rem",
                }}
              />
            )}
          </Box>

          <Typography
            pt="15%"
            textAlign="center"
            fontSize="1.3rem"
            variant="h1"
          >
            Your risk profile is {riskProfileName}
          </Typography>

          <Typography textAlign="center" fontSize="0.8rem" p={2} color="#ccc">
            Strategic risk analysis guides informed decisions, ensuring
            resilience and sustainable growth.
          </Typography>

          <BottomStay>
            <Button
              onClick={onRedirectToHome}
              variant="contained"
              fullWidth={true}
            >
              Start Investing
            </Button>
          </BottomStay>
        </Box>
      </LayoutWithBackheader>
    </>
  );
}
