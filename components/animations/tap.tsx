import { motion } from "framer-motion";
import React from "react";

const Tap = ({ children }: any) => {
  return (
    <>
      <motion.div
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default Tap;
