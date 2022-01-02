import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar, BoxProps, Image, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { usePlayerDevice } from "react-spotify-web-playback-sdk";
import { spotifyItem } from "../../server/types/SpotifyTypes";
import { getAlbum, play } from "../API/API";
import { QueContext } from "../hooks/usePlayQue";
import { getTrackUrisFromAlbum } from "../utils/dateUtils";
import { IconButton } from "./IconButton";

const Item: React.FC<spotifyItem> = ({ images, name, id, type }) => {
  const device = usePlayerDevice();
  const accessToken = localStorage.getItem("accessToken") || "";

  const queContext = useContext(QueContext);

  const MotionBox = motion<BoxProps>(Box);

  const handlePlayAlbum = async () => {
    const detailedAlbum = await getAlbum(id);
    queContext.setQue(getTrackUrisFromAlbum(detailedAlbum.tracks.items));
    if (device) {
      play(
        accessToken,
        device?.device_id,
        getTrackUrisFromAlbum(detailedAlbum.tracks.items)
      );
    }
  };

  return (
    <Flex
      direction="column"
      backgroundColor={useColorModeValue("brand.800", "brandDark.900")}
      alignItems="center"
      width="150px"
      height="180px"
      boxShadow={useColorModeValue("neored", "dark-lg")}
    >
      {type === "album" ? (
        <>
          {images[0] && (
            <Box
              role="group"
              boxSize="150px"
              position="relative"
              height="150px"
              width="150px"
            >
              <Box
                _groupHover={{ visibility: "visible" }}
                visibility="hidden"
                top="0"
                right="0"
                width="100%"
                height="100%"
                position="absolute"
                backgroundColor="blackAlpha.600"
                textAlign="center"
              >
                <Flex
                  direction="row"
                  alignContent="center"
                  alignSelf="center"
                  width="100%"
                  height="100%"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <IconButton
                    variant={"albumplay"}
                    onClick={() => handlePlayAlbum()}
                  />
                  <Link to={`/app/album/${id}`} key={id}>
                    <IconButton variant={"details"} />
                  </Link>
                </Flex>
              </Box>
              <Image
                src={images ? images[0].url : "https://via.placeholder.com/150"}
                cursor="pointer"
                boxSize="150px"
                loading={"lazy"}
                alt={`${name} cover-image`}
              />
            </Box>
          )}
        </>
      ) : (
        <>
          <Link to={`/app/${type}/${id}`} key={id}>
            {images[0] && (
              <MotionBox whileHover={{ scale: 1.1 }}>
                <Avatar
                  src={
                    images ? images[0].url : "https://via.placeholder.com/150"
                  }
                  boxSize="150px"
                  boxShadow="dark-lg"
                  loading={"lazy"}
                  alt={`${name} avatar-image`}
                />
              </MotionBox>
            )}
          </Link>
        </>
      )}
      <Box width={"150px"}>
        <Text isTruncated paddingX={2}>
          {name}
        </Text>
      </Box>
    </Flex>
  );
};

export default Item;
