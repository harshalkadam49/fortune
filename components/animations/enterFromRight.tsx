import { motion } from "framer-motion";
import React, { FC } from "react";
import { Props } from "next/script";

const EnterFromRight = ({ children }: any) => {
  return (
    <>
      <motion.div
        initial={{ x: 600, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          type: "none",
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default EnterFromRight;
