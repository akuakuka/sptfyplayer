import { Box, Flex, Spacer } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";
import { spotifyAlbum } from "@typings/SpotifyTypes";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlayerDevice } from "react-spotify-web-playback-sdk";
import { getAlbum, play } from "../../API/API";
import { useAPI } from "../../hooks/useApi";
import { QueContext } from "../../hooks/usePlayQue";
import { UIContext } from "../../hooks/useUI";
import {
  getAlbumDuration,
  getAlbumReleaseYearFromDate,
  getMinutesAndSecondsFromMs,
  getTrackUrisFromAlbum,
} from "../../utils/dateUtils";
import { AnimatedRoute } from "../AnimateRoute";
import { ItemWrapper } from "../ItemWrapper";
import { MotionBox } from "../MotionBox";
import { SpinnerPage } from "./SpinnerPage";

const AlbumPage: React.FC = () => {
  const params = useParams();
  const id = params.id || "";
  const {
    execute,
    loading,
    data: album,
    error,
  } = useAPI<spotifyAlbum>(() => getAlbum(id), false);
  const UICOntext = useContext(UIContext);
  const queContext = useContext(QueContext);
  const accessToken = localStorage.getItem("accessToken");
  const device = usePlayerDevice();

  useEffect(() => {
    if (id.length) {
      execute();
    }
  }, []);

  const handlePlaySong = async (uri: string, i: number) => {
    // Sliced album tracks so if album is played from middle there will be next song
    if (album) {
      const sliced = album?.tracks.items.slice(i);
      const slicedUrils = getTrackUrisFromAlbum(sliced);
      queContext.setQue(slicedUrils);

      if (device && accessToken) {
        play(accessToken, device?.device_id, slicedUrils);
      }
    }
  };

  useEffect(() => {
    UICOntext.setPage("albumpage");
    if (album) {
      UICOntext.setHeading(
        `${album.artists[0].name} - ${
          album.name
        } (${getAlbumReleaseYearFromDate(
          album.release_date,
          album.release_date_precision
        )})`
      );
    }
  }, [album]);

  // TODO: If many songs last ones are hidden
  return (
    <>
      {loading ? (
        <AnimatedRoute>
          <SpinnerPage />
        </AnimatedRoute>
      ) : (
        <>
          <AnimatedRoute>
            {album && (
              <ItemWrapper>
                <Flex
                  direction="column"
                  gridGap="10px"
                  wrap="wrap"
                  paddingTop="10px"
                >
                  <Flex direction="row">
                    <Flex
                      direction="column"
                      gridGap="6"
                      wrap="wrap"
                      width="40vw"
                      paddingTop={10}
                    >
                      {album.tracks && (
                        <>
                          {album.tracks.items.map((t, i) => (
                            <MotionBox
                              whileHover={{ scale: 1.1, color: "#870000" }}
                              key={t.id}
                              cursor="pointer"
                              onClick={() => handlePlaySong(t.uri, i)}
                            >
                              <Text>
                                {t.name} {" - "}
                                {getMinutesAndSecondsFromMs(t.duration_ms)}
                              </Text>
                            </MotionBox>
                          ))}
                        </>
                      )}
                    </Flex>
                    <Spacer />
                    <Box
                      width="40vw"
                      marginLeft="auto"
                      paddingRight="3"
                      paddingTop={"15"}
                    >
                      {album.images && (
                        <Image boxSize={"25vw"} src={album.images[0].url} />
                      )}
                      <Text>Album duration : {getAlbumDuration(album)}</Text>
                    </Box>
                  </Flex>
                </Flex>
              </ItemWrapper>
            )}
          </AnimatedRoute>
        </>
      )}
    </>
  );
};

export default AlbumPage;
