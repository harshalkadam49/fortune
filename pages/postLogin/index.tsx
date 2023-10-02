import PostloginLayout from "@/components/layouts/postLogin";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Pagination, FreeMode } from "swiper/modules";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

// images
import DummyImgSlider from "../../public/dummyImg.svg";
import ComingSoon from "../../public/postLogin/comingSoon.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getEquityMasterapi } from "@/apifunctions/getEquityMaster";
import { add3Dots, getTwoDecimalValues } from "@/utilities/commonfunctions";
import { getEquityLoosersapi } from "@/apifunctions/getEquityLoosers";
import { getIndianIndicesMasterapi } from "@/apifunctions/getIndianIndicesMaster";
import { color } from "framer-motion";
import { useRouter } from "next/router";
import Loader from "@/components/loader";
import PostLoginSimmer from "@/components/simmers/postLoginSimmer";
import SmallCap from "../../public/postLogin/small_cap.png";
import MidCap from "../../public/postLogin/mid_cap.png";
import LargeCap from "../../public/postLogin/large_cap.png";
import SIP_With_500 from "../../public/postLogin/SIP_With_500.png";
import Tax_saving from "../../public/postLogin/tax_saving.png";
import High_returns from "../../public/postLogin/high_returns.png";
import { getPopularFundsapi } from "@/apifunctions/getPopularFunds";

