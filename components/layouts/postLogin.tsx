import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  AppBar,
  Avatar,
  Badge,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Loader from "../loader";
import { Router, useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListIcon from "@mui/icons-material/List";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type Anchor = "top" | "left" | "bottom" | "right";

export default function SwipeableTemporaryDrawer({ children, props }: any) {
  const router = useRouter();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [isLoading, setIsLoading] = React.useState(false);
  Router.events.on("routeChangeStart", () => setIsLoading(true));
  Router.events.on("routeChangeComplete", () => setIsLoading(false));

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const onRedirectToStocksLists = () => {
    router.push({
      pathname: "/postLogin/stocks/stockLists",
    });
  };
  const redirectToOrders = () => {
    router.push({
      pathname: "/postLogin/stocks/equityOrders",
    });
  };

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    router.replace("/prelogin/login");
  };

  const styles = {
    bgContainer: {
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      height: "100%",
      overflow: "hidden",
      width: "100%",
      p: "0rem",
      pt: "6rem",
      pb: "6rem",
    },
    mainContainer: {
      background: "#000 !important",
      width: { lg: "25%", xs: "100%" },
      height: "100vh",
      overflowX: "hidden",
      overflowY: "Scroll",
      p: "0rem",
    },
  };

  return (
    <Box>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <AppBar
            position="fixed"
            sx={{
              background: "#000",
            }}
          >
            <Stack
              sx={{ width: { lg: "25%", xs: "100%" }, mx: "auto" }}
              direction="row"
              justifyContent="space-between"
              p="0.5rem 1rem"
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton
                  color="inherit"
                  aria-label="menu"
                  // onClick={toggleDrawer(anchor, true)}
                  sx={{ p: "0rem" }}
                >
                  <MenuIcon sx={{ fontSize: "1.8rem" }} />
                </IconButton>
                <Typography variant="h1" color="inherit" component="div">
                  Fortune
                </Typography>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-evenly"
                spacing={5}
              >
                <SearchIcon
                  sx={{ fontSize: "1.8rem" }}
                  onClick={onRedirectToStocksLists}
                />
                <Badge variant="dot" color="error">
                  <ListIcon
                    onClick={redirectToOrders}
                    sx={{ fontSize: "1.8rem" }}
                  />
                </Badge>

                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <AccountCircleIcon
                    sx={{ fontSize: "1.8rem", color: "#fff" }}
                  />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Typography variant="h3">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Stack>
            </Stack>
          </AppBar>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {/* List to be added here */}
          </SwipeableDrawer>
          <Box sx={styles.bgContainer}>
            <Container sx={styles.mainContainer} className="main_wrapper">
              <Loader isLoading={isLoading} />
              {children}
            </Container>
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
}
