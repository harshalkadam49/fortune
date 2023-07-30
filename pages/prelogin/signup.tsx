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
import {
  MaxLength,
  MinLength,
  capitalizeFirstLetter,
  checkDigit,
  checkSpecialCharacter,
  isAlphabetsWithSpace,
  isEmail,
  isEmpty,
  isOnlyAlphabets,
  isOnlyDigits,
} from "@/utilities/validators";
import { postuserapi } from "@/apifunctions/createuser";

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

  const [signUpform, setSignUpform] = useState(true);
  const [emailOTPForm, setEmailOTPForm] = useState(false);
  const [smsOTPForm, setsmsOTPForm] = useState(false);
  const [isMaleSelected, setIsMaleSelected] = useState(true);
  const [emailOTPVerified, setEmailOTPVerified] = useState(false);
  const [SMSOTPVerified, setSMSOTPVerified] = useState(true);

  // variables to save
  const [gender, setGender] = useState("M");
  const [entredName, setEntredName] = useState("");
  const [entredEmail, setEntredEmail] = useState("");
  const [entredPhoneNumber, setEntredPhoneNumber] = useState("");
  const [entredPassword, setEntredPassword] = useState("");
  const [enterdConfirmPassword, setEnterdConfirmPassword] = useState("");
  const [errors, setErrors] = useState<any>([]);

  const onSelectGender = (genderType: any) => {
    setIsMaleSelected(!isMaleSelected);
    setGender(genderType);
  };

  const signupValidation = () => {
    let errors = {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    };
    // name
    if (isEmpty(entredName)) {
      errors.name = "Name cannot be blank";
    } else if (!isAlphabetsWithSpace(entredName)) {
      errors.name = "Name should be in alphabets only";
    } else if (isEmpty(entredEmail)) {
      errors.email = "Email cannot be blank";
    } else if (!isEmail(entredEmail)) {
      errors.email = "Email should be of type abc@abc.com";
    } else if (isEmpty(entredPhoneNumber)) {
      errors.phoneNumber = "Phone number cannot be blank";
    } else if (!isOnlyDigits(entredPhoneNumber)) {
      errors.phoneNumber = "Enter a valid 10-digit number";
    } else if (!MinLength(entredPhoneNumber, 10)) {
      errors.phoneNumber = "Enter a valid 10-digit number";
    } else if (!MaxLength(entredPhoneNumber, 10)) {
      errors.phoneNumber = "Enter a valid 10-digit number";
    } else if (!MinLength(entredPassword, 8)) {
      errors.password = "Min password lenght should be 8-char";
    } else if (!MaxLength(entredPassword, 20)) {
      errors.password = "Min password lenght should be 20-char";
    } else if (isEmpty(entredPassword)) {
      errors.password = "Min password lenght should be 20-char";
    } else if (!checkDigit(entredPassword)) {
      errors.password = "Password should have at least 1-digit";
    } else if (!checkSpecialCharacter(entredPassword)) {
      errors.password = "Password should have at least 1-special char";
    } else if (isEmpty(enterdConfirmPassword)) {
      errors.confirmPassword = "Confirm password cannot be blank";
    } else if (entredPassword != enterdConfirmPassword) {
      errors.confirmPassword = "Password does not match";
    }
    setErrors(errors);
  };

  const onSubmit = () => {
    signupValidation();
    let model = {
      gender: gender,
      name: capitalizeFirstLetter(entredName),
      email: entredEmail,
      phonenumber: entredPhoneNumber,
      password: entredPassword,
    };
    if (
      errors.name ||
      errors.email ||
      errors.phoneNumber ||
      errors.password ||
      errors.confirmPassword
    ) {
      postuserapi(model, "/api/auth/signUp", "POST");
      setSignUpform(false);
      setEmailOTPForm(true);
    }
  };
  const onEmailOTPValidate = (value: any) => {
    setSignUpform(false);
    setEmailOTPForm(false);
    setsmsOTPForm(true);
    setEmailOTPVerified(true);
  };

  const onSMSOTPValidate = (value: any) => {
    router.replace("/prelogin/registrationdone");
    setSMSOTPVerified(true);
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
                  <Box onClick={() => onSelectGender("M")}>
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

                  <Box onClick={() => onSelectGender("F")}>
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
                    value={entredName}
                    errorText={errors.name}
                    type="text"
                    fullWidth={true}
                    placeholder="Name"
                    onChange={(e: any) => setEntredName(e.target.value)}
                    onBlur={(e: any) => setEntredName(e.target.value)}
                  />
                </Box>

                <Box>
                  <CustomInput
                    value={entredEmail}
                    id="email"
                    type="text"
                    fullWidth={true}
                    placeholder="Email"
                    errorText={errors.email}
                    onChange={(e: any) => setEntredEmail(e.target.value)}
                    onBlur={(e: any) => setEntredEmail(e.target.value)}
                  />
                </Box>

                <Box>
                  <CustomInput
                    value={entredPhoneNumber}
                    id="phoneNo"
                    type="tel"
                    fullWidth={true}
                    placeholder="Phone No"
                    errorText={errors.phoneNumber}
                    onChange={(e: any) => setEntredPhoneNumber(e.target.value)}
                    onBlur={(e: any) => setEntredPhoneNumber(e.target.value)}
                  />
                </Box>

                <Box>
                  <PasswordInput
                    value={entredPassword}
                    id="password"
                    placeholder="*********"
                    errorText={errors.password}
                    onChange={(e: any) => setEntredPassword(e.target.value)}
                    onBlur={(e: any) => setEntredPassword(e.target.value)}
                  />
                </Box>

                <Box>
                  <PasswordInput
                    value={enterdConfirmPassword}
                    id="confirmPassword"
                    placeholder="*********"
                    errorText={errors.confirmPassword}
                    onChange={(e: any) =>
                      setEnterdConfirmPassword(e.target.value)
                    }
                    onBlur={(e: any) =>
                      setEnterdConfirmPassword(e.target.value)
                    }
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

            {emailOTPVerified && (
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
            )}

            {/* <Stack
              pt="3rem"
              alignItems="center"
              direction="row"
              justifyContent="center"
              spacing="0.5rem"
            >
              <Image src={ErrorIcon} height={20} width={20} alt="check" />
              <Typography variant="subtitle1">Unable to verify</Typography>
            </Stack> */}
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

            {SMSOTPVerified && (
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
            )}

            {/* <Stack
              pt="3rem"
              alignItems="center"
              direction="row"
              justifyContent="center"
              spacing="0.5rem"
            >
              <Image src={ErrorIcon} height={20} width={20} alt="check" />
              <Typography variant="subtitle1">Unable to verify</Typography>
            </Stack> */}
          </Box>
        )}
      </PreloginLayout>
    </>
  );
}
