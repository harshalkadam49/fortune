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
import { postSmsOtpapi } from "@/apifunctions/postSmsOtp";
import { postUserapi } from "@/apifunctions/postUser";
import { postEmailOtpapi } from "@/apifunctions/postEmailOtp";
import { postValidateOtpapi } from "@/apifunctions/postValidateOtp";
import { hash } from "bcryptjs";
import { postCheckExistingEmailapi } from "@/apifunctions/postCheckExistingEmail";
import { postCheckExistingPhoneapi } from "@/apifunctions/postCheckExistingPhone";
import Loader from "@/components/loader";

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isMaleSelected, setIsMaleSelected] = useState(true);
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
      errorState: true,
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
    } else {
      errors.errorState = false;
    }
    setErrors(errors);
  };

  const handleChange = (value: any, type: any) => {
    signupValidation();
    if (type == "Name") {
      setEntredName(value);
    } else if (type == "Email") {
      setEntredEmail(value);
      // onCheckExistingEmail(value);
    } else if (type == "PhoneNo") {
      setEntredPhoneNumber(value);
      // onCheckExistingPhone(value);
    } else if (type == "Password") {
      setEntredPassword(value);
    } else if (type == "ConfirmPassword") {
      setEnterdConfirmPassword(value);
    }
  };

  // api flow

  const onCreateUser = () => {
    setIsLoading(true);
    let model = {
      gender: gender,
      name: capitalizeFirstLetter(entredName),
      email: entredEmail,
      phonenumber: entredPhoneNumber,
      password: entredPassword,
      isEmailVerified: true,
      isPhoneVerified: true,
    };

    postUserapi(model, "/api/auth/signUp", "POST").then((res) => {
      if (!res.errorState) {
        router.replace("/prelogin/registrationdone");
        setIsLoading(false);
      }
    });
  };

  const onSubmit = () => {
    if (!errors.errorState) {
      onCreateUser();
    }
  };

  const onLogin = () => {
    router.push("/prelogin/login");
  };

  return (
    <>
      <PreloginLayout showBackheader={true}>
        <Loader isLoading={isLoading} />
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
                  onChange={(e: any) => handleChange(e.target.value, "Name")}
                  onBlur={(e: any) => handleChange(e.target.value, "Name")}
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
                  onChange={(e: any) => handleChange(e.target.value, "Email")}
                  onBlur={(e: any) => handleChange(e.target.value, "Email")}
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
                  onChange={(e: any) => handleChange(e.target.value, "PhoneNo")}
                  onBlur={(e: any) => handleChange(e.target.value, "PhoneNo")}
                />
              </Box>

              <Box>
                <PasswordInput
                  value={entredPassword}
                  id="password"
                  placeholder="*********"
                  errorText={errors.password}
                  onChange={(e: any) =>
                    handleChange(e.target.value, "Password")
                  }
                  onBlur={(e: any) => handleChange(e.target.value, "Password")}
                />
              </Box>

              <Box>
                <PasswordInput
                  value={enterdConfirmPassword}
                  id="confirmPassword"
                  placeholder="*********"
                  errorText={errors.confirmPassword}
                  onChange={(e: any) =>
                    handleChange(e.target.value, "ConfirmPassword")
                  }
                  onBlur={(e: any) =>
                    handleChange(e.target.value, "ConfirmPassword")
                  }
                />
              </Box>
            </Stack>
          </form>

          <Box
            sx={{
              position: "fixed",
              bottom: 10,
              left: 0,
              right: 0,
              background: "#000",
              height: "7rem",
            }}
          >
            <Stack sx={{ width: "90%", mx: "auto" }}>
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

              <Box textAlign="center" pt="1rem" onClick={onLogin}>
                <Typography variant="h2" color="#fff">
                  Sign In
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </PreloginLayout>
    </>
  );
}
