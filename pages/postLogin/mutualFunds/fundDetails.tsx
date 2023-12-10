import { getMutualDetailsapi } from "@/apifunctions/GET/getMutualDetails";
import { getMutualMasterapi } from "@/apifunctions/GET/getMutualMaster";
import LayoutWithBackheader from "@/components/layouts/withbackheader";
import { getTwoDecimalValues } from "@/utilities/commonfunctions";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Paper,
  Slider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import StarsIcon from "@mui/icons-material/Stars";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import dynamic from "next/dynamic";
import moment from "moment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { postAddToWatchListMFapi } from "@/apifunctions/POST/postAddToWatchListMF";
import { model } from "mongoose";
import { postRemoveToWatchListMFapi } from "@/apifunctions/POST/postRemoveToWatchListMF";
import { postRemoveToCartListMFapi } from "@/apifunctions/POST/postRemoveToCartListMF";
import { postAddToCartListMF } from "@/apifunctions/POST/postAddToCartListMF";
import { getSavedSchemesapi } from "@/apifunctions/GET/getSavedSchemes";
import StockDetailsSimmer from "@/components/simmers/stockDetailsSimmer";

export default function FundDetails() {
  const ApexPriceCharts = dynamic(() => import("react-apexcharts"), {
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

  const router = useRouter();
  const [mutualFundDetailsData, setMutualFundDetailsData] = useState<any>({});
  const [saveToWatchList, setSaveToWatchList] = useState<any>(false);
  const [addToCart, setAddToCart] = useState<any>(false);
  const [expanded, setExpanded] = useState(false);
  const [holdingAnalysisTotals, setHoldingAnalysisTotals] = useState<any>();
  const [holdingAnalysisLabels, setHoldingAnalysisLabels] = useState<any>();
  const [timePeriod, setTimePeriod] = useState([
    { mark: "1 Year" },
    { mark: "3 Year" },
    { mark: "5 Year" },
    { mark: "All" },
  ]);
  const [expandHoldings, setExpandHoldings] = useState(false);
  const [expandAllocation, setExpandAllocation] = useState(false);
  const [expandFundDetails, setExpandFundDetails] = useState(false);
  const [expandAMCDetails, setExpandAMCDetails] = useState(false);
  const [expandProsCons, setExpandProsCons] = useState(false);
  const [expandReturns, setExpandReturns] = useState(false);
  const [viewedFrom, setViewedFrom] = useState<any>("");
  const [userData, setUserData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<any>(false);

  const onGetMutualDetailsMaster = (fundName: any) => {
    setIsLoading(true);
    getMutualDetailsapi(
      `/api/auth/mutualFundDetails?fundName=${fundName}`,
      "GET"
    ).then((res) => {
      if (!res.errorState) {
        setMutualFundDetailsData(res.data);
        getHoildingAnalysis(res.data.holdings);
        setIsLoading(false);
      }
    });
  };

  const handleExpandClick = (type: any) => {
    if (type === "holdings") {
      setExpandHoldings(!expandHoldings);
    } else if (type === "allocation") {
      setExpandAllocation(!expandAllocation);
    } else if (type === "fundDetails") {
      setExpandFundDetails(!expandFundDetails);
    } else if (type === "amcDetails") {
      setExpandAMCDetails(!expandAMCDetails);
    } else if (type === "prosCons") {
      setExpandProsCons(!expandProsCons);
    } else if (type === "returns") {
      setExpandReturns(!expandReturns);
    }
  };

  const onRedirectToDetails = (CompanyName: any) => {
    router.push({
      pathname: "/postLogin/stocks/stockDetails",
      query: { CompanyName: CompanyName },
    });
  };

  const getHoildingAnalysis = (data: any) => {
    let sectorsTotals: any = [];
    let holdingAnalysisTotals: any = [];
    let holdingAnalysisLabels: any = [];

    data.map((item: any) => sectorsTotals.push(item.sector_name));

    let uniqueSectorsArray: any = sectorsTotals.filter(
      (value: any, index: any, self: any) => {
        return self.indexOf(value) === index;
      }
    );

    uniqueSectorsArray.map((sectorName: any) => {
      sectorsTotals = data
        .filter((item: any) => item.sector_name === sectorName)
        .reduce((a: any, b: any) => a + b.corpus_per, 0);

      holdingAnalysisTotals.push(sectorsTotals);
      holdingAnalysisLabels.push(sectorName);
    });

    setHoldingAnalysisTotals([...holdingAnalysisTotals]);
    setHoldingAnalysisLabels([...holdingAnalysisLabels]);
  };

  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
  const apexState: any = {
    options: {
      dataLabels: {
        enabled: true,
      },

      stroke: {
        show: false, // Set to false to hide the stroke color
      },
      labels: holdingAnalysisLabels,
    },
    series: holdingAnalysisTotals,
  };

  const onPostToWatchListMF = (userID: any, searchID: any) => {
    setSaveToWatchList(!saveToWatchList);
    let model: any = {
      userID: userID,
      searchID: searchID,
    };

    if (saveToWatchList) {
      postRemoveToWatchListMFapi(
        model,
        "/api/auth/userRemoveToMFWatchList",
        "POST"
      );
    } else {
      postAddToWatchListMFapi(model, "/api/auth/userAddToMFWatchList", "POST");
    }
  };

  const onPostToCartListMF = (userID: any, searchID: any) => {
    setAddToCart(!addToCart);
    let model: any = {
      userID: userID,
      searchID: searchID,
    };

    if (addToCart) {
      postRemoveToCartListMFapi(
        model,
        "/api/auth/userRemoveToMFCartList",
        "POST"
      );
    } else {
      postAddToCartListMF(model, "/api/auth/userAddToMFCart", "POST");
    }
  };

  const onGetSavedSchemes = (userID: any, searchID: any) => {
    getSavedSchemesapi(
      `/api/auth/savedSchemes?userID=${userID}&searchID=${searchID}`,
      "GET"
    ).then((res) => {
      setAddToCart(res.isSavedToCart.length > 0 ? true : false);
      setSaveToWatchList(res.isSavedToWatchLists.length > 0 ? true : false);
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      var storedUser: any = localStorage.getItem("userData");
      var userObject: any = JSON.parse(storedUser);
      setUserData(userObject);
    }

    if (router.isReady) {
      onGetMutualDetailsMaster(router.query.fundName);
      setViewedFrom(router.query.viewedFrom);
      onGetSavedSchemes(userObject._id, router.query.fundName);
    }
  }, [router.query]);
  return (
    <LayoutWithBackheader
      showHeader={true}
      pageTitle="Mutual Details"
      viewedFrom={viewedFrom}
    >
      {isLoading ? (
        <StockDetailsSimmer />
      ) : (
        <Box px="1rem" pt="5rem" pb="50%">
          <Stack direction="column" spacing={2}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              justifyContent="space-between"
            >
              {mutualFundDetailsData.logo_url && (
                <Avatar
                  sx={{
                    background: mutualFundDetailsData.logo_url
                      ? "#fff"
                      : "#76FFC6",
                    height: "2.5rem",
                    width: "2.5rem",
                    color: "#1a1a1a",
                    fontSize: "1rem",
                  }}
                >
                  {mutualFundDetailsData.logo_url ? (
                    <img
                      src={mutualFundDetailsData.logo_url}
                      height="100%"
                      width="100%"
                    />
                  ) : (
                    <Typography variant="h1" color="#1a1a1a">
                      {mutualFundDetailsData.scheme_name && (
                        <>
                          {mutualFundDetailsData.scheme_name
                            .split(" ")[0]
                            .substring(0, 1)}
                          {mutualFundDetailsData.scheme_name.split(" ").length >
                          1
                            ? mutualFundDetailsData.scheme_name
                                .split(" ")[1]
                                .substring(0, 1)
                            : ""}
                        </>
                      )}
                    </Typography>
                  )}
                </Avatar>
              )}

              <Stack direction="row" alignItems="center">
                {/* cannot place multiple orders at once */}
                <IconButton
                  onClick={() =>
                    onPostToCartListMF(
                      userData._id,
                      mutualFundDetailsData.search_id
                    )
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
                </IconButton>
                {/* cannot place multiple orders at once */}

                <IconButton
                  onClick={() =>
                    onPostToWatchListMF(
                      userData._id,
                      mutualFundDetailsData.search_id
                    )
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

            <Typography variant="h1" pt="0.5rem">
              {mutualFundDetailsData.scheme_name}
            </Typography>

            <Stack direction="row" spacing={3}>
              <Box
                sx={{
                  border: `1px solid #76FFC6`,
                  borderRadius: "2rem",
                  p: "0.2rem 0.5rem",
                }}
              >
                <Typography variant="h3">
                  {mutualFundDetailsData.sub_category}
                </Typography>
              </Box>

              <Box
                sx={{
                  border: `1px solid #76FFC6`,
                  borderRadius: "2rem",
                  p: "0.2rem 0.5rem",
                }}
              >
                <Typography variant="h3">
                  {mutualFundDetailsData.category}
                </Typography>
              </Box>
            </Stack>
          </Stack>

          {/* chart */}
          <Box sx={{ ml: "-15%" }}>
            <ApexPriceCharts
              options={state.options}
              series={state.series}
              type="line"
            />
          </Box>
          {/* chart */}

          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Stack spacing={2}>
                <Typography variant="h3" color="#8A8A8A">
                  NAV {mutualFundDetailsData.nav_date}
                </Typography>
                <Typography variant="h2">
                  {mutualFundDetailsData.nav}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack spacing={2}>
                <Typography variant="h3" color="#8A8A8A">
                  Rating
                </Typography>

                <Stack direction="row" spacing={2}>
                  <Typography variant="h2" color="#fff">
                    {mutualFundDetailsData.groww_rating == null
                      ? "NA"
                      : mutualFundDetailsData.groww_rating}
                  </Typography>

                  {mutualFundDetailsData.groww_rating && (
                    <StarsIcon sx={{ fontSize: "1rem", color: "#F5DFA3" }} />
                  )}
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack spacing={2}>
                <Typography variant="h3" color="#8A8A8A">
                  {mutualFundDetailsData.sip_allowed ? (
                    <>Min SIP amount</>
                  ) : (
                    <>Min Lumpsum amount</>
                  )}
                </Typography>
                <Typography variant="h2">
                  {mutualFundDetailsData.sip_allowed ? (
                    <>{mutualFundDetailsData.min_sip_investment}</>
                  ) : (
                    <>{mutualFundDetailsData.min_investment_amount}</>
                  )}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack spacing={2}>
                <Typography variant="h3" color="#8A8A8A">
                  Fund Size
                </Typography>
                <Typography variant="h2">
                  {getTwoDecimalValues(mutualFundDetailsData.aum)} Cr
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ background: "#fff", my: "1rem" }} />

          {/* Holdings */}
          <>
            {mutualFundDetailsData.holdings && (
              <>
                <Card
                  sx={{
                    background: "#000",
                    my: "1rem",
                    cursor: "pointer",
                  }}
                >
                  <CardHeader
                    onClick={() => handleExpandClick("holdings")}
                    sx={{
                      p: "0rem",
                    }}
                    title={
                      <Typography variant="h1" color="#fff">
                        Holdings (
                        {mutualFundDetailsData.holdings &&
                          mutualFundDetailsData.holdings.length}
                        ) :
                      </Typography>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <ExpandMoreIcon
                          sx={{ color: "#fff", fontSize: "1.5rem" }}
                        />
                      </IconButton>
                    }
                  />

                  <Collapse in={expandHoldings} timeout="auto" unmountOnExit>
                    <CardContent
                      sx={{ px: "0rem", height: "20rem", overflowY: "scroll" }}
                    >
                      {mutualFundDetailsData.holdings &&
                        mutualFundDetailsData.holdings.map(
                          (item: any, index: any) => (
                            <Stack
                              sx={{
                                cursor: "pointer",
                              }}
                              direction="row"
                              key={index}
                              py="0.5rem"
                              justifyContent="space-between"
                              // onClick={() =>
                              //   onRedirectToDetails(item.stock_search_id)
                              // }
                            >
                              <Stack direction="row" alignItems="center">
                                <Typography variant="h2" color="#fff">
                                  {item.company_name}
                                </Typography>
                                {/* <KeyboardArrowRightIcon
                                  sx={{ fontSize: "1.2rem", color: "#fff" }}
                                /> */}
                              </Stack>
                              <Typography variant="h2" color="#fff">
                                {getTwoDecimalValues(item.corpus_per)}%
                              </Typography>
                            </Stack>
                          )
                        )}
                    </CardContent>
                  </Collapse>
                </Card>
                <Divider flexItem sx={{ background: "#ccc" }} />
              </>
            )}
          </>
          {/* Holdings */}

          {/* Equity sector allocation */}
          <>
            <Card
              sx={{
                background: "#000",
                my: "1rem",
                cursor: "pointer",
              }}
            >
              <CardHeader
                onClick={() => handleExpandClick("allocation")}
                sx={{
                  p: "0rem",
                }}
                title={
                  <Typography variant="h1" color="#fff" py="1rem">
                    Equity sector allocation
                  </Typography>
                }
                action={
                  <IconButton aria-label="settings">
                    <ExpandMoreIcon
                      sx={{ color: "#fff", fontSize: "1.5rem" }}
                    />
                  </IconButton>
                }
              />

              <Collapse in={expandAllocation} timeout="auto" unmountOnExit>
                <CardContent sx={{ px: "0rem" }}>
                  <Box className="MFHoldingAnalysis">
                    <ApexCharts
                      options={apexState.options}
                      series={apexState.series}
                      type="donut"
                      height={300}
                      width="100%"
                    />
                  </Box>
                </CardContent>
              </Collapse>
            </Card>
            <Divider flexItem sx={{ background: "#ccc" }} />
          </>
          {/* Equity sector allocation */}

          {/* Fund Details */}
          <>
            <Card
              sx={{
                background: "#000",
                my: "1rem",
                cursor: "pointer",
              }}
            >
              <CardHeader
                onClick={() => handleExpandClick("fundDetails")}
                sx={{
                  p: "0rem",
                }}
                title={
                  <Typography variant="h1" color="#fff" py="1rem">
                    Fund Details
                  </Typography>
                }
                action={
                  <IconButton aria-label="settings">
                    <ExpandMoreIcon
                      sx={{ color: "#fff", fontSize: "1.5rem" }}
                    />
                  </IconButton>
                }
              />

              <Collapse in={expandFundDetails} timeout="auto" unmountOnExit>
                <CardContent sx={{ px: "0rem" }}>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <Typography fontSize="0.9rem" color="#ccc">
                        Scheme Name :
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography fontSize="0.9rem" color="#fff">
                        {mutualFundDetailsData.scheme_name}
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography fontSize="0.9rem" color="#ccc">
                        Fund Summary :
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography fontSize="0.9rem" color="#fff">
                        {mutualFundDetailsData.description}
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography fontSize="0.9rem" color="#ccc">
                        Min Lumsump Amt :
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography fontSize="0.9rem" color="#fff">
                        ₹ {mutualFundDetailsData.min_investment_amount}
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography fontSize="0.9rem" color="#ccc">
                        Min SIP Amt :
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography fontSize="0.9rem" color="#fff">
                        ₹ {mutualFundDetailsData.min_sip_investment}
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography fontSize="0.9rem" color="#ccc">
                        Plan Type :
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography fontSize="0.9rem" color="#fff">
                        {mutualFundDetailsData.plan_type}
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography fontSize="0.9rem" color="#ccc">
                        Scheme Type :
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography fontSize="0.9rem" color="#fff">
                        {mutualFundDetailsData.scheme_type}
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography fontSize="0.9rem" color="#ccc">
                        Fund House :
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography fontSize="0.9rem" color="#fff">
                        {mutualFundDetailsData.fund_house}
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography fontSize="0.9rem" color="#ccc">
                        Fund Manager :
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography fontSize="0.9rem" color="#fff">
                        {mutualFundDetailsData.fund_manager}
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography fontSize="0.9rem" color="#ccc">
                        Launch Date :
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography fontSize="0.9rem" color="#fff">
                        {mutualFundDetailsData.launch_date}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Collapse>
            </Card>
            <Divider flexItem sx={{ background: "#ccc" }} />
          </>
          {/* Fund Details */}

          {/* AMC Details */}
          <>
            <Card
              sx={{
                background: "#000",
                my: "1rem",
                cursor: "pointer",
              }}
            >
              <CardHeader
                onClick={() => handleExpandClick("amcDetails")}
                sx={{
                  p: "0rem",
                }}
                title={
                  <Typography variant="h1" color="#fff" py="1rem">
                    AMC Details
                  </Typography>
                }
                action={
                  <IconButton aria-label="settings">
                    <ExpandMoreIcon
                      sx={{ color: "#fff", fontSize: "1.5rem" }}
                    />
                  </IconButton>
                }
              />

              <Collapse in={expandAMCDetails} timeout="auto" unmountOnExit>
                <CardContent sx={{ px: "0rem" }}>
                  {mutualFundDetailsData.amc_info ? (
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <Typography fontSize="0.9rem" color="#ccc">
                          Name :
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography fontSize="0.9rem" color="#fff">
                          {mutualFundDetailsData.amc_info.name
                            ? mutualFundDetailsData.amc_info.name
                            : "NA"}
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography fontSize="0.9rem" color="#ccc">
                          Address :
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography fontSize="0.9rem" color="#fff">
                          {mutualFundDetailsData.amc_info.address}
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography fontSize="0.9rem" color="#ccc">
                          Phone :
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography fontSize="0.9rem" color="#fff">
                          {mutualFundDetailsData.amc_info.phone}
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography fontSize="0.9rem" color="#ccc">
                          AUM :
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography fontSize="0.9rem" color="#fff">
                          {getTwoDecimalValues(
                            mutualFundDetailsData.amc_info.aum
                          )}{" "}
                          Cr
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography fontSize="0.9rem" color="#ccc">
                          Description :
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography fontSize="0.9rem" color="#fff">
                          {mutualFundDetailsData.amc_info.description}
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography fontSize="0.9rem" color="#ccc">
                          Rank :
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography fontSize="0.9rem" color="#fff">
                          {mutualFundDetailsData.amc_info.rank}
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography fontSize="0.9rem" color="#ccc">
                          Launch Date :
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography fontSize="0.9rem" color="#fff">
                          {moment(
                            mutualFundDetailsData.amc_info.launch_date
                          ).format("DD-MMMM-YYYY")}
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography fontSize="0.9rem" color="#ccc">
                          Email :
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography fontSize="0.9rem" color="#fff">
                          {mutualFundDetailsData.amc_info.email}
                        </Typography>
                      </Grid>
                    </Grid>
                  ) : (
                    <>Data not available</>
                  )}
                </CardContent>
              </Collapse>
            </Card>
            <Divider flexItem sx={{ background: "#ccc" }} />
          </>
          {/* AMC Details */}

          {/* PROS AND CONS */}
          <>
            {mutualFundDetailsData.analysis && (
              <>
                <Card
                  sx={{
                    background: "#000",
                    my: "1rem",
                    cursor: "pointer",
                  }}
                >
                  <CardHeader
                    onClick={() => handleExpandClick("prosCons")}
                    sx={{
                      p: "0rem",
                    }}
                    title={
                      <Typography variant="h1" color="#fff" py="1rem">
                        Pros and Cons
                      </Typography>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <ExpandMoreIcon
                          sx={{ color: "#fff", fontSize: "1.5rem" }}
                        />
                      </IconButton>
                    }
                  />

                  <Collapse in={expandProsCons} timeout="auto" unmountOnExit>
                    <CardContent sx={{ px: "0rem" }}>
                      <Stack direction="column" spacing={3}>
                        {mutualFundDetailsData.analysis.map(
                          (item: any) =>
                            item.analysis_type === "PROS" && (
                              <Stack
                                direction="row"
                                alignItems="flex-start"
                                spacing={3}
                              >
                                <ThumbUpAltIcon
                                  sx={{ fontSize: "1.2rem", color: "#74FB8F" }}
                                />
                                <Typography fontSize="0.9rem" color="#fff">
                                  {item.analysis_desc}
                                </Typography>
                              </Stack>
                            )
                        )}

                        {mutualFundDetailsData.analysis.map(
                          (item: any) =>
                            item.analysis_type === "CONS" && (
                              <Stack
                                direction="row"
                                alignItems="flex-start"
                                spacing={3}
                              >
                                <ThumbDownAltIcon
                                  sx={{ fontSize: "1.2rem", color: "#EA4861" }}
                                />
                                <Typography fontSize="0.9rem" color="#fff">
                                  {item.analysis_desc}
                                </Typography>
                              </Stack>
                            )
                        )}
                      </Stack>
                    </CardContent>
                  </Collapse>
                </Card>
                <Divider flexItem sx={{ background: "#ccc" }} />
              </>
            )}
          </>
          {/* PROS AND CONS */}

          {/* Returns */}
          <>
            <Card
              sx={{
                background: "#000",
                my: "1rem",
                cursor: "pointer",
              }}
            >
              <CardHeader
                onClick={() => handleExpandClick("returns")}
                sx={{
                  p: "0rem",
                }}
                title={
                  <Typography variant="h1" color="#fff" py="1rem">
                    Returns
                  </Typography>
                }
                action={
                  <IconButton aria-label="settings">
                    <ExpandMoreIcon
                      sx={{ color: "#fff", fontSize: "1.5rem" }}
                    />
                  </IconButton>
                }
              />

              <Collapse in={expandReturns} timeout="auto" unmountOnExit>
                <CardContent sx={{ px: "0rem" }}>
                  <TableContainer
                    sx={{ background: "#000", border: "1px solid #000" }}
                    component={Paper}
                  >
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Typography fontSize="0.9rem" color="#fff">
                              Category
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              align="right"
                              fontSize="0.9rem"
                              color="#fff"
                            >
                              1Y
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              align="right"
                              fontSize="0.9rem"
                              color="#fff"
                            >
                              3Y
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              align="right"
                              fontSize="0.9rem"
                              color="#fff"
                            >
                              5Y
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              align="right"
                              fontSize="0.9rem"
                              color="#fff"
                            >
                              All
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mutualFundDetailsData.stats &&
                          mutualFundDetailsData.stats.map(
                            (row: any, index: any) => (
                              <TableRow
                                key={index}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell>
                                  <Typography fontSize="0.7rem" color="#fff">
                                    {row.title}
                                  </Typography>
                                </TableCell>

                                <TableCell align="right">
                                  <Typography fontSize="0.7rem" color="#fff">
                                    {row.stat_1y
                                      ? getTwoDecimalValues(row.stat_1y)
                                      : "NA"}
                                    %
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Typography fontSize="0.7rem" color="#fff">
                                    {row.stat_3y
                                      ? getTwoDecimalValues(row.stat_3y)
                                      : "NA"}
                                    %
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Typography fontSize="0.7rem" color="#fff">
                                    {row.stat_5y
                                      ? getTwoDecimalValues(row.stat_5y)
                                      : "NA"}
                                    %
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Typography fontSize="0.7rem" color="#fff">
                                    {row.stat_all
                                      ? getTwoDecimalValues(row.stat_all)
                                      : "NA"}
                                    %
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            )
                          )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Collapse>
            </Card>
          </>
          {/* Returns */}
        </Box>
      )}
    </LayoutWithBackheader>
  );
}
