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
import { getUserDataapi } from "@/apifunctions/GET/getUserData";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

type Anchor = "top" | "left" | "bottom" | "right";

export default function SwipeableTemporaryDrawer({ children, props }: any) {
  const [userData, setUserData] = React.useState<any>({});
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
  const [menuList, setMenuList] = React.useState<any>([
    {
      title: "Orders",
      icon: <ListIcon sx={{ fontSize: "1.5rem", color: "#fff" }} />,
      redirectTo: "/postLogin/stocks/equityOrders",
    },
    {
      title: "Watchlist",
      icon: <BookmarkIcon sx={{ fontSize: "1.5rem", color: "#fff" }} />,
      redirectTo: "/postLogin/stocks/equityWatchlists",
    },
  ]);

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
  };

  const OnLogout = () => {
    setAnchorEl(null);
    router.replace("/prelogin/login");
    localStorage.clear();
    sessionStorage.clear();
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

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      var storedUser: any = localStorage.getItem("userData");
      var userObject: any = JSON.parse(storedUser);
      setUserData(userObject);
    }
  }, []);

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
                <MenuIcon
                  onClick={toggleDrawer(anchor, true)}
                  sx={{ fontSize: "1.3rem" }}
                />
                <Typography sx={{ fontSize: "1.2rem" }} color="inherit" component="div">
                  Fortune
                </Typography>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-evenly"
                spacing={3}
              >
                <SearchIcon
                  sx={{ fontSize: "1.3rem" }}
                  onClick={onRedirectToStocksLists}
                />
                <Badge variant="dot" color="error">
                  <NotificationsIcon sx={{ fontSize: "1.3rem" }} />
                </Badge>

                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <AccountCircleIcon
                    sx={{ fontSize: "1.3rem", color: "#fff" }}
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
                  <MenuItem onClick={OnLogout}
                  sx={{
                    minHeight:"10px"
                  }}
                  >
                    <Typography variant="h2">Logout</Typography>
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
            <Box
              sx={{
                background: "#000",
                height: "100vh",
                p: "1rem",
                width: "12rem",
              }}
            >
              {userData && (
                <Box>
                  <Avatar
                    sx={{
                      border: "1px solid #76FFC6",
                      background: "#000",
                      height: "2.5rem",
                      width: "2.5rem",
                    }}
                  ></Avatar>
                  <Typography variant="h2" pt="0.5rem" color="#fff">
                    {userData.name}
                  </Typography>
                  <Typography variant="h3" pt="0.2rem" color="#fff">
                    {userData.email}
                  </Typography>
                </Box>
              )}

              <List sx={{ pl: "0rem", pt: "1rem" }}>
                {menuList &&
                  menuList.map((item: any) => (
                    <ListItem
                      onClick={() =>
                        router.push({
                          pathname: item.redirectTo,
                        })
                      }
                      sx={{
                        borderBottom: "1px solid #34343459",
                        py: "0.8rem",
                      }}
                      disablePadding
                    >
                      {item.icon}
                      <ListItemText
                        primary={
                          <Typography pl="0.6rem" variant="h2" color="#fff">
                            {item.title}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
              </List>
            </Box>
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
