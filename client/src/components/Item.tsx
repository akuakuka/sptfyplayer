import { Text, Flex } from "@chakra-ui/layout";
import { Image, Button, Container, Avatar } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
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

  return (
    <Link to={`app/${type}/${id}`} key={id}>
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
        {type === "album" ? (
          <>
            {" "}
            {images[0] && (
              <Image
                src={images ? images[0].url : "https://via.placeholder.com/150"}
                boxSize="150px"
                onClick={() => handlePlayAlbum()}
                cursor="pointer"
              />
            )}
          </>
        ) : (
          <>
            {" "}
            {images[0] && (
              <Avatar
                src={images ? images[0].url : "https://via.placeholder.com/150"}
                boxSize="150px"
                boxShadow="dark-lg"
              />
            )}
          </>
        )}
        <Text>{name}</Text>
      </Flex>
    </Link>
  );
};

export default Item;
