import { motion } from "framer-motion";
import React from "react";
import { Props } from "next/script";

const EnterFromLeft = ({ children, props }: any) => {
  return (
    <>
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          type: "spring",
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default EnterFromLeft;
