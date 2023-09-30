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

export default function Home() {
  const [investmentType, setInvestmentType] = useState("Stocks");
  const [type, setType] = useState("1");
  const [data, setData] = useState<any>();
  const [expanded, setExpanded] = useState(false);

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
          show: true,
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

  useEffect(() => {
    if (typeof window != "undefined") {
      getRadialChart();
    }
  }, []);

  return (
    <LayoutWithBackheader showHeader={true} pageTitle="My Investments">
      <Box px="1rem" pt="5rem" pb="50%">
        <Paper
          sx={{
            background: "#343434",
            borderRadius: "1rem",
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

          <Grid container alignItems="center">
            <Grid item xs={4}>
              <Stack direction="row" alignItems="baseline" spacing={2}>
                <Typography variant="h1" color="#ccc">
                  ₹
                </Typography>
                <Typography fontSize="1.3rem" color="#fff">
                  201254
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="row" alignItems="baseline" spacing={2}>
                <Typography variant="h1" color="#ccc">
                  ₹
                </Typography>
                <Typography fontSize="1.3rem" color="#fff">
                  201254
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="row" alignItems="baseline" spacing={2}>
                <Typography variant="h1" color="#ccc">
                  ₹
                </Typography>
                <Typography fontSize="1.3rem" color="#fff">
                  201254
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        <Grid container alignItems="center" pt="1rem">
          <Grid item xs={7}>
            <FormControl sx={{ width: "80%" }} variant="standard">
              <Select
                value={investmentType}
                onChange={handleChangeInvestmentType}
                disableUnderline
                sx={{
                  background: "#343434",
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
                  background: "#343434",
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
        </Grid>

        <Grid container pt="2rem">
          <Grid item xs={12}>
            <Typography variant="h1" pb="2rem">
              Top Sectors You Invested In :
            </Typography>
          </Grid>

          <Grid item xs={6}>
            {/* <Chart
              options={data.options}
              series={data.series}
              type="radialBar"
              width="380"
            /> */}
            Chart
          </Grid>
          <Grid item xs={6}>
            <Stack direction="column" spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <CircleIcon sx={{ fontSize: "1rem", color: "#F04265" }} />
                <Typography variant="h2">Health</Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                <CircleIcon sx={{ fontSize: "1rem", color: "#0F79FA" }} />
                <Typography variant="h2">Auto</Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                <CircleIcon sx={{ fontSize: "1rem", color: "#C2EABD" }} />
                <Typography variant="h2">IT</Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                <CircleIcon sx={{ fontSize: "1rem", color: "#F9DC5C" }} />
                <Typography variant="h2">Food</Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                <CircleIcon sx={{ fontSize: "1rem", color: "#7F52CB" }} />
                <Typography variant="h2">Hotels</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Typography variant="h1" pt="2rem">
          Top Performing Scheams:
        </Typography>

        {/* <Grid container alignItems="center">
          <Grid item xs={8}>
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{
                  background: "#fff",
                  height: "2.5rem",
                  width: "2.5rem",
                  color: "#1a1a1a",
                  fontSize: "1rem",
                }}
              >
                <Typography variant="h1" color="#1a1a1a">
                  TM
                </Typography>
              </Avatar>

              <Stack>
                <Typography variant="h1" color="#fff">
                  Tata Motors
                </Typography>
                <Typography variant="h1" color="#fff">
                  ₹ 120
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h1" color="#76FFC6">
              ₹ 12000
            </Typography>
          </Grid>
        </Grid> */}

        <>
          <Card
            onClick={handleExpandClick}
            sx={{ background: "#000", my: "1rem" }}
          >
            <CardHeader
              sx={{
                p: "0rem",
              }}
              title={
                <Typography variant="h1" color="#fff">
                  Tata Motors
                </Typography>
              }
              avatar={
                <Avatar
                  sx={{
                    background: "#fff",
                    height: "2.5rem",
                    width: "2.5rem",
                    color: "#1a1a1a",
                    fontSize: "1rem",
                  }}
                >
                  <Typography variant="h1" color="#1a1a1a">
                    TM
                  </Typography>
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <ExpandMoreIcon sx={{ color: "#fff", fontSize: "1.5rem" }} />
                </IconButton>
              }
            />

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
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

                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Stack direction="row" alignItems="baseline" spacing={2}>
                      <Typography fontSize="0.9rem" color="#fff">
                        201254
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={4}>
                    <Stack direction="row" alignItems="baseline" spacing={2}>
                      <Typography fontSize="0.9rem" color="#fff">
                        201254
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={4}>
                    <Stack direction="row" alignItems="baseline" spacing={2}>
                      <Typography fontSize="0.9rem" color="#fff">
                        201254
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Collapse>
          </Card>
          <Divider flexItem sx={{ background: "#ccc" }} />
        </>
        <>
          <Card
            onClick={handleExpandClick}
            sx={{ background: "#000", my: "1rem" }}
          >
            <CardHeader
              sx={{
                p: "0rem",
              }}
              title={
                <Typography variant="h1" color="#fff">
                  Tata Motors
                </Typography>
              }
              avatar={
                <Avatar
                  sx={{
                    background: "#fff",
                    height: "2.5rem",
                    width: "2.5rem",
                    color: "#1a1a1a",
                    fontSize: "1rem",
                  }}
                >
                  <Typography variant="h1" color="#1a1a1a">
                    TM
                  </Typography>
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <ExpandMoreIcon sx={{ color: "#fff", fontSize: "1.5rem" }} />
                </IconButton>
              }
            />

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
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

                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Stack direction="row" alignItems="baseline" spacing={2}>
                      <Typography fontSize="0.9rem" color="#fff">
                        201254
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={4}>
                    <Stack direction="row" alignItems="baseline" spacing={2}>
                      <Typography fontSize="0.9rem" color="#fff">
                        201254
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={4}>
                    <Stack direction="row" alignItems="baseline" spacing={2}>
                      <Typography fontSize="0.9rem" color="#fff">
                        201254
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Collapse>
          </Card>
          <Divider flexItem sx={{ background: "#ccc" }} />
        </>

        <>
          <Card
            onClick={handleExpandClick}
            sx={{ background: "#000", my: "1rem" }}
          >
            <CardHeader
              sx={{
                p: "0rem",
              }}
              title={
                <Typography variant="h1" color="#fff">
                  Tata Motors
                </Typography>
              }
              avatar={
                <Avatar
                  sx={{
                    background: "#fff",
                    height: "2.5rem",
                    width: "2.5rem",
                    color: "#1a1a1a",
                    fontSize: "1rem",
                  }}
                >
                  <Typography variant="h1" color="#1a1a1a">
                    TM
                  </Typography>
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <ExpandMoreIcon sx={{ color: "#fff", fontSize: "1.5rem" }} />
                </IconButton>
              }
            />

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
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

                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Stack direction="row" alignItems="baseline" spacing={2}>
                      <Typography fontSize="0.9rem" color="#fff">
                        201254
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={4}>
                    <Stack direction="row" alignItems="baseline" spacing={2}>
                      <Typography fontSize="0.9rem" color="#fff">
                        201254
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={4}>
                    <Stack direction="row" alignItems="baseline" spacing={2}>
                      <Typography fontSize="0.9rem" color="#fff">
                        201254
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Collapse>
          </Card>
          <Divider flexItem sx={{ background: "#ccc" }} />
        </>
      </Box>
    </LayoutWithBackheader>
  );
}
