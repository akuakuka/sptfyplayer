import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button, Container, Image } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { usePlayerDevice } from "react-spotify-web-playback-sdk";
import {
  spotifyArtist,
  spotifyAlbum,
} from "../../../server/types/SpotifyTypes";
import { getAlbum, play } from "../API";
import { QueContext } from "../hooks/usePlayQue";

/* interface ArtistPageProps {
    id:string
} */

//TODO: albu.tracks tyypit rikki. Response tyyppi vs albumtyyppi?

const AlbumPage: React.FC = () => {
  //const device = usePlayerDevice();
  const [album, setAlbum] = useState<spotifyAlbum>(Object);
  const user = localStorage.getItem("user");
  const device = usePlayerDevice();
  //@ts-ignore
  let { id } = useParams();

  // const [que, setQue] = useContext(QueContext);

  useEffect(() => {
    (async () => {
      const resp = await getAlbum(id);
      setAlbum(resp);
    })();
  }, []);

  useEffect(() => {
    console.log(album);
  }, [album]);

  const handlePlaySong = async (uri: string) => {
    console.log(uri);
    play(user.accessToken, device?.device_id, [uri]);
  };
  return (
    <Container height="calc( 100vh - 100px )" width="1600px">
      <Flex direction="column" gridGap="10px" wrap="wrap" paddingTop="100px">
        <Heading> {album.name} </Heading>
        <Flex direction="row">
          <Flex direction="column" gridGap="10px" wrap="wrap">
            {album.tracks && (
              <>
                {album.tracks.items.map((t) => (
                  <Box key={t.id}>
                    {t.name}{" "}
                    <Button onClick={() => handlePlaySong(t.uri)}>play</Button>{" "}
                  </Box>
                ))}
              </>
            )}
          </Flex>
          <Box width="40vw">
            {album.images && <Image src={album.images[0].url} />}
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
};

export default AlbumPage;
