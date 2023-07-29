import { motion } from "framer-motion";
import React, { FC } from "react";
import { Props } from "next/script";



const PopFromBottomSecond = ({ children }: any) => {
    return(
        <>
              <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 1,
                type:"spring"
              }}
            >  
            {children}           
        </motion.div>
        </>
    );
}

export default PopFromBottomSecond;