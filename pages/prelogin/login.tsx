import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import Toast from "../../components/toasts/loginToast";
import LoginImg from "../../public/prelogin/login.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import Loader from "@/components/loader";
import PreloginLayout from "@/components/layouts/prelogin";
import { postLoginUserapi } from "@/apifunctions/POST/postLoginUser";
import { VisibilityOff, Visibility } from "@mui/icons-material";

export default function SignUp() {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errors, setErrors] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //  hitting the api
  async function submithandler(event: any) {
    setIsLoading(true);
    event.preventDefault();

    const entredEmail = emailInput;
    const entredPassword = passwordInput;

    let model = {
      userName: entredEmail.toLowerCase(),
      password: passwordInput,
    };

    postLoginUserapi(model, "/api/auth/login", "POST").then((res: any) => {
      if (!res.errorState) {
        localStorage.setItem("userData", JSON.stringify(res.data));
        setIsLoading(false);
        setSeverity("success");
        router.replace("/postLogin/");
      } else {
        setIsLoading(false);
        setSeverity("error");
      }
      setErrors(res.message);
      setOpen(true);
    });
  }

  const onSignUp = () => {
    router.push("/prelogin/signup");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <PreloginLayout>
        <Toast
          open={open}
          handleClose={handleClose}
          message={errors}
          severity={severity}
        />
        <Box>
          <Loader isLoading={isLoading} />
          <Paper
            sx={{
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

                <FormControl>
                  <OutlinedInput
                    autoComplete="off"
                    required
                    value={passwordInput}
                    id="password"
                    placeholder="Password"
                    onChange={(e) => setPasswordInput(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff
                              sx={{
                                fontSize: "1.5rem",
                                color: "#fff",
                              }}
                            />
                          ) : (
                            <Visibility
                              sx={{
                                fontSize: "1.5rem",
                                color: "#fff",
                              }}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
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
                <Stack sx={{ width: { md: "23%", xs: "90%" }, mx: "auto" }}>
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
      </PreloginLayout>
    </>
  );
}
