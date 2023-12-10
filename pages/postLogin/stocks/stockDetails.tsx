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
  const [livePriceData, setLivePriceData] = useState<any>({});
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

  const ApexCharts = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },

      grid: {
        show: false,
      },
      legend: {
        show: false,
      },
      toolbar: {
        show: false,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      tooltip: {
        enabled: false,
      },
      colors: ["#76FFC6", "#76FFC6"],
      stroke: {
        width: 2,
      },
    },

    series: [
      {
        data: [
          995.15, 995.05, 993.75, 993.45, 995.2, 994.95, 995.3, 995.35, 996.2,
          997.05, 996.95, 997.4, 997.0, 997.15, 997.6, 997.7, 998.0, 997.7,
          997.7, 997.3, 997.55, 997.25, 997.65, 997.55, 997.7, 997.15, 997.35,
          999.4, 999.2, 999.7, 999.7, 999.0, 999.7, 999.1, 1000.35, 999.7,
          999.8, 1000.75, 1000.7, 1000.05, 999.95, 999.35, 1000.0, 1000.55,
          1001.45, 1000.75, 1001.0, 1002.5, 1002.5, 1003.5, 1004.45, 1004.0,
          1003.75, 1003.45, 1003.7, 1002.25, 1003.5, 1004.2, 1003.85, 1004.05,
          1004.05, 1004.1, 1003.2, 1003.1, 1003.2, 1004.0, 1003.85, 1002.4,
          1001.8, 1002.45, 1002.1, 1002.4, 1002.4, 1002.85, 1005.35, 1005.2,
          1004.95, 1005.15, 1004.8, 1004.65, 1004.1, 1003.85, 1003.3, 1003.9,
          1004.15, 1004.2, 1003.35, 1003.7, 1004.25, 1003.55, 1003.1, 1002.5,
          1002.1, 1001.6, 1000.9, 1000.4, 1000.35, 999.95, 1000.85, 1000.45,
          1000.5, 1000.95, 1000.95, 1000.9, 1000.7, 1000.35, 1000.9, 999.5,
          998.25, 998.05, 999.05, 998.1, 998.95, 999.65, 999.9, 1000.3, 1000.25,
          1000.75, 1001.8, 1003.15, 1003.25, 1003.45, 1002.8, 1003.2, 1003.9,
          1003.85, 1004.5, 1004.0, 1004.25, 1004.5, 1004.15, 1003.6, 1003.0,
          1003.1, 1003.4, 1003.55, 1003.85, 1003.25, 1003.4, 1003.6, 1003.45,
          1003.6, 1003.4, 1002.85, 1002.9, 1002.8, 1002.95, 1003.25, 1003.7,
          1003.7, 1003.15, 1002.6, 1002.65, 1003.25, 1003.5, 1003.85, 1003.5,
          1002.85, 1003.0, 1003.0, 1002.75, 1003.3, 1003.35, 1003.15, 1003.05,
          1003.1, 1002.95, 1003.0, 1003.15, 1003.3, 1003.25, 1003.05, 1003.5,
          1003.15, 1003.0, 1002.95, 1002.95, 1003.1, 1003.15, 1003.15, 1003.6,
          1003.55, 1003.25, 1002.65, 1002.55, 1002.15, 1002.25, 1001.5, 1001.65,
          1001.85, 1001.75, 1001.55, 1001.65, 1002.15, 1002.4, 1002.8, 1002.5,
          1002.45, 1002.9, 1002.95, 1003.0, 1003.1, 1002.2, 1002.7, 1002.2,
          1002.4, 1001.8, 1001.7, 1001.85, 1001.75, 1002.0, 1001.25, 1000.5,
          1000.1, 1000.05, 1000.75, 1000.1, 1000.75, 1000.6, 1000.85, 1000.7,
          1000.45, 1000.9, 1001.3, 1001.45, 1001.45, 1001.5, 1001.35, 1001.0,
          999.35, 999.15, 999.45, 1000.0, 1000.1, 999.9, 999.9, 1000.2, 999.9,
          1000.35, 1000.6, 1000.75, 1001.7, 1002.2, 1002.4, 1002.0, 1001.9,
          1001.95, 1002.7, 1002.5, 1002.45, 1003.0, 1003.25, 1003.25, 1003.1,
          1003.3, 1004.1, 1004.3, 1004.35, 1004.5, 1004.75, 1005.1, 1004.9,
          1004.45, 1004.3, 1004.3, 1004.5, 1004.55, 1004.75, 1004.95, 1004.45,
          1004.3, 1004.65, 1004.35, 1004.75, 1006.05, 1006.8, 1007.15, 1007.7,
          1006.8, 1007.0, 1007.2, 1007.0, 1007.15, 1007.3, 1007.45, 1008.05,
          1007.9, 1008.1, 1007.95, 1008.6, 1008.15, 1008.25, 1007.95, 1008.45,
          1008.2, 1007.95, 1008.0, 1008.05, 1008.15, 1008.15, 1008.0, 1007.2,
          1007.0, 1007.0, 1005.95, 1006.2, 1005.2, 1005.15, 1005.95, 1005.95,
          1006.3, 1007.1, 1006.85, 1006.7, 1006.95, 1006.85, 1006.95, 1006.25,
          1006.35, 1006.2, 1006.6, 1006.6, 1007.3, 1008.0, 1008.25, 1007.35,
          1007.0, 1006.85, 1007.75, 1008.8, 1008.8, 1008.75, 1009.3, 1009.5,
          1008.75, 1009.1, 1009.1, 1008.75, 1008.35, 1009.1, 1009.0, 1008.45,
          1007.65, 1008.2, 1007.8, 1008.8, 1008.4, 1009.9, 1009.05, 1010.35,
          1011.2, 1010.5, 1011.15, 1010.4, 1011.2, 1011.0, 1012.1, 1011.35,
          1011.75, 1012.0, 1012.05, 1011.8, 1011.0, 1011.15, 1011.45, 1010.8,
          1011.2, 1011.1, 1011.95, 1011.05, 1011.25, 1011.05, 1011.4, 1011.5,
          1011.5,
        ],
      },
    ],
  };

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
        setLivePriceData(res.livePriceData);
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
    if (data) {
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

                  <Stack direction="row" alignItems="baseline" spacing={2}>
                    <Typography fontSize="1rem" color="#ccc">
                      ₹
                    </Typography>
                    <Typography fontSize="1.4rem">
                      {livePriceData.ltp && livePriceData.ltp}
                    </Typography>

                    <Typography
                      fontSize="0.8rem"
                      color={
                        livePriceData.dayChangePerc > 0 ? "#76FFC6" : "#EE4D37"
                      }
                    >
                      ({getTwoDecimalValues(livePriceData.dayChangePerc)}%)
                    </Typography>
                  </Stack>
                </Stack>

                {/* chart */}
                <Box sx={{ ml: "-15%" }}>
                  <ApexCharts
                    options={state.options}
                    series={state.series}
                    type="line"
                  />
                </Box>
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
                          {livePriceData.low}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="h3">Today's High</Typography>
                        <Typography variant="h2" pt={2} textAlign="right">
                          {livePriceData.high}
                        </Typography>
                      </Box>
                    </Stack>
                    <BorderLinearProgress
                      variant="determinate"
                      value={livePriceData.high - livePriceData.low}
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
                          Open
                        </Typography>
                        <Typography variant="h2">
                          {livePriceData.open}
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={3}>
                      <Stack spacing={2}>
                        <Typography variant="h3" color="#8A8A8A">
                          Close
                        </Typography>
                        <Typography variant="h2">
                          {livePriceData.close}
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={3}>
                      <Stack spacing={2}>
                        <Typography variant="h3" color="#8A8A8A">
                          Volume
                        </Typography>
                        <Typography variant="h2">
                          {livePriceData.volume}
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

                {expertRatingFinal && (
                  <>
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
                        <Avatar
                          sx={{
                            height: "5rem",
                            width: "5rem",

                            background: ratingColor,
                          }}
                        >
                          <Typography fontSize="1.6rem" color="#000">
                            {expertRatingFinal.value}
                          </Typography>
                        </Avatar>
                      </Grid>
                      <Grid item xs={8}>
                        {expertRatingArray.map((item: any, index: any) => (
                          <Grid
                            container
                            alignItems="center"
                            spacing={2}
                            py={2}
                          >
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
                  </>
                )}

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

                {/* <Button
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
                </Button> */}
              </Stack>
            </Box>
          </>
        )}
      </LayoutWithBackheader>
    </>
  );
}
