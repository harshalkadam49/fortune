import PostloginLayout from "@/components/layouts/postLogin";
import { Box, Tab, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// images
import DummyImgSlider from "../../public/dummyImg.svg";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [type, setType] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setType(newValue);
  };

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
              <Typography variant="h2">Item One</Typography>
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
