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
import { postEmailOtpapi } from "@/apifunctions/postemailotp";
import { postValidateOtpapi } from "@/apifunctions/postValidateOtp";
import { hash } from "bcryptjs";
import { postCheckExistingEmailapi } from "@/apifunctions/postCheckExistingEmail";
import { postCheckExistingPhoneapi } from "@/apifunctions/postCheckExistingPhone";

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
  const [emailOTPNotVerified, setEmailOTPNotVerified] = useState(false);

  const [SMSOTPVerified, setSMSOTPVerified] = useState(true);
  const [otp, setOtp] = useState("1970");

  // variables to save
  const [gender, setGender] = useState("M");
  const [entredName, setEntredName] = useState("");
  const [entredEmail, setEntredEmail] = useState("");
  const [entredPhoneNumber, setEntredPhoneNumber] = useState("");
  const [entredPassword, setEntredPassword] = useState("");
  const [enterdConfirmPassword, setEnterdConfirmPassword] = useState("");
  const [errors, setErrors] = useState<any>([]);

  const [encryptedSMSOtp, setEncryptedSMSOtp] = useState<any>("");
  const [encryptedEmailOtp, setEncryptedEmailOtp] = useState<any>("");

  const [otpMsgEmail, setOtpMsgEmail] = useState<any>("");
  const [otpMsgSMS, setOtpMsgSMS] = useState<any>("");
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

  const onGenerateSMSOtp = () => {
    let model = {
      phonenumber: entredPhoneNumber,
    };
    postSmsOtpapi(model, "/api/auth/sendSmsOtp", "POST").then((res) => {
      setEncryptedSMSOtp(res.otp);
    });
  };

  const onGenerateEmailOtp = () => {
    let model = {
      email: entredEmail,
    };
    postEmailOtpapi(model, "/api/auth/sendEmailOtp", "POST").then((res) => {
      setEncryptedEmailOtp(res.otp);
    });
  };

  const onValidateEmailOtp = (otp: any) => {
    let model = {
      otp: otp,
      encryptedOtp: encryptedEmailOtp,
    };
    postValidateOtpapi(model, "/api/auth/validateOtp", "POST").then((res) => {
      if (res.errorState == false) {
        setOtpMsgEmail(res.message);
        setEmailOTPForm(false);
        setsmsOTPForm(true);
        onGenerateSMSOtp();
      } else {
        setOtpMsgEmail(res.message);
      }
    });
  };

  const onValidateSMSOtp = (otp: any) => {
    let model = {
      otp: otp,
      encryptedOtp: encryptedSMSOtp,
    };
    postValidateOtpapi(model, "/api/auth/validateOtp", "POST").then((res) => {
      console.log(res.message);
      if (res.errorState == false) {
        setSMSOTPVerified(true);
        setOtpMsgSMS(res.message);
        router.replace("/prelogin/registrationdone");
      } else {
        setOtpMsgSMS(res.message);
      }
    });
  };

  const handleChange = (value: any, type: any) => {
    signupValidation();
    if (type == "Name") {
      setEntredName(value);
    } else if (type == "Email") {
      setEntredEmail(value);
      onCheckExistingEmail(value);
    } else if (type == "PhoneNo") {
      setEntredPhoneNumber(value);
      onCheckExistingPhone(value);
    } else if (type == "Password") {
      setEntredPassword(value);
    } else if (type == "ConfirmPassword") {
      setEnterdConfirmPassword(value);
    }
  };

  const onCheckExistingEmail = (value: any) => {
    if (isEmail(value)) {
      let model = {
        email: value,
      };
      postCheckExistingEmailapi(
        model,
        "/api/auth/checkExistingEmail",
        "POST"
      ).then((res) => {
        errors.email = res.message;
        setErrors(errors);
      });
    }
  };

  const onCheckExistingPhone = (value: any) => {
    if (value.length == 10) {
      let model = {
        phonenumber: value,
      };
      postCheckExistingPhoneapi(
        model,
        "/api/auth/checkExistingPhone",
        "POST"
      ).then((res) => {
        errors.phoneNumber = res.message;
        setErrors(errors);
      });
    }
  };

  const onSubmit = () => {
    let model = {
      gender: gender,
      name: capitalizeFirstLetter(entredName),
      email: entredEmail,
      phonenumber: entredPhoneNumber,
      password: entredPassword,
    };

    postUserapi(model, "/api/auth/signUp", "POST").then((res) => {
      if (res.errorState == false) {
        setSignUpform(false);
        setEmailOTPForm(true);
        onGenerateEmailOtp();
      }
    });
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
                    onChange={(e: any) =>
                      handleChange(e.target.value, "PhoneNo")
                    }
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
                    onBlur={(e: any) =>
                      handleChange(e.target.value, "Password")
                    }
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
                  onValidateEmailOtp(value);
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
              <Typography variant="subtitle1">{otpMsgEmail}</Typography>
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
                  onValidateSMSOtp(value);
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
              <Typography variant="subtitle1">{otpMsgSMS}</Typography>
            </Stack>
          </Box>
        )}
      </PreloginLayout>
    </>
  );
}
