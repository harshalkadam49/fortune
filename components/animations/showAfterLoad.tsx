import { motion } from "framer-motion";
import React, { FC } from "react";

const ShowAfterLoad = ({ children }: any) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.9,
          delay: 1.2,
          type: "spring",
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default ShowAfterLoad;
