import PostloginLayout from "@/components/layouts/postLogin";
import {
  Avatar,
  Box,
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

// images
import DummyImgSlider from "../../public/dummyImg.svg";
import ComingSoon from "../../public/postLogin/comingSoon.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getEquityMasterapi } from "@/apifunctions/getEquityMaster";
import { add3Dots } from "@/utilities/commonfunctions";
import { getEquityLoosersapi } from "@/apifunctions/getEquityLoosers";
import { getIndianIndicesMasterapi } from "@/apifunctions/getIndianIndicesMaster";
import { color } from "framer-motion";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [type, setType] = useState("1");
  const [stocksType, setStocksType] = useState("Gainers");
  const [indianEquityDetails, setIndianEquityDetails] = useState([]);
  const [indianEquityGainers, setIndianEquityGainers] = useState([]);
  const [indianIndices, setIndianIndices] = useState([]);
  const [indianSectors, setIndianSectors] = useState([]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setType(newValue);
  };

  const handleChangeStockType = (event: SelectChangeEvent) => {
    setStocksType(event.target.value as string);
    if (event.target.value == "Gainers") {
      onGetEquityGainers();
    } else {
      onGetEquityLoosers();
    }
  };

  const onGetEquityGainers = () => {
    getEquityMasterapi("/api/auth/equityGainers", "GET").then((res) => {
      if (!res.errorState) {
        setIndianEquityGainers(res);
      }
    });
  };

  const onGetEquityLoosers = () => {
    getEquityLoosersapi("/api/auth/equityLoosers", "GET").then((res) => {
      if (!res.errorState) {
        setIndianEquityGainers(res);
      }
    });
  };

  const onGetIndianIndicesMaster = () => {
    getIndianIndicesMasterapi("/api/auth/equityIndicesMaster", "GET").then(
      (res) => {
        if (!res.errorState) {
          setIndianIndices(res);
        }
      }
    );
  };

  const onGetIndianSectorsMaster = () => {
    getIndianIndicesMasterapi("/api/auth/equitySectorsMaster", "GET").then(
      (res) => {
        if (!res.errorState) {
          setIndianSectors(res);
        }
      }
    );
  };

  const onRedirectToDetails = (CompanyName: any) => {
    router.push({
      pathname: "/postLogin/stocks/stockDetails",
      query: { CompanyName: CompanyName },
    });
  };

  useEffect(() => {
    onGetEquityGainers();
    onGetIndianIndicesMaster();
    onGetIndianSectorsMaster();
  }, []);

  return (
    <PostloginLayout>
      <Box>
        <Swiper pagination={true} modules={[Pagination]} className="adsBanner">
          <SwiperSlide>
            <Box
              sx={{
                background: "#343434",
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
                background: "#343434",
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
                background: "#343434",
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
                background: "#343434",
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
                {indianEquityGainers.map((item: any, index: any) => (
                  <SwiperSlide>
                    <Box
                      sx={{
                        height: "10rem",
                        background: "#343434",
                        borderRadius: "0.5rem",
                        p: "0.7rem",
                      }}
                      onClick={() => onRedirectToDetails(item.CompanyName)}
                    >
                      <Stack spacing={2}>
                        <Avatar sx={{ background: "#F3FFBD" }}>
                          <Typography variant="h1" color="#1a1a1a">
                            {item.CompanyName.split(" ")[0].substring(0, 1)}
                            {item.CompanyName.split(" ").length > 1
                              ? item.CompanyName.split(" ")[1].substring(0, 1)
                              : ""}
                          </Typography>
                        </Avatar>
                        <Typography variant="h2" pt="1rem">
                          {add3Dots(item.CompanyName, 10)}
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Typography variant="subtitle1">
                            ₹ {item.LastPrice}
                          </Typography>
                          <Typography
                            fontSize="0.6rem"
                            color={item.Change < 0 ? "#EE4D37" : "#76FFC6"}
                          >
                            ({item.Change} %)
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
                        background: "#343434",
                        borderRadius: "0.5rem",
                        p: "0.7rem",
                      }}
                    >
                      <Stack spacing={2}>
                        <Typography variant="h1">
                          {add3Dots(item.Index, 10)}
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Typography variant="subtitle1">
                            ₹ {item.CurrentValue}
                          </Typography>
                          <Typography
                            fontSize="0.6rem"
                            color={
                              item.ChangeChgPer < 0 ? "#EE4D37" : "#76FFC6"
                            }
                          >
                            ({item.ChangeChgPer} %)
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
                    <Typography variant="subtitle1">{item.Sectors}</Typography>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value="2" sx={{ pt: "2rem" }}>
              <Box textAlign="center" pt="10%">
                <Image
                  src={ComingSoon}
                  alt="comingSoon"
                  height={150}
                  width={300}
                />

                <Typography variant="h1" pt={3}>
                  Coming <span style={{ color: "#76FFC6" }}> Soon </span>...!!!
                </Typography>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </PostloginLayout>
  );
}
