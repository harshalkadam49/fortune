import LayoutWithBackheader from "@/components/layouts/withbackheader";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import Chart from "react-apexcharts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  SelectChangeEvent,
  FormControl,
  MenuItem,
  Select,
  Tab,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { getInvestmentDetailsapi } from "@/apifunctions/GET/getInvestmentDetails";
import Lottie from "react-lottie";
import MyInvestementAnmation from "../../../public/postLogin/myInvestments/myInvestments.json";

export default function Home() {
  const [investmentType, setInvestmentType] = useState("Stocks");
  const [type, setType] = useState("1");
  const [data, setData] = useState<any>();
  const [expanded, setExpanded] = useState(true);
  const [currentvalue, setCurrentvalue] = useState<any>(0);
  const [investedValue, setInvestedValue] = useState<any>(0);
  const [totalReturns, setTotalReturns] = useState<any>(0);
  const [totalReturnsPer, setTotalReturnsPer] = useState<any>(0);
  const [investedSchemeArray, setInvestedSchemeArray] = useState<any>([]);

  const handleChangeInvestmentType = (event: SelectChangeEvent) => {
    setInvestmentType(event.target.value as string);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setType(newValue);
  };

  const getRadialChart = () => {
    var data = {
      options: {
        labels: ["A", "B", "C", "D", "E"],
        legend: {
          show: false,
          onItemClick: {
            toggleDataSeries: true,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
        },
        plotOptions: {
          radialBar: {
            size: undefined,
            inverseOrder: false,
            startAngle: 0,
            endAngle: 275,
            offsetX: 0,
            offsetY: 0,
            hollow: {
              margin: 5,
              size: "50%",
              background: "transparent",
              image: undefined,
              imageWidth: 150,
              imageHeight: 150,
              imageOffsetX: 0,
              imageOffsetY: 0,
              imageClipped: true,
              position: "front",
              dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                opacity: 0.5,
              },
            },
            track: {
              show: true,
              startAngle: undefined,
              endAngle: undefined,
              background: "#f2f2f2",
              strokeWidth: "97%",
              opacity: 1,
              margin: 5,
              dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                opacity: 0.5,
              },
            },
            dataLabels: {
              show: true,
              name: {
                show: true,
                fontSize: "22px",
                fontFamily: undefined,
                color: undefined,
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "16px",
                fontFamily: undefined,
                color: undefined,
                offsetY: 16,
                formatter: function (val: any) {
                  return val + "%";
                },
              },
              total: {
                show: true,
                label: "Total",
                color: "#373d3f",
                formatter: function (w: any) {
                  return (
                    w.globals.seriesTotals.reduce((a: any, b: any) => {
                      return a + b;
                    }, 0) /
                      w.globals.series.length +
                    "%"
                  );
                },
              },
            },
          },
        },
      },

      series: [100, 255, 41, 17, 15],
    };

    setData(data);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onGetUserInvesmentsDetails = () => {
    getInvestmentDetailsapi(
      `/api/auth/investmentDetails?userID=64f308547c716331857608eb`,
      "GET"
    ).then((res) => {
      setCurrentvalue(res.data.currentvalue);
      setInvestedValue(res.data.investedValue);
      setTotalReturns(res.data.totalReturns);
      setTotalReturnsPer(res.data.totalReturnsPer);
      setInvestedSchemeArray(res.data.investedSchemeWithLiveData);
    });
  };

  useEffect(() => {
    if (typeof window != "undefined") {
      getRadialChart();
    }

    onGetUserInvesmentsDetails();
  }, []);

  return (
    <LayoutWithBackheader showHeader={true} pageTitle="My Investments">
      <Box px="1rem" pt="5rem" pb="50%">
        <Paper
          sx={{
            background: "#34343459",
            borderRadius: "0.5rem",
            p: "1rem",
          }}
        >
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <Typography fontSize="0.8rem" fontWeight="500" color="#fff">
                Current Value
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography fontSize="0.8rem" fontWeight="500" color="#fff">
                Invested Value
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography fontSize="0.8rem" fontWeight="500" color="#fff">
                Total Returns
              </Typography>
            </Grid>
          </Grid>

          <Grid container alignItems="center" pt="0.3rem">
            <Grid item xs={4}>
              <Stack direction="row" alignItems="baseline" spacing={2}>
                <Typography variant="h1" color="#ccc">
                  ₹
                </Typography>
                <Typography fontSize="0.9rem" color="#fff">
                  {currentvalue}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="row" alignItems="baseline" spacing={2}>
                <Typography variant="h1" color="#ccc">
                  ₹
                </Typography>
                <Typography fontSize="0.9rem" color="#fff">
                  {investedValue}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="row" alignItems="baseline" spacing={2}>
                <Typography variant="h1" color="#ccc">
                  ₹
                </Typography>
                <Typography
                  fontSize="0.9rem"
                  color={totalReturnsPer >= 0 ? "#76FFC6" : "#EE4D37"}
                >
                  {totalReturns} ({totalReturnsPer.toFixed(2)}%)
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* <Grid container alignItems="center" pt="1rem">
          <Grid item xs={7}>
            <FormControl sx={{ width: "80%" }} variant="standard">
              <Select
                value={investmentType}
                onChange={handleChangeInvestmentType}
                disableUnderline
                sx={{
                  background: "#34343459",
                  p: "0.2rem 1rem",
                  borderRadius: "0.5rem",
                  color: "#fff",
                  "& .MuiSvgIcon-root": {
                    color: "white",
                    fontSize: "2rem",
                  },
                }}
              >
                <MenuItem value="Stocks">
                  <Typography variant="h1">Stocks</Typography>
                </MenuItem>
                <MenuItem value="Mutual Funds">
                  <Typography variant="h1">Mutual Funds</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={5}>
            <TabContext value={type}>
              <TabList
                TabIndicatorProps={{
                  style: { backgroundColor: "transparent" },
                }}
                onChange={handleChange}
                centered
                sx={{
                  width: "100%",
                  background: "#34343459",
                  mx: "auto",
                  borderRadius: "2rem",
                  p: "0.3rem",
                  textTransform: "capitalize",
                  minHeight: "0",
                }}
              >
                <Tab
                  label={
                    <Typography
                      variant="h2"
                      fontWeight="600"
                      textTransform="capitalize"
                    >
                      Monthly
                    </Typography>
                  }
                  value="1"
                  sx={{
                    "&.Mui-selected": {
                      background: "#fff",
                      borderRadius: "2rem",
                      color: "#000",
                    },
                    minHeight: "1rem",
                    minWidth: "0",
                    padding: "4px 16px",
                    width: "50%",
                  }}
                />
                <Tab
                  label={
                    <Typography
                      variant="h2"
                      fontWeight="600"
                      textTransform="capitalize"
                    >
                      Yearly
                    </Typography>
                  }
                  value="2"
                  sx={{
                    "&.Mui-selected": {
                      background: "#fff",
                      borderRadius: "2rem",
                      color: "#000",
                    },
                    minHeight: "1rem",
                    minWidth: "0",
                    padding: "4px 16px",
                    width: "50%",
                  }}
                />
              </TabList>
            </TabContext>
          </Grid>
        </Grid> */}
        {/* 
        <Grid container pt="2rem">
          <Grid item xs={12}>
            <Typography variant="h1" pb="2rem">
              Top Sectors You Invested In :
            </Typography>
          </Grid>

          <Grid item xs={12}></Grid>
        </Grid> */}

        <Typography variant="h1" pt="2rem">
          Stocks you invested in:
        </Typography>

        {investedSchemeArray &&
          investedSchemeArray.map((item: any, index: any) => (
            <>
              <Card
                key={index}
                // onClick={handleExpandClick}
                sx={{ background: "#000", my: "1rem" }}
              >
                <CardHeader
                  sx={{
                    p: "0rem",
                  }}
                  title={
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      pr={3}
                    >
                      <Typography variant="h1" color="#fff">
                        {item.symbol}
                      </Typography>

                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography fontSize="0.9rem" variant="h1" color="#ccc">
                          ₹
                        </Typography>
                        <Typography
                          fontSize="0.9rem"
                          color={(
                            ((item.LTP * item.quantity - item.investedValue) /
                              item.investedValue) *
                            100
                          ) >= 0 ? "#76FFC6" : "#EE4D37"}
                        >
                          {item.LTP * item.quantity - item.investedValue} (
                          {(
                            ((item.LTP * item.quantity - item.investedValue) /
                              item.investedValue) *
                            100
                          ).toFixed(2)}
                          %)
                        </Typography>
                      </Stack>
                    </Stack>
                  }
                  avatar={
                    <Avatar
                      sx={{
                        background: item.logoUrl ? "#fff" : "#76FFC6",
                        height: "2.5rem",
                        width: "2.5rem",
                        color: "#1a1a1a",
                        fontSize: "1rem",
                      }}
                    >
                      {item.logoUrl ? (
                        <img src={item.logoUrl} height="100%" width="100%" />
                      ) : (
                        <Typography variant="h1" color="#1a1a1a">
                          {item.symbol}
                        </Typography>
                      )}
                    </Avatar>
                  }
                  action={
                    // <IconButton aria-label="settings">
                    //   <ExpandMoreIcon
                    //     sx={{ color: "#fff", fontSize: "1.5rem" }}
                    //   />
                    // </IconButton>

                    <></>
                  }
                />

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Grid container alignItems="center">
                      <Grid item xs={3.5}>
                        <Typography
                          fontSize="0.8rem"
                          fontWeight="500"
                          color="#fff"
                        >
                          Current Value
                        </Typography>
                      </Grid>
                      <Grid item xs={3.5}>
                        <Typography
                          fontSize="0.8rem"
                          fontWeight="500"
                          color="#fff"
                        >
                          Invested Value
                        </Typography>
                      </Grid>

                      <Grid item xs={1.5}>
                        <Typography
                          fontSize="0.8rem"
                          fontWeight="500"
                          color="#fff"
                        >
                          Qty
                        </Typography>
                      </Grid>

                      <Grid item xs={3}>
                        <Typography
                          fontSize="0.8rem"
                          fontWeight="500"
                          color="#fff"
                        >
                          LTP
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container alignItems="center">
                      <Grid item xs={3.5}>
                        <Stack
                          direction="row"
                          alignItems="baseline"
                          spacing={2}
                        >
                          <Typography fontSize="0.9rem" color="#fff">
                            {item.quantity * item.LTP}
                          </Typography>
                        </Stack>
                      </Grid>

                      <Grid item xs={3.5}>
                        <Stack
                          direction="row"
                          alignItems="baseline"
                          spacing={2}
                        >
                          <Typography fontSize="0.9rem" color="#fff">
                            {item.investedValue}
                          </Typography>
                        </Stack>
                      </Grid>

                      <Grid item xs={1.5}>
                        <Stack
                          direction="row"
                          alignItems="baseline"
                          spacing={2}
                        >
                          <Typography fontSize="0.9rem" color="#fff">
                            {item.quantity}
                          </Typography>
                        </Stack>
                      </Grid>

                      <Grid item xs={3}>
                        <Stack
                          direction="row"
                          alignItems="baseline"
                          spacing={2}
                        >
                          <Typography fontSize="0.9rem" color="#fff">
                            {item.LTP}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Collapse>
              </Card>
              <Divider flexItem sx={{ background: "#ccc" }} />
            </>
          ))}
      </Box>
    </LayoutWithBackheader>
  );
}
