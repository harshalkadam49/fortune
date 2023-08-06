import PreloginLayout from "@/components/layouts/prelogin";
import { Box, Button, Typography } from "@mui/material";
import Lottie from "react-lottie";
import { default as doneAnimation } from "../../public/animations/registrationDone.json";
import ShowAfterLoad from "@/components/animations/showAfterLoad";
import BottomStay from "@/components/bottomNavigation";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import Tap from "@/components/animations/tap";
import { useRouter } from "next/router";

export default function RegistrationDone() {
  const router = useRouter();
  const defaultOptionsRegistrationDone = {
    loop: false,
    autoplay: true,
    animationData: doneAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const onRedirectToRiskProfile = () => {
    // routre.replace("")
  };

  const onRedirectToHome = () => {
    router.replace("/postLogin");
  };

  return (
    <PreloginLayout>
      <Box pt="40%">
        <Lottie
          options={defaultOptionsRegistrationDone}
          height={150}
          width={300}
        />

        <ShowAfterLoad>
          <Typography textAlign="center" variant="h1">
            Registration Done Succesfully
          </Typography>
        </ShowAfterLoad>
      </Box>

      <BottomStay>
        <Tap>
          <Box>
            <Button
              onClick={onRedirectToHome}
              fullWidth
              variant="contained"
              sx={{
                borderRadius: "5rem",
              }}
              endIcon={<TrendingFlatIcon />}
            >
              Continue
            </Button>
          </Box>
        </Tap>
      </BottomStay>
    </PreloginLayout>
  );
}
