import { Box, BoxProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

export const AnimatedRoute: React.FC = ({ children }) => {
  /*   const pageMotion = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 100, transition: { duration: 2 } },
    exit: { opacity: 0, x: 0, transition: { duration: 2 } },
  }; */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};
export const MotionBox = motion<BoxProps>(Box);
