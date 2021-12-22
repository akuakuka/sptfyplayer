import { Box, BoxProps, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { BiAlbum } from "react-icons/bi";
import { BsQuestionSquareFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaPause, FaPlay } from "react-icons/fa";
import { ImNext2, ImPrevious2 } from "react-icons/im";


interface IconButtonProps {
  variant: string;
  onClick?: () => void;
}
const MotionBox = motion<BoxProps>(Box);
// TODO: Rename because chakra has IconButton component
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
    if (variant == "pause") {
      return (
        <MotionBox whileHover={{ scale: 1.4 }} height="auto" width="auto">
          <Icon as={FaPause} w={6} h={6} onClick={onClick} cursor="pointer" />
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
    if (variant == "homepage") {
      return (
        <MotionBox whileHover={{ scale: 1.4 }} height="auto" width="auto" paddingTop="30px" paddingLeft="15px" onClick={onClick}>
          <Icon as={BiAlbum} w={20} h={20} cursor="pointer" fill="brandDark.200" />
        </MotionBox>
      );
    }
    return (
      <MotionBox whileHover={{ scale: 1.4, }} height="auto" width="auto">
        <Icon as={BsQuestionSquareFill} w={6} h={6} cursor="pointer" />
      </MotionBox>
    );
  };
  return get(variant);
};
