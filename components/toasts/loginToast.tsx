import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Typography } from "@mui/material";

export default function Toast(props: any) {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={props.handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={props.open}
        autoHideDuration={3000}
        onClose={props.handleClose}
        message={<Typography variant="h2"></Typography>}
        action={action}
      >
        <Alert
          onClose={props.handleClose}
          severity={props.severity}
          sx={{ width: "100%" }}
        >
          <Typography variant="h2">{props.message}</Typography>
        </Alert>
      </Snackbar>
    </div>
  );
}
