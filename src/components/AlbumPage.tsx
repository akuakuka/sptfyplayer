import { Box, Flex } from "@chakra-ui/layout";
import { Container, Image } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlayerDevice } from "react-spotify-web-playback-sdk";
import { spotifyAlbum } from "../../server/types/SpotifyTypes";
import { getAlbum, play } from "../API/API";
import { useAPI } from "../hooks/useApi";
import { QueContext } from "../hooks/usePlayQue";
import { UIContext } from "../hooks/useUI";
import { getAlbumReleaseYearFromDate, getTrackUrisFromAlbum } from "../utils/dateUtils";
import { MotionBox } from "./MotionBox";
import { SpinnerPage } from "./SpinnerPage";

const AlbumPage: React.FC = () => {
  const params = useParams();
  const id = params.id || ""
  const { execute, loading, data: album, error } = useAPI<spotifyAlbum>(() => getAlbum(id), false);
  const UICOntext = useContext(UIContext);
  const queContext = useContext(QueContext);
  const accessToken = localStorage.getItem("accessToken");
  const device = usePlayerDevice();

  useEffect(() => {

    if (id.length) {
      execute()

    }
  }, []);

  const handlePlaySong = async (uri: string, i: number) => {
    console.log(uri)
    // Sliced album tracks so if album is played from middle there will be next song
    if (album) {
      console.log("handleplaysong album on ")
      const sliced = album?.tracks.items.slice(i)
      const slicedUrils = getTrackUrisFromAlbum(sliced);
      queContext.setQue(slicedUrils);


      if (device && accessToken) {
        play(accessToken, device?.device_id, slicedUrils);
      }
    }
  };

  useEffect(() => {
    if (album) {
      UICOntext.setHeading(`${album.artists[0].name} - ${album.name} (${getAlbumReleaseYearFromDate(album.release_date, album.release_date_precision)})`)
    }

  }, [album]);


  // TODO: If many songs last ones are hidden
  return (
    <>
      {loading ? (
        <SpinnerPage />
      ) : (
        <>
          {album &&
            <Container height="calc( 100vh - 100px )" width="1600px">
              <Flex direction="column" gridGap="10px" wrap="wrap" paddingTop="10px">

                <Flex direction="row">
                  <Flex direction="column" gridGap="6" wrap="wrap">
                    {album.tracks && (
                      <>
                        {album.tracks.items.map((t, i) => (
                          <MotionBox whileHover={{ scale: 1.1, color: "#870000" }} key={t.id} cursor="pointer" onClick={() => handlePlaySong(t.uri, i)}>
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

