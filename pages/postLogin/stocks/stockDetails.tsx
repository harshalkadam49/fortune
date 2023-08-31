import LayoutWithBackheader from "@/components/layouts/withbackheader";
import {
  Avatar,
  BottomNavigation,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getEquityDetailsapi } from "@/apifunctions/getEquityDetails";
import { useRouter } from "next/router";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Loader from "@/components/loader";
import { postAddToCartEquityapi } from "@/apifunctions/postAddToCartEquity";
import { postRemoveFromCartEquityapi } from "@/apifunctions/postRemoveFromCartEquity";
import { postSaveListsEquityapi } from "@/apifunctions/postSaveListsEquity";
import { postRemoveFromSaveListsEquityapi } from "@/apifunctions/postRemoveFromSaveListsEquity";

const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#76FFC6" : "#fff",
  },
}));

export default function StockDetails() {
  const router = useRouter();
  const [saveToWatchList, setSaveToWatchList] = useState<any>(false);
  const [addToCart, setAddToCart] = useState(false);
  const [CompanyName, setCompanyName] = useState<any>("");
  const [stockDetails, setStockDetails] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isSaved, setIsSaved] = useState<any>(false);

  if (typeof window !== "undefined") {
    var storedUser: any = localStorage.getItem("userData");
    var userObject: any = JSON.parse(storedUser);
  }

  const onAddToCart = (UserID: any, EquityID: any) => {
    setAddToCart(!addToCart);
    let model: any = {
      userID: UserID,
      equityID: EquityID,
    };

    if (addToCart) {
      postRemoveFromCartEquityapi(
        model,
        "/api/auth/removeFromCartEquity",
        "POST"
      );
    } else {
      postAddToCartEquityapi(model, "/api/auth/addToCartEquity", "POST");
    }
  };

  const onAddToWatchList = (UserID: any, EquityID: any) => {
    setSaveToWatchList(!saveToWatchList);
    let model: any = {
      userID: UserID,
      equityID: EquityID,
    };

    if (saveToWatchList) {
      postRemoveFromSaveListsEquityapi(
        model,
        "/api/auth/removeFromCartEquity",
        "POST"
      );
    } else {
      postSaveListsEquityapi(model, "/api/auth/saveListEquity", "POST");
    }
  };

  const onGetStockDetails = (CompanyName: any) => {
    setIsLoading(true);
    getEquityDetailsapi(
      `/api/auth/equityDetails?CompanyName=${CompanyName}`,
      "GET"
    ).then((res) => {
      if (!res.errorState) {
        setStockDetails(res.data);
        setIsLoading(false);
      }
    });
  };

  const onRedirectToOrders = (CompanyName: any, orderType: any) => {
    router.push({
      pathname: "/postLogin/stocks/orderExecution",
      query: { CompanyName: CompanyName, orderType: orderType },
    });
  };

  useEffect(() => {
    if (router.isReady) {
      onGetStockDetails(router.query.CompanyName);
      setCompanyName(router.query.CompanyName);
      setSaveToWatchList(router.query.isSaved);
    }
  }, [router.query]);

  return (
    <>
      <LayoutWithBackheader showHeader={true} pageTitle="Stock Details">
        <Loader isLoading={isLoading} />
        {stockDetails && (
          <Box px="1rem" pt="5rem" pb="50%">
            <Stack direction="column" spacing={2}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    sx={{
                      background: "#76FFC6",
                      height: "2.5rem",
                      width: "2.5rem",
                      color: "#1a1a1a",
                      fontSize: "1rem",
                    }}
                  >
                    <Typography variant="h1" color="#1a1a1a">
                      {stockDetails.CompanyName && (
                        <>
                          {stockDetails.CompanyName.split(" ")[0].substring(
                            0,
                            1
                          )}
                          {stockDetails.CompanyName.split(" ").length > 1
                            ? stockDetails.CompanyName.split(" ")[1].substring(
                                0,
                                1
                              )
                            : ""}
                        </>
                      )}
                    </Typography>
                  </Avatar>

                  <Typography variant="h1">
                    {stockDetails.CompanyName}
                  </Typography>

                  <Box
                    sx={{
                      border: `1px solid #76FFC6`,
                      borderRadius: "2rem",
                      p: "0.1rem 0.5rem",
                    }}
                  >
                    <Typography variant="h3">
                      {stockDetails.SectorName}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" alignItems="center">
                  {/* cannot place multiple orders at once */}
                  {/* <IconButton
                    onClick={() =>
                      onAddToCart(userObject._id, stockDetails._id)
                    }
                  >
                    {addToCart ? (
                      <ShoppingCartIcon
                        sx={{ fontSize: "1.8rem", color: "#F0882D" }}
                      />
                    ) : (
                      <ShoppingCartOutlinedIcon
                        sx={{ fontSize: "1.8rem", color: "#fff" }}
                      />
                    )}
                  </IconButton> */}
                  {/* cannot place multiple orders at once */}

                  <IconButton
                    onClick={() =>
                      onAddToWatchList(userObject._id, stockDetails._id)
                    }
                  >
                    {saveToWatchList ? (
                      <BookmarkAddedIcon
                        sx={{ fontSize: "1.8rem", color: "#F0882D" }}
                      />
                    ) : (
                      <BookmarkBorderOutlinedIcon
                        sx={{ fontSize: "1.8rem", color: "#fff" }}
                      />
                    )}
                  </IconButton>
                </Stack>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h1">₹</Typography>
                <Typography variant="h1">{stockDetails.LastPrice}</Typography>
                <Typography
                  variant="h3"
                  color={stockDetails.Change > 0 ? "#76FFC6" : "#EE4D37"}
                >
                  ({stockDetails.Change}%)
                </Typography>
              </Stack>
            </Stack>

            {/* chart */}
            <Typography variant="h2" textAlign="center" py="5rem">
              Chart to be added here
            </Typography>
            {/* chart */}

            <Box py="2rem">
              <Stack direction="row" justifyContent="space-between" pb="1rem">
                <Box>
                  <Typography variant="h3">Today's Low</Typography>
                  <Typography variant="h2" pt={2}>
                    {stockDetails.Low}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h3">Today's High</Typography>
                  <Typography variant="h2" pt={2} textAlign="right">
                    {stockDetails.High}
                  </Typography>
                </Box>
              </Stack>
              <BorderLinearProgress
                variant="determinate"
                value={stockDetails.High - stockDetails.Low}
              />
            </Box>

            {/* table */}
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Typography variant="h3" color="#8A8A8A">
                    High
                  </Typography>
                  <Typography variant="h2">{stockDetails.High}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Typography variant="h3" color="#8A8A8A">
                    Low
                  </Typography>
                  <Typography variant="h2">{stockDetails.Low}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Typography variant="h3" color="#8A8A8A">
                    Last Price
                  </Typography>
                  <Typography variant="h2">{stockDetails.LastPrice}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Typography variant="h3" color="#8A8A8A">
                    Prev Close
                  </Typography>
                  <Typography variant="h2">{stockDetails.PrevClose}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Typography variant="h3" color="#8A8A8A">
                    Change (%)
                  </Typography>
                  <Typography variant="h2">{stockDetails.Change}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Typography variant="h3" color="#8A8A8A">
                    Loss (%)
                  </Typography>
                  <Typography variant="h2">{stockDetails.Loss}</Typography>
                </Stack>
              </Grid>
            </Grid>

            <Box
              className="maxWidth"
              sx={{
                borderBottom: "2px solid #76FFC6",
              }}
            >
              <Typography variant="h2" pt="2rem" pb="0.3rem">
                About {stockDetails.CompanyName}
              </Typography>
            </Box>
            <Typography fontSize="0.8rem" pt="1rem" fontWeight="200">
              {stockDetails.CompanyDesc}
            </Typography>

            {/* table */}

            {/* share hoilding pattern */}
            <Typography variant="h2" pt="2rem" pb="1rem">
              Share Hoilding Pattern
            </Typography>
            <Stack pt="1rem" spacing="1.5rem">
              <Box>
                <Typography variant="h3" pb="0.5rem">
                  Promoters ({stockDetails.ShareHoildingPromoters}%)
                </Typography>
                <BorderLinearProgress
                  variant="determinate"
                  value={stockDetails.ShareHoildingPromoters}
                />
              </Box>

              <Box>
                <Typography variant="h3" pb="0.5rem">
                  Retail and Others ({stockDetails.ShareHoildingRetails}%)
                </Typography>
                <BorderLinearProgress
                  variant="determinate"
                  value={stockDetails.ShareHoildingRetails}
                />
              </Box>

              <Box>
                <Typography variant="h3" pb="0.5rem">
                  Mutual Funds ({stockDetails.ShareHoildingMF}%)
                </Typography>
                <BorderLinearProgress
                  variant="determinate"
                  value={stockDetails.ShareHoildingMF}
                />
              </Box>
            </Stack>
            {/* share hoilding pattern */}
          </Box>
        )}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "#000",
            height: "6rem",
          }}
        >
          <Stack
            sx={{
              width: { lg: "25%", xs: "95%" },
              mx: "auto",
            }}
            justifyContent="center"
            spacing={2}
            direction="row"
            alignItems="center"
          >
            <Button
              onClick={() =>
                onRedirectToOrders(stockDetails.CompanyName, "Buy")
              }
              variant="contained"
              fullWidth={true}
              sx={{
                background: "#76FFC6",
                color: "#fff",
              }}
            >
              Buy
            </Button>

            <Button
              onClick={() =>
                onRedirectToOrders(stockDetails.CompanyName, "Sell")
              }
              variant="contained"
              fullWidth={true}
              sx={{
                background: "#EE4D37",
                color: "#fff",
              }}
            >
              Sell
            </Button>
          </Stack>
        </Box>
      </LayoutWithBackheader>
    </>
  );
}
