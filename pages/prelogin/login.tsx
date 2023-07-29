import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Loginimg from "../../public/prelogin/login.svg";
import Image from "next/image";
import BackHeader from "@/components/headers/backheader";
import { Stack } from "@mui/material";
import GoogleIcon from "../../public/prelogin/google-icon.svg";
import Fingerprint from "../../public/prelogin/fingerprint.svg";
import Mobile from "../../public/prelogin/mobile.svg";
import Tap from "@/components/animations/tap";
import { useRouter } from "next/router";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

const drawerBleeding = 100;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function Login(props: Props) {
  const router = useRouter();
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const onSignUp = () => {
    router.push("/prelogin/signUp");
  };

  return (
    <Box sx={{ background: "#343434", height: "100vh" }}>
      <BackHeader showBackheader={true} />
      <Box textAlign="center" pt="1rem">
        <Image src={Loginimg} height={206} width={173} alt="Loginimg" />
      </Box>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(75% - 100px)`,
            overflow: "auto",
            borderTopLeftRadius: "2.5rem",
            borderTopRightRadius: "2.5rem",
            background: "#000",
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={true}
        onClose={toggleDrawer(true)}
        onOpen={toggleDrawer(true)}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
          hideBackdrop: true,
        }}
      >
        <Stack
          direction="column"
          spacing="2.125rem"
          color="#fff"
          p="3.313rem 1.438rem"
        >
          <Stack
            direction="row"
            spacing={3}
            sx={{
              border: "1px solid #EEEEEE",
              p: "1.2rem",
              borderRadius: "1rem",
            }}
          >
            <Image src={GoogleIcon} height={24} width={30} alt="GoogleIcon" />
            <Typography variant="h1">Login with google</Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={3}
            sx={{
              border: "1px solid #EEEEEE",
              p: "1.2rem",
              borderRadius: "1rem",
            }}
          >
            <Image src={Fingerprint} height={24} width={30} alt="GoogleIcon" />
            <Typography variant="h1">Login with biometric</Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={3}
            sx={{
              border: "1px solid #EEEEEE",
              p: "1.2rem",
              borderRadius: "1rem",
            }}
          >
            <Image src={Mobile} height={24} width={30} alt="GoogleIcon" />
            <Typography variant="h1">Login with Mobile No</Typography>
          </Stack>

          <Box textAlign="center" pt="4.18rem">
            <Tap>
              <Button
                onClick={onSignUp}
                variant="contained"
                sx={{
                  borderRadius: "5rem",
                }}
                endIcon={<TrendingFlatIcon />}
              >
                Sign Up
              </Button>
            </Tap>
          </Box>
        </Stack>
      </SwipeableDrawer>
    </Box>
  );
}
