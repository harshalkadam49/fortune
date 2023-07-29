import { motion } from "framer-motion";
import React, { FC } from "react";
import { Props } from "next/script";

const PopFromBottomFirst = ({ children }: any) => {
  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          delay: 0.9,
          type: "spring",
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PopFromBottomFirst;
