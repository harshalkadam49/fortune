import { Box, Button, Stack, Typography } from "@mui/material";
// images
import EasyReturns from "../../public/prelogin/easyReturns.svg";
import Simplifiedverification from "../../public/prelogin/simplifiedverification.svg";
import ErrorlessTrading from "../../public/prelogin/errorlessTrading.svg";
import MaxROI from "../../public/prelogin/maxROI.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import { useState } from "react";
import Image from "next/image";
import PopFromBottomFirst from "@/components/animations/popFromBottomFirst";
import Tap from "@/components/animations/tap";
import { useRouter } from "next/router";
import PreloginLayout from "@/components/layouts/prelogin";

export default function Carrousel() {
  const router = useRouter();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [carrouselArray, setCarrouselArray] = useState<any>([
    {
      id: 0,
      title: "Easy Returns",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      icon: EasyReturns,
    },
    {
      id: 1,
      title: "Simplified Verification",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      icon: Simplifiedverification,
    },
    {
      id: 2,
      title: "Errorless Trading",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      icon: ErrorlessTrading,
    },
    {
      id: 3,
      title: "Max ROI",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      icon: MaxROI,
    },
  ]);
  const onLogin = () => {
    router.push("/prelogin/login");
  };

  const onSignUp = () => {
    router.push("/prelogin/signup");
  };
  return (
    <PreloginLayout>
      <Box p="1rem">
        <Box sx={{ float: "right" }}>
          <Tap>
            <Button
              variant="text"
              sx={{
                textTransform: "capitalize",
                color: "white",
              }}
            >
              Skip
            </Button>
          </Tap>
        </Box>

        <Box pt="6.625rem">
          <Swiper
            onSlideChange={(curr) => setActiveSlideIndex(curr.activeIndex)}
            pagination={true}
            modules={[Pagination]}
            className="introCarrousel"
          >
            {carrouselArray.map((item: any) => (
              <SwiperSlide>
                <Box textAlign="center">
                  <Image
                    height={150}
                    width={200}
                    alt={item.title}
                    src={item.icon}
                  />
                  <Box px="2.75rem">
                    <motion.div
                      initial={{ y: 100, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                      }}
                    >
                      <Typography variant="h1" pt="4.563rem">
                        {item.title}
                      </Typography>
                    </motion.div>

                    <motion.div
                      initial={{ y: 100, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3,
                      }}
                    >
                      <Typography variant="subtitle1" pb="6rem" pt="1.688rem">
                        {item.desc}
                      </Typography>
                    </motion.div>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>

          {activeSlideIndex == 3 && (
            <Stack
              direction="row"
              justifyContent="center"
              pt="5.375rem"
              pb="3rem"
              spacing={4}
            >
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.3,
                }}
              >
                <Tap>
                  <Button
                    onClick={onLogin}
                    variant="contained"
                    sx={{
                      borderRadius: "5rem",
                    }}
                  >
                    Login
                  </Button>
                </Tap>
              </motion.div>

              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.2,
                }}
              >
                <Tap>
                  <Button
                    onClick={onSignUp}
                    variant="contained"
                    sx={{
                      borderRadius: "5rem",
                    }}
                  >
                    Sign Up
                  </Button>
                </Tap>
              </motion.div>
            </Stack>
          )}
        </Box>
      </Box>
    </PreloginLayout>
  );
}
