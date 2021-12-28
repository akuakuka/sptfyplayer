import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Container, Image } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlayerDevice } from "react-spotify-web-playback-sdk";
import { spotifyAlbum } from "../../server/types/SpotifyTypes";
import { getAlbum, play } from "../API";
import { useAPI } from "../hooks/useApi";
import { getAlbumReleaseYearFromDate } from "../utils/dateUtils";
import { MotionBox } from "./MotionBox";
import { SpinnerPage } from "./SpinnerPage";

const AlbumPage: React.FC = () => {
  const params = useParams();
  const id = params.id || ""
  const { execute, loading, data: album, error } = useAPI<spotifyAlbum>(() => getAlbum(id), false);


  const accessToken = localStorage.getItem("accessToken");
  const device = usePlayerDevice();

  useEffect(() => {

    if (id.length) {
      execute()

    }
  }, []);

  const handlePlaySong = async (uri: string) => {
    if (device && accessToken) {
      play(accessToken, device?.device_id, [uri]);
    }
  };

  return (
    <>
      {loading ? (
        <SpinnerPage />
      ) : (
        <>
          {album &&
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
                  <Box width="40vw" marginLeft="auto" paddingRight="3">
                    {album.images && <Image maxHeight="500px" src={album.images[0].url} />}
                  </Box>
                </Flex>
              </Flex>
            </Container>
          }  </>
      )}
    </>

  );
};

export default AlbumPage;
