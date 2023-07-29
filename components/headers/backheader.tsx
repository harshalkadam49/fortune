import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function ButtonAppBar(props: any) {
  return (
    <Box>
      {props.showBackheader && (
        <AppBar
          position="static"
          sx={{ background: "transparent" }}
          elevation={0}
        >
          <Toolbar>
            <IconButton aria-label="menu" sx={{ mr: 2 }}>
              <ArrowBackIosNewIcon sx={{ fontSize: "1.2rem", color: "#fff" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
    </Box>
  );
}
