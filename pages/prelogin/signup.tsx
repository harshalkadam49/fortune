import CustomInput from "@/components/inputs/custominput";
import PreloginLayout from "@/components/layouts/prelogin";
import { Box, Button, Stack, Typography } from "@mui/material";
import MaleSelected from "../../public/prelogin/maleSelected.svg";
import MaleUnSelected from "../../public/prelogin/maleUnSelected.svg";
import FemaleSelected from "../../public/prelogin/femaleSelected.svg";
import FemaleUnSelected from "../../public/prelogin/femaleUnSelected.svg";
import CheckIcon from "../../public/prelogin/checkIcon.svg";
import ErrorIcon from "../../public/prelogin/errorIcon.svg";
import Image from "next/image";
import { useState } from "react";
import BottomStay from "@/components/bottomNavigation";
import Tap from "@/components/animations/tap";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import PasswordInput from "@/components/inputs/passwordinput";
import PinInput from "react-pin-input";
import SMSOTPAnimation from "../../public/animations/SMSOTPAnimation.json";
import Lottie from "react-lottie";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  const defaultOptionsSMS = {
    loop: false,
    autoplay: true,
    animationData: SMSOTPAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptionsEmail = {
    loop: false,
    autoplay: true,
    animationData: SMSOTPAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [isMaleSelected, setIsMaleSelected] = useState(true);
  const [signUpform, setSignUpform] = useState(true);
  const [emailOTPForm, setEmailOTPForm] = useState(false);
  const [smsOTPForm, setsmsOTPForm] = useState(false);
  const onSelectGender = () => {
    setIsMaleSelected(!isMaleSelected);
  };

  const onSubmit = () => {
    setSignUpform(false);
    setEmailOTPForm(true);
  };

  const onEmailOTPValidate = (value: any) => {
    setSignUpform(false);
    setEmailOTPForm(false);
    setsmsOTPForm(true);
  };

  const onSMSOTPValidate = (value: any) => {
    router.replace("/prelogin/registrationdone");
  };

  return (
    <>
      <PreloginLayout showBackheader={true}>
        {signUpform && (
          <Box px="1.25rem">
            <Typography variant="h1" pt="2rem">
              Sign Up
            </Typography>
            <form>
              <Stack spacing="1.875rem" direction="column" pt="2rem">
                <Stack direction="row" spacing={5}>
                  <Box onClick={onSelectGender}>
                    {isMaleSelected ? (
                      <Image
                        src={MaleSelected}
                        height={50}
                        width={50}
                        alt="gender"
                      />
                    ) : (
                      <Image
                        src={MaleUnSelected}
                        height={50}
                        width={50}
                        alt="gender"
                      />
                    )}
                  </Box>

                  <Box onClick={onSelectGender}>
                    {!isMaleSelected ? (
                      <Image
                        src={FemaleSelected}
                        height={50}
                        width={50}
                        alt="gender"
                      />
                    ) : (
                      <Image
                        src={FemaleUnSelected}
                        height={50}
                        width={50}
                        alt="gender"
                      />
                    )}
                  </Box>
                </Stack>

                <Box>
                  <CustomInput
                    type="text"
                    fullWidth={true}
                    placeholder="Name"
                    errorText="Error text"
                  />
                </Box>

                <Box>
                  <CustomInput
                    type="text"
                    fullWidth={true}
                    placeholder="Email"
                    errorText="Error text"
                  />
                </Box>

                <Box>
                  <CustomInput
                    type="tel"
                    fullWidth={true}
                    placeholder="Phone No"
                    errorText="Error text"
                  />
                </Box>

                <Box>
                  <PasswordInput
                    placeholder="*********"
                    errorText="Error text"
                  />
                </Box>

                <Box>
                  <PasswordInput
                    placeholder="*********"
                    errorText="Error text"
                  />
                </Box>
              </Stack>
            </form>

            <BottomStay>
              <Tap>
                <Box>
                  <Button
                    onClick={onSubmit}
                    fullWidth
                    variant="contained"
                    sx={{
                      borderRadius: "5rem",
                    }}
                    endIcon={<TrendingFlatIcon />}
                  >
                    Sign Up
                  </Button>
                </Box>
              </Tap>
            </BottomStay>
          </Box>
        )}

        {emailOTPForm && (
          <Box textAlign="center">
            <Lottie options={defaultOptionsEmail} height={300} width={300} />
            <Typography variant="h1" pb="5rem">
              Enter 4-digit OTP sent to <br></br> abc@abc.com
            </Typography>

            <PinInput
              length={4}
              initialValue=""
              secret
              type="numeric"
              focus={true}
              autoSelect={false}
              inputMode="number"
              style={{ padding: "5px" }}
              inputStyle={{
                borderBottom: "1px solid grey",
                border: "none",
                width: "22%",
                fontSize: "2rem",
                color: "#fff",
              }}
              inputFocusStyle={{ borderBottom: "2px solid #9DFFCE" }}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              onComplete={(value, index) => {
                if (value.length == 4) {
                  onEmailOTPValidate(value);
                }
              }}
            />

            <Stack
              pt="3rem"
              alignItems="center"
              direction="row"
              justifyContent="center"
              spacing="0.5rem"
            >
              <Image src={CheckIcon} height={20} width={20} alt="check" />
              <Typography variant="subtitle1">Otp Vefified</Typography>
            </Stack>

            <Stack
              pt="3rem"
              alignItems="center"
              direction="row"
              justifyContent="center"
              spacing="0.5rem"
            >
              <Image src={ErrorIcon} height={20} width={20} alt="check" />
              <Typography variant="subtitle1">Unable to verify</Typography>
            </Stack>
          </Box>
        )}

        {smsOTPForm && (
          <Box textAlign="center">
            <Lottie options={defaultOptionsSMS} height={300} width={300} />
            <Typography variant="h1" pb="5rem">
              Enter 4-digit OTP sent to <br></br> 9999999999
            </Typography>

            <PinInput
              length={4}
              initialValue=""
              secret
              type="numeric"
              focus={true}
              autoSelect={false}
              inputMode="number"
              style={{ padding: "5px" }}
              inputStyle={{
                borderBottom: "1px solid grey",
                border: "none",
                width: "22%",
                fontSize: "2rem",
                color: "#fff",
              }}
              inputFocusStyle={{ borderBottom: "2px solid #9DFFCE" }}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              onComplete={(value, index) => {
                if (value.length == 4) {
                  onSMSOTPValidate(value);
                }
              }}
            />

            <Stack
              pt="3rem"
              alignItems="center"
              direction="row"
              justifyContent="center"
              spacing="0.5rem"
            >
              <Image src={CheckIcon} height={20} width={20} alt="check" />
              <Typography variant="subtitle1">Otp Vefified</Typography>
            </Stack>

            <Stack
              pt="3rem"
              alignItems="center"
              direction="row"
              justifyContent="center"
              spacing="0.5rem"
            >
              <Image src={ErrorIcon} height={20} width={20} alt="check" />
              <Typography variant="subtitle1">Unable to verify</Typography>
            </Stack>
          </Box>
        )}
      </PreloginLayout>
    </>
  );
}
