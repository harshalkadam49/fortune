import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import Toast from "../../components/toasts/loginToast";
import { signIn, signin } from "next-auth/client";
import LoginImg from "../../public/prelogin/login.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import Loader from "@/components/loader";

export default function SignUp() {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errors, setErrors] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //  hitting the api
  async function submithandler(event) {
    setIsLoading(true);
    event.preventDefault();

    const entredEmail = emailInput;
    const entredPassword = passwordInput;
    // for log in user
    const result = await signIn("credentials", {
      redirect: false,
      email: entredEmail.toLowerCase(),
      password: entredPassword,
    });
    setOpen(true);

    if (result.error) {
      setIsLoading(false);
      setErrors(result.error);
    } else {
      setIsLoading(false);
      setErrors("Logged in succesfully");
      router.replace("/postLogin/");
    }
  }

  const onSignUp = () => {
    router.push("/prelogin/signup");
  };

  return (
    <>
      <Toast
        open={open}
        handleClose={handleClose}
        message={errors}
        severity="error"
      />
      <Box>
        <Loader isLoading={isLoading} />
        <Paper
          sx={{
            width: { lg: "50%", xs: "100%" },
            mx: "auto",
            p: "2rem",
            mt: "5%",
            background: "#000",
          }}
        >
          <Box textAlign="center">
            <Image src={LoginImg} height={200} width={200} alt="LoginImg" />
          </Box>
          <Typography variant="h1" color="#fff" pb="3rem">
            Sign In
          </Typography>
          <form onSubmit={submithandler}>
            <Stack spacing="3rem">
              <TextField
                autoComplete="off"
                required
                value={emailInput}
                id="email"
                placeholder="Email"
                variant="outlined"
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <TextField
                autoComplete="off"
                required
                value={passwordInput}
                id="password"
                placeholder="Password"
                variant="outlined"
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </Stack>
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
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: "5rem",
                  }}
                >
                  Sign In
                </Button>
              </Stack>

              <Box textAlign="center" pt="1rem" onClick={onSignUp}>
                <Typography variant="h2" color="#fff">
                  Sign Up
                </Typography>
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
}
