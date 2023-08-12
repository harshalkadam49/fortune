import PostloginLayout from "@/components/layouts/postLogin";
import {
  Avatar,
  Box,
  FormControl,
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
import Image from "next/image";
import { useEffect, useState } from "react";
import { getEquityMasterapi } from "@/apifunctions/getEquityMaster";
import { add3Dots } from "@/utilities/commonfunctions";
import { getEquityLoosersapi } from "@/apifunctions/getEquityLoosers";

export default function Home() {
  const [type, setType] = useState("1");
  const [stocksType, setStocksType] = useState("Gainers");
  const [indianEquityDetails, setIndianEquityDetails] = useState([]);
  const [indianEquityGainers, setIndianEquityGainers] = useState([]);

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

  useEffect(() => {
    onGetEquityGainers();
  }, []);

  return (
    <PostloginLayout>
      <Box>
        <Swiper pagination={true} modules={[Pagination]} className="adsBanner">
          <SwiperSlide>
            <Box textAlign="center">
              <Image
                src={DummyImgSlider}
                height={170}
                width={320}
                alt="DummyImgSlider"
              />
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box textAlign="center">
              <Image
                src={DummyImgSlider}
                height={170}
                width={320}
                alt="DummyImgSlider"
              />
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box textAlign="center">
              <Image
                src={DummyImgSlider}
                height={170}
                width={320}
                alt="DummyImgSlider"
              />
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box textAlign="center">
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
                onChange={handleChange}
                aria-label="lab API tabs example"
                centered
                sx={{
                  background: "#fff",
                  width: "70%",
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
                    >
                      <Stack spacing={2}>
                        <Avatar></Avatar>
                        <Typography variant="h2" pt="1rem">
                          {add3Dots(item.CompanyName, 10)}
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Typography variant="subtitle1">
                            ₹ {item.LastPrice}
                          </Typography>
                          <Typography
                            variant="h3"
                            color={item.Change < 0 ? "#EE4D37" : "#76FFC6"}
                          >
                            ({item.Change})
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </TabPanel>

            <TabPanel value="2" sx={{ pt: "2rem" }}>
              <Typography variant="h2">Item Two</Typography>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </PostloginLayout>
  );
}
