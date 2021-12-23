import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar, BoxProps, Image, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { usePlayerDevice } from "react-spotify-web-playback-sdk";
import { spotifyItem, spotifyTrack } from "../../../server/types/SpotifyTypes";
import { getAlbum, play } from "../API";
import { QueContext } from "../hooks/usePlayQue";
import { IconButton } from "./IconButton";

const getTrackUrisFromAlbum = (tracks: spotifyTrack[]) => {
  return tracks.map((t) => t.uri);
};

const Item: React.FC<spotifyItem> = ({ images, name, id, type }) => {
  const device = usePlayerDevice();
  const user = localStorage.getItem("user") || "";

  const [que, setQue] = useContext(QueContext);

  const MotionBox = motion<BoxProps>(Box);
  // TODO: typescript types
  const handlePlayAlbum = async () => {
    const detailedAlbum = await getAlbum(id);
    setQue(getTrackUrisFromAlbum(detailedAlbum.tracks.items));
    if (device) {
      play(
        user,
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
      borderRadius="30"
      width="180px"
      height="200px"
      p="3"
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
                />
              </MotionBox>
            )}
          </Link>
        </>
      )}
      <Text>{name}</Text>
    </Flex>
  );
};

export default Item;
