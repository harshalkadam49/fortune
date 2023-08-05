import { TextField, Typography } from "@mui/material";

export default function CustomInput(props: any) {
  return (
    <>
      <Typography
        fontSize=".875rem"
        color="#4a4a4a"
        textAlign={props.labelAlign}
      >
        {props.customLabel}
      </Typography>
      <TextField
        id={props.id}
        value={props.value}
        variant="outlined"
        autoComplete='off'
        type={props.type}
        label=""
        fullWidth={props.fullWidth}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
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
