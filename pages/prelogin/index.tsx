import Image from "next/image";
import BrandLogo from "../../public/prelogin/logo.svg";
import { Box, Typography } from "@mui/material";
import PreloginLayout from "@/components/layouts/prelogin";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Spalsh() {
  const router = useRouter();
  const handleAnimationEnd = () => {
    router.replace("/prelogin/carrousel");
  };

  return (
    <PreloginLayout>
      <Box textAlign="center">
        <Box pt="40%">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 1,
              type: "spring",
            }}
            onAnimationComplete={handleAnimationEnd}
          >
            <Image src={BrandLogo} height={120} width={120} alt="brandlogo" />

            <Typography fontSize="1.813rem" fontWeight="bold">
              Fortune
            </Typography>
          </motion.div>

          
          <Typography fontSize="0.813rem" fontWeight="500" pt="7.813rem">
            Stocks and Mutual fund company
          </Typography>
        </Box>
      </Box>
    </PreloginLayout>
  );
}
