import LayoutWithBackheader from "@/components/layouts/withbackheader";
import {
  Avatar,
  BottomNavigation,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  IconButtonProps,
  Paper,
  Stack,
  Tab,
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
import { getEquityDetailsapi } from "@/apifunctions/GET/getEquityDetails";
import { useRouter } from "next/router";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Loader from "@/components/loader";
import { postAddToCartEquityapi } from "@/apifunctions/POST/postAddToCartEquity";
import { postRemoveFromCartEquityapi } from "@/apifunctions/POST/postRemoveFromCartEquity";
import { postSaveListsEquityapi } from "@/apifunctions/POST/postSaveListsEquity";
import { postRemoveFromSaveListsEquityapi } from "@/apifunctions/POST/postRemoveFromSaveListsEquity";
import { getUserDataapi } from "@/apifunctions/GET/getUserData";
import StockDetailsSimmer from "@/components/simmers/stockDetailsSimmer";
import { add3Dots, getTwoDecimalValues } from "@/utilities/commonfunctions";
import dynamic from "next/dynamic";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function StockDetails() {
  const router = useRouter();
  const [saveToWatchList, setSaveToWatchList] = useState<any>(false);
  const [addToCart, setAddToCart] = useState(false);
  const [CompanyName, setCompanyName] = useState<any>("");
  const [stockDetails, setStockDetails] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isSaved, setIsSaved] = useState<any>(false);
  const [userData, setUserData] = useState<any>({});
  const [viewedFrom, setViewedFrom] = useState<any>("");
  const [fundamentalsArray, setFundamentalsArray] = useState<any>();
  const [year, setYear] = useState<any>();
  const [expanded, setExpanded] = useState(false);
  const [expertRatingArray, setExpertRatingArray] = useState([]);
  const [expertRatingFinal, setExpertRatingFinal] = useState<any>();
  const [ratingColor, setRatingColor] = useState<any>("");

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

  const onGetStockDetails = (searchId: any) => {
    setIsLoading(true);
    getEquityDetailsapi(
      `/api/auth/equityDetailsNew?searchId=${searchId}`,
      "GET"
    ).then((res) => {
      if (!res.errorState) {
        setStockDetails(res.data);
        setIsLoading(false);
        onGetFundamentalData(res.data.fundamentals);
        onGetHighestRattings(res.data.expertRating);
      }
    });
  };

  const onGetFundamentalData = (data: any) => {
    let array = [];
    for (let i = 0; i < data.length; i++) {
      array.push(data[i]);
    }

    setFundamentalsArray(array);
  };

  const onGetHighestRattings = (data: any) => {
    let array: any = [
      { type: "Buy", value: data.buyPercent },
      { type: "Sell", value: data.sellPercent },
      { type: "Hold", value: data.holdPercent },
    ];

    setExpertRatingArray(array);
    let maxObject = array.reduce(function (max: any, obj: any) {
      return obj["value"] > max["value"] ? obj : max;
    });

    setExpertRatingFinal(maxObject);
    if (maxObject.type == "Buy") {
      setRatingColor("#76FFC6");
    } else if (maxObject.type == "Sell") {
      setRatingColor("#D04539");
    } else {
      setRatingColor("#FFF7EB");
    }
  };

  const onRedirectToOrders = (searchId: any, orderType: any) => {
    router.push({
      pathname: "/postLogin/stocks/orderExecution",
      query: { searchId: searchId, orderType: orderType },
    });
  };

  const isAlreadySaved = (array: any) => {
    var fliteredArray = array.find((item: any) => {
      var isAlreadySaved = item == stockDetails._id;

      setSaveToWatchList(isAlreadySaved);
    });
  };

  const onGetUserData = (id: any) => {
    setIsLoading(true);
    getUserDataapi(`/api/auth/userDetails?id=${id}`, "GET").then((res: any) => {
      if (!res.errorState) {
        setUserData(res.data);
        isAlreadySaved(res.data.saveList);
        setIsLoading(false);
      }
    });
  };

  const handleChangePromotersHoldings = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setYear(newValue);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      var storedUser: any = localStorage.getItem("userData");
      var userObject: any = JSON.parse(storedUser);
      onGetUserData(userObject._id);
    }

    if (router.isReady) {
      onGetStockDetails(router.query.searchId);
      setCompanyName(router.query.searchId);
      setViewedFrom(router.query.viewedFrom);
    }
  }, [router.query]);

  return (
    <>
      <LayoutWithBackheader
        showHeader={true}
        pageTitle="Stock Details"
        viewedFrom={viewedFrom}
      >
        {isLoading ? (
          <StockDetailsSimmer />
        ) : (
          <>
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
                          background: stockDetails.logoUrl ? "#fff" : "#76FFC6",
                          height: "2.5rem",
                          width: "2.5rem",
                          color: "#1a1a1a",
                          fontSize: "1rem",
                        }}
                      >
                        {stockDetails.logoUrl ? (
                          <img
                            src={stockDetails.logoUrl}
                            height="100%"
                            width="100%"
                          />
                        ) : (
                          <Typography variant="h1" color="#1a1a1a">
                            {stockDetails.displayName && (
                              <>
                                {stockDetails.displayName
                                  .split(" ")[0]
                                  .substring(0, 1)}
                                {stockDetails.displayName.split(" ").length > 1
                                  ? stockDetails.displayName
                                      .split(" ")[1]
                                      .substring(0, 1)
                                  : ""}
                              </>
                            )}
                          </Typography>
                        )}
                      </Avatar>

                      <Typography variant="h1">
                        {stockDetails.displayName}
                      </Typography>

                      <Box
                        sx={{
                          border: `1px solid #76FFC6`,
                          borderRadius: "2rem",
                          p: "0.1rem 0.5rem",
                        }}
                      >
                        <Typography variant="h3">
                          {stockDetails.industryName}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" alignItems="center">
                      <IconButton
                        onClick={() =>
                          onAddToWatchList(userData._id, stockDetails._id)
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

                  <Stack direction="row" alignItems="top" spacing={1}>
                    <Typography fontSize="1.1rem" color="#ccc">
                      ₹
                    </Typography>
                    <Typography fontSize="1.5rem">
                      {stockDetails.priceData && stockDetails.priceData.bse.ltp}
                    </Typography>

                    {/* <Typography
                      variant="h3"
                      color={stockDetails.Change > 0 ? "#76FFC6" : "#EE4D37"}
                    >
                      {getTwoDecimalValues(stockDetails.Change)}%
                    </Typography> */}
                  </Stack>
                </Stack>

                {/* chart */}
                <Typography variant="h2" textAlign="center" py="5rem">
                  Chart to be added here
                </Typography>
                {/* chart */}

                {stockDetails.priceData && (
                  <Box py="2rem">
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      pb="1rem"
                    >
                      <Box>
                        <Typography variant="h3">Today's Low</Typography>
                        <Typography variant="h2" pt={2}>
                          {stockDetails.priceData.bse.low}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="h3">Today's High</Typography>
                        <Typography variant="h2" pt={2} textAlign="right">
                          {stockDetails.priceData.bse.high}
                        </Typography>
                      </Box>
                    </Stack>
                    <BorderLinearProgress
                      variant="determinate"
                      value={
                        stockDetails.priceData.bse.high -
                        stockDetails.priceData.bse.low
                      }
                    />
                  </Box>
                )}

                {/* table */}
                {stockDetails.priceData && (
                  <Grid container spacing={4}>
                    <Grid item xs={3}>
                      <Stack spacing={2}>
                        <Typography variant="h3" color="#8A8A8A">
                          High (52W)
                        </Typography>
                        <Typography variant="h2">
                          {stockDetails.priceData.bse.yearHighPrice}
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={3}>
                      <Stack spacing={2}>
                        <Typography variant="h3" color="#8A8A8A">
                          Low (52W)
                        </Typography>
                        <Typography variant="h2">
                          {stockDetails.priceData.bse.yearLowPrice}
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={3}>
                      <Stack spacing={2}>
                        <Typography variant="h3" color="#8A8A8A">
                          Last Price
                        </Typography>
                        <Typography variant="h2">
                          {stockDetails.priceData.bse.ltp}
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={3}>
                      <Stack spacing={2}>
                        <Typography variant="h3" color="#8A8A8A">
                          Prev Close
                        </Typography>
                        <Typography variant="h2">
                          {stockDetails.priceData.bse.pclose}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                )}

                <Box
                  className="maxWidth"
                  sx={{
                    borderBottom: "2px solid #76FFC6",
                  }}
                >
                  <Typography variant="h2" pt="2rem" pb="0.3rem">
                    About {stockDetails.displayName}
                  </Typography>
                </Box>

                {/* card */}
                <Card sx={{ mt: "1rem", background: "#000", p: "0rem" }}>
                  <CardHeader
                    sx={{ p: "0rem" }}
                    onClick={handleExpandClick}
                    title={
                      <>
                        {!expanded && (
                          <Typography
                            fontSize="0.8rem"
                            fontWeight="200"
                            textAlign="justify"
                            color="#fff"
                          >
                            {stockDetails.businessSummary &&
                              add3Dots(stockDetails.businessSummary, 200)}{" "}
                            <span style={{ color: "#76FFC6" }}>See More</span>
                          </Typography>
                        )}
                      </>
                    }
                    subheader="September 14, 2016"
                  />
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent sx={{ p: "0rem" }} onClick={handleExpandClick}>
                      <Typography
                        fontSize="0.8rem"
                        fontWeight="200"
                        textAlign="justify"
                        color="#fff"
                      >
                        {stockDetails.businessSummary}...
                        <span style={{ color: "#76FFC6" }}>See Less</span>
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
                {/* card */}

                <Grid container spacing={5} pt="1rem">
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="h2" color="#8A8A8A">
                        Parent Organization
                      </Typography>
                      <Typography variant="h2" textAlign="right">
                        {stockDetails.parentCompany}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="h2" color="#8A8A8A">
                        CEO
                      </Typography>
                      <Typography variant="h2" textAlign="right">
                        {stockDetails.ceo}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="h2" color="#8A8A8A">
                        Headquarters
                      </Typography>
                      <Typography variant="h2" textAlign="right">
                        {stockDetails.headquarters}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="h2" color="#8A8A8A">
                        Founded
                      </Typography>
                      <Typography variant="h2" textAlign="right">
                        {stockDetails.foundedYear}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>

                {/* table */}

                {/* fundamentals */}
                <Box
                  className="maxWidth"
                  sx={{
                    borderBottom: "2px solid #76FFC6",
                  }}
                >
                  <Typography variant="h2" pt="2rem" pb="0.3rem">
                    Fundamentals
                  </Typography>
                </Box>

                <Grid container spacing={5} pt="1rem">
                  {fundamentalsArray &&
                    fundamentalsArray.map((item: any, index: any) => (
                      <Grid item xs={6} key={index}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography variant="h2" color="#8A8A8A">
                            {item.name}
                          </Typography>
                          <Typography variant="h2">{item.value}</Typography>
                        </Stack>
                      </Grid>
                    ))}
                </Grid>
                {/* fundamentals */}

                {/* expertRating */}

                <Box
                  className="maxWidth"
                  sx={{
                    borderBottom: "2px solid #76FFC6",
                  }}
                >
                  <Typography variant="h2" pt="2rem" pb="0.3rem">
                    Expert Rating
                  </Typography>
                </Box>

                <Grid container alignItems="center" pt={2}>
                  <Grid item xs={4}>
                    {expertRatingFinal && (
                      <Avatar
                        sx={{
                          height: "5rem",
                          width: "5rem",

                          background: ratingColor,
                        }}
                      >
                        <Typography fontSize="1.6rem" color="#000">
                          {expertRatingFinal && expertRatingFinal.value}
                        </Typography>
                      </Avatar>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    {expertRatingArray &&
                      expertRatingArray.map((item: any, index: any) => (
                        <Grid container alignItems="center" spacing={2} py={2}>
                          <Grid item xs={2}>
                            <Typography variant="h2">{item.type}</Typography>
                          </Grid>
                          <Grid item xs={7.5}>
                            <BorderLinearProgress
                              variant="determinate"
                              value={item.value}
                            />
                          </Grid>
                          <Grid item xs={2.5}>
                            <Typography variant="h2" color="#8A8A8A">
                              {item.value}%
                            </Typography>
                          </Grid>
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
                {/* expertRating */}
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
                  width: { lg: "23%", xs: "95%" },
                  mx: "auto",
                }}
                justifyContent="center"
                spacing={2}
                direction="row"
                alignItems="center"
              >
                <Button
                  onClick={() =>
                    onRedirectToOrders(stockDetails.searchId, "Buy")
                  }
                  variant="contained"
                  fullWidth={true}
                  sx={{
                    background: "#76FFC6",
                    color: "#1a1a1a",
                  }}
                >
                  Buy
                </Button>

                <Button
                  onClick={() =>
                    onRedirectToOrders(stockDetails.searchId, "Sell")
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
          </>
        )}
      </LayoutWithBackheader>
    </>
  );
}
