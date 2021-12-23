import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Container, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlayerDevice } from "react-spotify-web-playback-sdk";
import { spotifyAlbum } from "../../../server/types/SpotifyTypes";
import { getAlbum, play } from "../API";
import { getAlbumReleaseYearFromDate } from "../utils/dateUtils";
import { MotionBox } from "./MotionBox";
import { SpinnerPage } from "./SpinnerPage";

const AlbumPage: React.FC = () => {
  const [album, setAlbum] = useState<spotifyAlbum>(Object);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const device = usePlayerDevice();

  useEffect(() => {
    (async () => {
      if (id) {
        setIsLoading(true)
        const resp = await getAlbum(id);
        console.log(resp)
        setAlbum(resp);
        setIsLoading(false)
      }
    })();
  }, []);

  useEffect(() => {
    console.log(album);
  }, [album]);

  const handlePlaySong = async (uri: string) => {
    if (device && accessToken) {
      play(accessToken, device?.device_id, [uri]);
    }
  };

  return (
    <>
      {isLoading ? (
        <SpinnerPage />
      ) : (
        <Container height="calc( 100vh - 100px )" width="1600px">
          <Flex direction="column" gridGap="10px" wrap="wrap" paddingTop="100px">
            <Heading> {album.name} ({getAlbumReleaseYearFromDate(album.release_date, album.release_date_precision)}) </Heading>
            <Flex direction="row">
              <Flex direction="column" gridGap="6" wrap="wrap">
                {album.tracks && (
                  <>
                    {album.tracks.items.map(
                      (t: {
                        id: React.Key | null | undefined;
                        name: any;
                        uri: string;
                      }) => (
                        <MotionBox whileHover={{ scale: 1.1, color: "#870000" }} key={t.id} cursor="pointer" onClick={() => handlePlaySong(t.uri)}>
                          {t.name}
                        </MotionBox>
                      )
                    )}
                  </>
                )}
              </Flex>
              <Box width="40vw">
                {album.images && <Image maxHeight="500px" src={album.images[0].url} />}
              </Box>
            </Flex>
          </Flex>
        </Container>)}
    </>

  );
};

export default AlbumPage;
