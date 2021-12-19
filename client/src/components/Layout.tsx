import { Box, Flex } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Outlet,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  usePlaybackState,
  WebPlaybackSDK,
} from "react-spotify-web-playback-sdk";
import { checkAuth, refreshToken } from "../API";
import Footer from "./Footer";
import Header from "./Header";
import { isAccessTokenValid, refreshAccessToken } from "../utils/authUtils";

interface wrapperProps {
  albumArtBg: boolean;
}
const Wrapper: React.FC<wrapperProps> = ({ children, albumArtBg }) => {
  const playbackState = usePlaybackState();

  const getAlbumArtFromPLaybackState = (
    playbackState: Spotify.PlaybackState
  ): string => {
    if (playbackState) {
      return playbackState.track_window.current_track.album.images[0].url;
    }
    /*     console.log(playbackState);
    if (playbackState.track_window.current_track.album) {
     
    } */
    return "";
  };

  return (
    <Box
      backgroundImage={
        albumArtBg && playbackState
          ? getAlbumArtFromPLaybackState(playbackState)
          : ""
      }
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
  // TODO: rename user to accessToken
  // TODO: mainview container and header alignment (scrollbar)
  const [albumArtBg, setAlbumArtBg] = useState<boolean>(false);
  const user = localStorage.getItem("user");

  const [volume, setVolume] = useState(0.5);
  const navigate = useNavigate();

  const handleVolume = (val: number) => {
    console.log(val);
    setVolume(val);
  };

  const getAccesStoken = async () => {
    if (!isAccessTokenValid()) {
      await refreshAccessToken();
    }

    try {
      await checkAuth();
    } catch (e) {
      console.log("WebPlaybackSDK Checkauth failed");
      localStorage.removeItem("user");
      //  setUser("");
      navigate("/login");
    }
    return user;
  };

  const getOAuthToken = useCallback(
    (callback) => {
      const act = getAccesStoken();
      callback(act);
    },
    [user]
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
            paddingTop="20"
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