export default function Home() {
  const router = useRouter();
  const [type, setType] = useState<any>("1");
  const [isLoading, setIsLoading] = useState(false);
  const [stocksType, setStocksType] = useState("Gainers");
  const [equityLists, setEquityLists] = useState([]);
  const [indianEquityGainersLoosers, setIndianEquityGainersLoosers] = useState(
    []
  );
  const [indianIndices, setIndianIndices] = useState([]);
  const [indianSectors, setIndianSectors] = useState([]);
  const [fundCategory, setFundCategory] = useState([
    {
      id: 0,
      title: "Small Cap",
      type: "Small Cap",
      icon: SmallCap,
    },
    {
      id: 1,
      title: "Mid Cap",
      type: "Mid Cap",
      icon: MidCap,
    },
    {
      id: 2,
      title: "Large Cap",
      type: "Large Cap",
      icon: LargeCap,
    },
    {
      id: 3,
      title: "SIP With 500",
      type: "SIP500",
      icon: SIP_With_500,
    },
    {
      id: 4,
      title: "Tax Saving",
      type: "ELSS",
      icon: Tax_saving,
    },
    {
      id: 5,
      title: "High Returns",
      type: "High returns",
      icon: High_returns,
    },
  ]);
  const [popularFunds, setPopularFunds] = useState([]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setType(newValue);
  };

  const handleChangeStockType = (event: SelectChangeEvent) => {
    setIsLoading(true);
    setStocksType(event.target.value as string);
    if (event.target.value == "Gainers") {
      onGetEquityGainers();
    } else {
      onGetEquityLoosers();
    }
  };

  const onGetEquityGainers = () => {
    setIsLoading(true);
    const result = equityLists.filter((c: any) => c.Change >= 0);
    setIndianEquityGainersLoosers(result);
    setIsLoading(false);
  };

  const onGetEquityLoosers = () => {
    setIsLoading(true);
    const result = equityLists.filter((c: any) => c.Change < 0);
    setIndianEquityGainersLoosers(result);
    setIsLoading(false);
  };

  const onGetIndianIndicesMaster = () => {
    setIsLoading(true);
    getIndianIndicesMasterapi("/api/auth/equityIndicesMaster", "GET").then(
      (res) => {
        if (!res.errorState) {
          setIndianIndices(res);
          setIsLoading(false);
        }
      }
    );
  };

  const onGetIndianSectorsMaster = () => {
    getIndianIndicesMasterapi("/api/auth/equitySectorsMaster", "GET").then(
      (res) => {
        if (!res.errorState) {
          setIndianSectors(res);
          setIsLoading(false);
        }
      }
    );
  };

  const onGetEquityLists = () => {
    setIsLoading(true);
    getEquityMasterapi(`/api/auth/equityMaster`, "GET").then((res) => {
      if (!res.errorState) {
        setEquityLists(res);
        setIsLoading(false);

        const result = res.filter((c: any) => c.Change >= 0);
        setIndianEquityGainersLoosers(result);
      }
    });
  };

  const onRedirectToDetails = (CompanyName: any, viewedFrom: any) => {
    router.push({
      pathname: "/postLogin/stocks/stockDetails",
      query: { CompanyName: CompanyName, viewedFrom: viewedFrom },
    });
  };

  const onSeeMoreClick = (viewedFrom: any) => {
    router.push({
      pathname: "/postLogin/mutualFunds/fundLists",
      query: { viewedFrom: viewedFrom },
    });
  };

  const onRedirectToCategoryList = (type: "any", viewedFrom: any) => {
    router.push({
      pathname: "/postLogin/mutualFunds/fundCategory",
      query: { type: type, viewedFrom: viewedFrom },
    });
  };

  const onGetPopularFunds = () => {
    getPopularFundsapi("/api/auth/popularFunds", "GET").then((res: any) => {
      setPopularFunds(res);
    });
  };

  const onRedirectToMFDetails = (fundName: any, viewedFrom: any) => {
    router.push({
      pathname: "/postLogin/mutualFunds/fundDetails",
      query: {
        fundName: fundName,
        viewedFrom: viewedFrom,
      },
    });
  };
  useEffect(() => {
    onGetIndianIndicesMaster();
    onGetIndianSectorsMaster();
    onGetEquityLists();
    onGetPopularFunds();

    if (router.isReady) {
      setType(router.query.viewedFrom);
    }
  }, []);

  return (
    <PostloginLayout>
      {isLoading ? (
        <PostLoginSimmer />
      ) : (
        <Box pt="5rem" pb="50%">
          <Swiper
            pagination={true}
            modules={[Pagination]}
            className="adsBanner"
          >
            <SwiperSlide>
              <Box
                sx={{
                  background: "#34343459",
                  height: "11rem",
                  textAlign: "center",
                  mx: "1rem",
                  borderRadius: "0.5rem",
                }}
              >
                <Image
                  src={DummyImgSlider}
                  height={170}
                  width={320}
                  alt="DummyImgSlider"
                />
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box
                sx={{
                  background: "#34343459",
                  height: "11rem",
                  textAlign: "center",
                  mx: "1rem",
                  borderRadius: "0.5rem",
                }}
              >
                <Image
                  src={DummyImgSlider}
                  height={170}
                  width={320}
                  alt="DummyImgSlider"
                />
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box
                sx={{
                  background: "#34343459",
                  height: "11rem",
                  textAlign: "center",
                  mx: "1rem",
                  borderRadius: "0.5rem",
                }}
              >
                <Image
                  src={DummyImgSlider}
                  height={170}
                  width={320}
                  alt="DummyImgSlider"
                />
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box
                sx={{
                  background: "#34343459",
                  height: "11rem",
                  textAlign: "center",
                  mx: "1rem",
                  borderRadius: "0.5rem",
                }}
              >
                <Image
                  src={DummyImgSlider}
                  height={170}
                  width={320}
                  alt="DummyImgSlider"
                />
              </Box>
            </SwiperSlide>
          </Swiper>

          <Box sx={{ width: "100%", pt: "1.313rem" }}>
            <TabContext value={type}>
              <Box>
                <TabList
                  TabIndicatorProps={{ style: { backgroundColor: "white" } }}
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  centered
                  sx={{
                    background: "#fff",
                    width: "80%",
                    mx: "auto",
                    borderRadius: "0.8rem",
                    p: "0.2rem",
                  }}
                >
                  <Tab
                    label={
                      <Typography fontSize="1rem" fontWeight="600" color="#000">
                        Stocks
                      </Typography>
                    }
                    value="1"
                    sx={{
                      width: "50%",
                      "&.Mui-selected": {
                        background: "#76FFC6",
                        borderRadius: "0.8rem",
                        p: "0rem 2rem",
                        color: "#000",
                      },
                    }}
                  />
                  <Tab
                    label={
                      <Typography fontSize="1rem" fontWeight="600" color="#000">
                        Mutual Fund
                      </Typography>
                    }
                    value="2"
                    sx={{
                      width: "50%",
                      "&.Mui-selected": {
                        background: "#76FFC6",
                        borderRadius: "0.8rem",
                        p: "0rem 1rem",
                        color: "#000",
                      },
                    }}
                  />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ pt: "2rem" }}>
                <FormControl
                  sx={{ width: "40%", pb: "1.5rem" }}
                  variant="standard"
                >
                  <Select
                    value={stocksType}
                    onChange={handleChangeStockType}
                    disableUnderline
                    sx={{
                      background: "#000",
                      color: "#fff",
                      "& .MuiSvgIcon-root": {
                        color: "white",
                        fontSize: "2rem",
                      },
                    }}
                  >
                    <MenuItem value="Gainers">
                      <Typography variant="h1">Top Gainers</Typography>
                    </MenuItem>
                    <MenuItem value="Loosers">
                      <Typography variant="h1">Top Loosers</Typography>
                    </MenuItem>
                  </Select>
                </FormControl>
                <Swiper
                  slidesPerView={3}
                  spaceBetween={10}
                  freeMode={true}
                  modules={[Pagination, FreeMode]}
                >
                  {indianEquityGainersLoosers.map((item: any, index: any) => (
                    <SwiperSlide>
                      <Box
                        sx={{
                          height: "10rem",
                          background: "#34343459",
                          borderRadius: "0.5rem",
                          p: "0.7rem",
                          cursor: "pointer",
                        }}
                        onClick={() => onRedirectToDetails(item.CompanyName, 1)}
                      >
                        <Stack spacing={2}>
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
                              <img
                                src={item.logoUrl}
                                height="100%"
                                width="100%"
                              />
                            ) : (
                              <Typography variant="h1" color="#1a1a1a">
                                {item.CompanyName && (
                                  <>
                                    {item.CompanyName.split(" ")[0].substring(
                                      0,
                                      1
                                    )}
                                    {item.CompanyName.split(" ").length > 1
                                      ? item.CompanyName.split(
                                          " "
                                        )[1].substring(0, 1)
                                      : ""}
                                  </>
                                )}
                              </Typography>
                            )}
                          </Avatar>
                          <Typography variant="h2" pt="0.5rem">
                            {add3Dots(item.CompanyName, 8)}
                          </Typography>
                          <Stack direction="column">
                            <Typography variant="subtitle1">
                              ₹ {item.LastPrice}
                            </Typography>
                            <Typography
                              fontSize="0.6rem"
                              color={item.Change < 0 ? "#EE4D37" : "#76FFC6"}
                            >
                              ({getTwoDecimalValues(item.Change)} %)
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <Typography variant="h1" py="1.563rem">
                  Indices
                </Typography>

                <Swiper
                  slidesPerView={2}
                  spaceBetween={10}
                  freeMode={true}
                  modules={[Pagination, FreeMode]}
                >
                  {indianIndices.map((item: any, index: any) => (
                    <SwiperSlide>
                      <Box
                        sx={{
                          background: "#34343459",
                          borderRadius: "0.5rem",
                          p: "0.7rem",
                        }}
                      >
                        <Stack spacing={2}>
                          <Typography variant="h1">
                            {add3Dots(item.symbol, 10)}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Typography variant="subtitle1">
                              ₹ {item.value}
                            </Typography>
                            <Typography
                              fontSize="0.6rem"
                              color={
                                item.ChangeChgPer < 0 ? "#EE4D37" : "#76FFC6"
                              }
                            >
                              {getTwoDecimalValues(item.dayChangePerc)}%
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <Typography variant="h1" py="1.563rem">
                  Top Sectors
                </Typography>

                <Grid container>
                  {indianSectors.map((item: any) => (
                    <Grid
                      item
                      sx={{
                        border: `1px solid ${item.color}`,
                        borderRadius: "2rem",
                        p: "0.2rem 1rem",
                        mr: "1rem",
                        my: "0.5rem",
                      }}
                    >
                      <Typography variant="subtitle1">
                        {item.sectorName}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              <TabPanel value="2">
                <Box>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h1" py="1rem">
                      Top Category
                    </Typography>

                    <Button
                      endIcon={
                        <ArrowRightAltIcon
                          sx={{ color: "#85FFCC", fontSize: "1.2rem" }}
                        />
                      }
                      variant="text"
                      sx={{ color: "#fff", fontSize: "0.9rem" }}
                      onClick={() => onSeeMoreClick(2)}
                    >
                      See More
                    </Button>
                  </Stack>

                  <Grid textAlign="center" container>
                    {fundCategory.map((item: any, index: any) => (
                      <Grid
                        onClick={() => onRedirectToCategoryList(item.type, 2)}
                        key={index}
                        item
                        xs={4}
                        sx={{
                          background: "#000",
                          p: "0.5rem",
                          cursor: "pointer",
                        }}
                      >
                        <Box
                          sx={{
                            background: "#34343459",
                            borderRadius: "0.5rem",
                            p: "0.5rem",
                          }}
                        >
                          <Image
                            src={item.icon}
                            height={35}
                            width={35}
                            alt="img"
                          />
                          <Typography variant="h2" pt="0.5rem">
                            {item.title}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h1" py="1rem">
                      Popular Funds
                    </Typography>

                    <Button
                      endIcon={
                        <ArrowRightAltIcon
                          sx={{ color: "#85FFCC", fontSize: "1.2rem" }}
                        />
                      }
                      variant="text"
                      sx={{ color: "#fff", fontSize: "0.9rem" }}
                      onClick={() => onSeeMoreClick(2)}
                    >
                      See More
                    </Button>
                  </Stack>
                  <Grid container>
                    <Grid item xs={2}></Grid>
                  </Grid>
                </Box>

                <Box>
                  <Grid container>
                    {popularFunds.map((item: any, index: any) => (
                      <Grid
                        key={index}
                        item
                        xs={4}
                        sx={{
                          background: "#000",
                          p: "0.5rem",
                          cursor: "pointer",
                        }}
                        onClick={() => onRedirectToMFDetails(item.search_id, 2)}
                      >
                        <Box
                          sx={{
                            background: "#34343459",
                            borderRadius: "0.5rem",
                            p: "0.5rem",
                          }}
                        >
                          <Avatar
                            sx={{
                              background: item.logo_url ? "#fff" : "#76FFC6",
                              height: "2rem",
                              width: "2rem",
                              color: "#1a1a1a",
                              fontSize: "1rem",
                            }}
                          >
                            {item.logo_url ? (
                              <img
                                src={item.logo_url}
                                height="100%"
                                width="100%"
                              />
                            ) : (
                              <Typography variant="h1" color="#1a1a1a">
                                {item.scheme_name && (
                                  <>
                                    {item.scheme_name
                                      .split(" ")[0]
                                      .substring(0, 1)}
                                    {item.scheme_name.split(" ").length > 1
                                      ? item.scheme_name
                                          .split(" ")[1]
                                          .substring(0, 1)
                                      : ""}
                                  </>
                                )}
                              </Typography>
                            )}
                          </Avatar>

                          <Typography fontSize="0.7rem" pt="0.5rem">
                            {add3Dots(item.scheme_name, 18)}
                          </Typography>

                          <Typography fontSize="0.7rem" pt="0.5rem">
                            {item.returns_1Y}%{" "}
                            <span style={{ color: "#ccc" }}>(1Y)</span>
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      )}
    </PostloginLayout>
  );
}
