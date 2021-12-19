import { Icon, BoxProps, Box } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { ImPrevious2, ImNext2 } from "react-icons/im";
import { BsThreeDotsVertical, BsQuestionSquareFill } from "react-icons/bs";
import { motion } from "framer-motion";
import React from "react";

interface IconButtonProps {
  variant: string;
  onClick?: () => void;
}
const MotionBox = motion<BoxProps>(Box);

export const IconButton: React.FC<IconButtonProps> = ({ variant, onClick }) => {
  //TODO: Play icon animation bug. Key?
  const get = (variant: string): React.ReactElement => {
    if (variant == "prev") {
      return (
        <MotionBox whileHover={{ scale: 1.4 }} height="auto" width="auto">
          <Icon
            as={ImPrevious2}
            w={6}
            h={6}
            onClick={onClick}
            cursor="pointer"
          />
        </MotionBox>
      );
    }
    if (variant == "play") {
      return (
        <MotionBox whileHover={{ scale: 1.4 }} height="auto" width="auto">
          <Icon as={FaPlay} w={6} h={6} onClick={onClick} cursor="pointer" />
        </MotionBox>
      );
    }
    if (variant == "next") {
      return (
        <MotionBox whileHover={{ scale: 1.4 }} height="auto" width="auto">
          <Icon as={ImNext2} w={6} h={6} onClick={onClick} cursor="pointer" />
        </MotionBox>
      );
    }
    if (variant == "details") {
      return (
        <MotionBox whileHover={{ scale: 1.4 }} height="auto" width="auto">
          <Icon as={BsThreeDotsVertical} w={6} h={6} cursor="pointer" />
        </MotionBox>
      );
    }
    return (
      <MotionBox whileHover={{ scale: 1.4 }} height="auto" width="auto">
        <Icon as={BsQuestionSquareFill} w={6} h={6} cursor="pointer" />
      </MotionBox>
    );
  };
  return get(variant);
};
