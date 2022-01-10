import {
  Box,
  Flex,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  usePlaybackState,
  WebPlaybackSDK,
} from "react-spotify-web-playback-sdk";
import { checkAuth } from "../../API/API";
import { UIContext } from "../../hooks/useUI";
import { DrawerMenu } from "../Drawer/DrawerMenu";
import { SideBar } from "../Drawer/SideBar";
import { MotionBox } from "../MotionBox";
import Footer from "./Footer";
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
  const breakpoint = useBreakpointValue({ base: false, md: true });
  const UICOntext = useContext(UIContext);
  const location = useLocation();

  useEffect(() => {
    UICOntext.setFilter("");
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
        <Flex direction={"row"}>
          {breakpoint ? (
            <SideBar handleAlbumArtToggle={() => setAlbumArtBg(!albumArtBg)} />
          ) : (
            <Box paddingLeft={2} paddingTop={2} position={"absolute"}>
              <DrawerMenu
                handleAlbumArtToggle={() => setAlbumArtBg(!albumArtBg)}
              />
            </Box>
          )}
          <Wrapper albumArtBg={albumArtBg}>
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
        </Flex>
      </WebPlaybackSDK>
    </>
  );
};

export default Layout;
