import LayoutWithBackheader from "@/components/layouts/withbackheader";
import { Box, Button, Typography } from "@mui/material";
import Lottie from "react-lottie";
import RiskProfileIntro from "../../../public/postLogin/riskProfile/riskProfileIntro.json";
import BottomStay from "@/components/bottomNavigation";
import { useRouter } from "next/router";

export default function RiskprofileIndex() {
  const router = useRouter();
  const RiskProfileIntroAnimation = {
    loop: true,
    autoplay: true,
    animationData: RiskProfileIntro,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const onRedirectToRiskProfile = () => {
    router.push({
      pathname: "/postLogin/riskProfile/questions",
    });
  };

  return (
    <>
      <LayoutWithBackheader showHeader={false} pageTitle="Watchlist">
        <Box px="1rem" pt="5rem" pb="50%">
          <Lottie
            options={RiskProfileIntroAnimation}
            height={290}
            width={320}
          />

          <Typography textAlign="center" fontSize="1.3rem" variant="h1">
            Assessing risks to safeguard success in a concise, strategic
            overview.
          </Typography>

          <Typography textAlign="center" fontSize="0.8rem" p={2} color="#ccc">
            Strategic risk analysis guides informed decisions, ensuring
            resilience and sustainable growth.
          </Typography>

          <BottomStay>
            <Button
              onClick={onRedirectToRiskProfile}
              variant="contained"
              fullWidth={true}
            >
              Take Risk Profile
            </Button>
          </BottomStay>
        </Box>
      </LayoutWithBackheader>
    </>
  );
}
