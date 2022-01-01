import { MoonIcon, Search2Icon, SunIcon } from "@chakra-ui/icons";
import { Box, BoxProps, Icon, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { BiAlbum } from "react-icons/bi";
import { BsFillGrid3X3GapFill, BsQuestionSquareFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaGithub, FaListUl, FaPause, FaPlay } from "react-icons/fa";
import { ImNext2, ImPrevious2 } from "react-icons/im";


interface IconButtonProps {
  variant: string;
  onClick?: () => void;
}
const MotionBox = motion<BoxProps>(Box);
// TODO: Rename because chakra has IconButton component
// TODO: Get rid of ifs
export const IconButton: React.FC<IconButtonProps> = ({ variant, onClick }) => {
  const fillColor = useColorModeValue("brand.100", "brand.100");
  //TODO: Play icon animation bug. Key?
  const get = (variant: string): React.ReactElement => {
    if (variant == "prev") {
      return (
        <MotionBox whileHover={{ scale: 1.4, color: "#870000" }} height="auto" width="auto">
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



    if (variant == "albumplay") {
      return (
        <MotionBox whileHover={{ scale: 1.4 }} height="auto" width="auto">
          <Icon as={FaPlay} w={6} h={6} onClick={onClick} cursor="pointer" fill={fillColor} />
        </MotionBox>
      );
    }
    if (variant == "play") {
      return (
        <MotionBox whileHover={{ scale: 1.4, color: "#870000" }} height="auto" width="auto">
          <Icon as={FaPlay} w={6} h={6} onClick={onClick} cursor="pointer" />
        </MotionBox>
      );
    }
    if (variant == "pause") {
      return (
        <MotionBox whileHover={{ scale: 1.4, color: "#870000" }} height="auto" width="auto">
          <Icon as={FaPause} w={6} h={6} onClick={onClick} cursor="pointer" />
        </MotionBox>
      );
    }
    if (variant == "next") {
      return (
        <MotionBox whileHover={{ scale: 1.4, color: "#870000" }} height="auto" width="auto">
          <Icon as={ImNext2} w={6} h={6} onClick={onClick} cursor="pointer" />
        </MotionBox>
      );
    }
    if (variant == "details") {
      return (
        <MotionBox whileHover={{ scale: 1.4 }} height="auto" width="auto">
          <Icon as={BsThreeDotsVertical} w={6} h={6} cursor="pointer" fill={fillColor} />
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

    if (variant == "list") {
      return (
        <MotionBox whileHover={{ scale: 0.9 }} height="auto" width="auto" onClick={onClick}>
          <Icon as={FaListUl} w={8} h={8} cursor="pointer" fill="brandDark.200" />
        </MotionBox>
      );
    }

    if (variant == "listimages") {
      return (
        <MotionBox whileHover={{ scale: 0.9 }} height="auto" width="auto" onClick={onClick}>
          <Icon as={BsFillGrid3X3GapFill} w={8} h={8} cursor="pointer" fill="brandDark.200" />
        </MotionBox>
      );
    }

    if (variant == "search") {
      return (
        <MotionBox whileHover={{ scale: 0.9 }} height="auto" width="auto" onClick={onClick}>
          <Search2Icon w={8} h={8} cursor="pointer" fill="brandDark.200" />
        </MotionBox>
      );
    }
    if (variant == "github") {
      return (
        <MotionBox whileHover={{ scale: 1.5 }} height="auto" width="auto" onClick={onClick}>
          <Icon w={5} h={5} cursor="pointer" fill="white" as={FaGithub} />
        </MotionBox>
      );
    }
    if (variant == "sun") {
      return (
        <MotionBox whileHover={{ scale: 1.5 }} height="auto" width="auto" onClick={onClick}>
          <SunIcon />
        </MotionBox>
      );
    }
    if (variant == "moon") {
      return (
        <MotionBox whileHover={{ scale: 1.5 }} height="auto" width="auto" onClick={onClick}>
          <MoonIcon />
        </MotionBox>
      );
    }


    return (
      <MotionBox whileHover={{ scale: 0.5, }} height="auto" width="auto">
        <Icon as={BsQuestionSquareFill} w={6} h={6} cursor="pointer" />
      </MotionBox>
    );
  };
  return get(variant);
};
