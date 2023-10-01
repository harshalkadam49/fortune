import { getMutualDetailsapi } from "@/apifunctions/getMutualDetails";
import { getMutualMasterapi } from "@/apifunctions/getMutualMaster";
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

export default function FundDetails() {
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

  const onGetMutualDetailsMaster = (fundName: any) => {
    getMutualDetailsapi(
      `/api/auth/mutualFundDetails?fundName=${fundName}`,
      "GET"
    ).then((res) => {
      if (!res.errorState) {
        setMutualFundDetailsData(res.data);
        getHoildingAnalysis(res.data.holdings);
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

  useEffect(() => {
    if (router.isReady) {
      if (typeof window !== "undefined") {
        onGetMutualDetailsMaster(router.query.fundName);
      }
    }
  }, [router.query]);
  return (
    <LayoutWithBackheader showHeader={true} pageTitle="Mutual Details">
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
                        {mutualFundDetailsData.scheme_name.split(" ").length > 1
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
              <IconButton>
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

              <IconButton>
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
        <Typography variant="h2" textAlign="center" py="5rem">
          Chart to be added here
        </Typography>
        {/* chart */}

        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <Typography variant="h3" color="#8A8A8A">
                NAV {mutualFundDetailsData.nav_date}
              </Typography>
              <Typography variant="h2">{mutualFundDetailsData.nav}</Typography>
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
                            onClick={() =>
                              onRedirectToDetails(item.stock_search_id)
                            }
                          >
                            <Stack direction="row" alignItems="center">
                              <Typography variant="h2" color="#fff">
                                {item.company_name}
                              </Typography>
                              <KeyboardArrowRightIcon
                                sx={{ fontSize: "1.2rem", color: "#fff" }}
                              />
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
                  <ExpandMoreIcon sx={{ color: "#fff", fontSize: "1.5rem" }} />
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
                  <ExpandMoreIcon sx={{ color: "#fff", fontSize: "1.5rem" }} />
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
                  <ExpandMoreIcon sx={{ color: "#fff", fontSize: "1.5rem" }} />
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
                  <ExpandMoreIcon sx={{ color: "#fff", fontSize: "1.5rem" }} />
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
    </LayoutWithBackheader>
  );
}
