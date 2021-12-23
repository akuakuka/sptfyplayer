import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import {
  Outlet
} from "react-router-dom";
import {
  usePlaybackState,
  WebPlaybackSDK
} from "react-spotify-web-playback-sdk";
import { isAccessTokenValid, refreshAccessToken } from "../utils/authUtils";
import Footer from "./Footer";
import Header from "./Header";
// TODO: Wrapper omaan tiedostoon?

interface wrapperProps {
  albumArtBg: boolean;
}
// Wrapper is used for getting spotify-sdk-hooks to below parent element level
const Wrapper: React.FC<wrapperProps> = ({ children, albumArtBg }) => {
  const playbackState = usePlaybackState();
  // TODO: SDK Error state
  const getAlbumArtFromPLaybackState = (
    playbackState: Spotify.PlaybackState
  ): string => {
    if (playbackState) {
      return playbackState.track_window.current_track.album.images[0].url;
    }
    return "";
  };

  return (
    <Box
      backgroundImage={
        albumArtBg && playbackState
          ? getAlbumArtFromPLaybackState(playbackState)
          : ""
      }
      backgroundColor={useColorModeValue("brand.800", "brandDark.900")}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      backgroundAttachment={"fixed"}
      backgroundPosition={"center"}
      width={"100vw"}
      overflow={"hidden"}
    >
      {children}
    </Box>
  );
};

const Layout: React.FC = () => {
  const [albumArtBg, setAlbumArtBg] = useState<boolean>(false);
  const accessToken = localStorage.getItem("accessToken");
  const [volume, setVolume] = useState(0.5);

  const handleVolume = (val: number) => {
    setVolume(val);
  };

  const getAccesStoken = async () => {
    if (!isAccessTokenValid()) {
      const newToken = await refreshAccessToken();
      return newToken;
    }
    return accessToken;
  };

  const getOAuthToken = useCallback(
    (callback) => {
      const act = getAccesStoken();
      callback(act);
    },
    [accessToken]
  );

  return (
    <>
      <WebPlaybackSDK
        deviceName="sptfyplayer"
        getOAuthToken={getOAuthToken}
        connectOnInitialized={true}
        volume={volume}
      >
        <Wrapper albumArtBg={albumArtBg}>
          <Header handleAlbumArtToggle={() => setAlbumArtBg(!albumArtBg)} />

          <Flex
            direction="row"
            gridGap="10px"
            wrap="wrap"
            overflow="auto"
            height="91vh"
            width="100vw"
            justifyContent="center"
          >
            <Outlet />
          </Flex>

          <Footer handleVolume={handleVolume} volume={volume} />
        </Wrapper>
      </WebPlaybackSDK>
    </>
  );
};

export default Layout;
