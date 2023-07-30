import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Typography } from "@mui/material";

export default function PasswordInput(props: any) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <OutlinedInput
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        fullWidth
        placeholder={props.placeholder}
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
                <VisibilityOff sx={{ fontSize: "1.8rem", color: "#fff" }} />
              ) : (
                <Visibility sx={{ fontSize: "1.8rem", color: "#fff" }} />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
      <Typography
        pt="0.2rem"
        fontSize="0.8rem"
        color="#F05E4B"
        textAlign={props.errorAlign}
      >
        {props.errorText}
      </Typography>
    </>
  );
}
