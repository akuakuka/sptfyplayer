import { Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  usePlaybackState,
  WebPlaybackSDK,
} from "react-spotify-web-playback-sdk";
import { checkAuth } from "../API/API";
import { UIContext } from "../hooks/useUI";
import Footer from "./Footer";
import Header from "./Header";
import { MotionBox } from "./MotionBox";
import { SubHeading } from "./SubHeading";

// TODO: Wrapper omaan tiedostoon?

interface wrapperProps {
  albumArtBg: boolean;
}
// Wrapper is used for getting spotify-sdk-hooks to below parent element level
const Wrapper: React.FC<wrapperProps> = ({ children, albumArtBg }) => {
  const bgColor = useColorModeValue("brand.900", "brandDark.600");
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
    <Flex
      direction={"column"}
      height={"100vh"}
      overflow={"hidden"}
      backgroundImage={
        albumArtBg && playbackState
          ? getAlbumArtFromPLaybackState(playbackState)
          : ""
      }
      backgroundColor={bgColor}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      backgroundAttachment={"fixed"}
      backgroundPosition={"center"}
    >
      {children}
    </Flex>
  );
};
// TODO: Scrolling not working
const Layout: React.FC = () => {
  const [albumArtBg, setAlbumArtBg] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const UICOntext = useContext(UIContext);
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();

  useEffect(() => {
    UICOntext.setFilter("");
    UICOntext.setSpotifySearch("");
  }, [location]);

  const handleVolume = (val: number) => {
    setVolume(val);
  };
  // TODO: Voiko nämä yhdistää?

  const getAccesStoken = async () => {
    await checkAuth();
    const token = localStorage.getItem("accessToken");
    return token;
  };

  const getOAuthToken = useCallback((callback) => {
    const act = getAccesStoken();
    callback(act);
  }, []);

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
          <Flex flex={1} overflow={"auto"} direction={"column"}>
            <SubHeading />
            <MotionBox
              exit={{ opacity: 0, x: 0, y: 0 }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
            >
              <Outlet />
            </MotionBox>
          </Flex>
          <Footer handleVolume={handleVolume} volume={volume} />
        </Wrapper>
      </WebPlaybackSDK>
    </>
  );
};

export default Layout;
