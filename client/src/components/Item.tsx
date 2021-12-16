import { HamburgerIcon, PhoneIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Text, Box, Flex } from "@chakra-ui/layout";
import { Image, Button, Container, Avatar, IconButton } from "@chakra-ui/react";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import {
  usePlayerDevice,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";
import {
  spotifyArtist,
  spotifyAlbum,
  spotifyTrack,
  spotifyItem,
} from "../../../server/types/SpotifyTypes";
import { getAlbum, play } from "../API";
import { QueContext } from "../hooks/usePlayQue";

const getTrackUrisFromAlbum = (tracks: spotifyTrack[]) => {
  return tracks.map((t) => t.uri);
};

const Item: React.FC<spotifyItem> = ({ images, name, id, type }) => {
  const device = usePlayerDevice();
  const user = localStorage.getItem("user");
  const [que, setQue] = useContext(QueContext);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const navigate = useNavigate();

  const handlePlayAlbum = async () => {
    const detailedAlbum = await getAlbum(id);
    //todo: types
    setQue(getTrackUrisFromAlbum(detailedAlbum.tracks.items));
    play(
      user,
      device?.device_id,
      getTrackUrisFromAlbum(detailedAlbum.tracks.items)
    );
  };
  // TODO: Better hover icons
  return (
    <Flex
      direction="column"
      backgroundColor="gray.900"
      alignItems="center"
      borderRadius="30"
      width="180px"
      height="200px"
      p="3"
      boxShadow="dark-lg"
    >
      {/*       			<div class="overlayer">
				<i class="far fa-play-circle"></i>
			</div> 
      
      
      .card:hover .overlayer {
	visibility: visible;
}


*/}
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
                    aria-label="playalbum"
                    icon={<TriangleUpIcon />}
                    onClick={() => handlePlayAlbum()}
                  />
                  <Link to={`/app/album/${id}`} key={id}>
                    <IconButton
                      aria-label="albumdetails"
                      icon={<HamburgerIcon />}
                    />
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
              <Avatar
                src={images ? images[0].url : "https://via.placeholder.com/150"}
                boxSize="150px"
                boxShadow="dark-lg"
              />
            )}
          </Link>
        </>
      )}
      <Text>{name}</Text>
    </Flex>
  );
};

export default Item;
