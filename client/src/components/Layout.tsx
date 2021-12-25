import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  usePlaybackState,
  WebPlaybackSDK
} from "react-spotify-web-playback-sdk";
import { useLocation } from "react-router-dom"
import { UIContext } from "../hooks/useUI";
import { isAccessTokenValid, refreshAccessToken } from "../utils/authUtils";
import Footer from "./Footer";
import Header from "./Header";
import { IconButton } from "./IconButton";

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
    <Flex
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
      direction="column"
    >
      {children}
    </Flex>
  );
};

const Layout: React.FC = () => {
  const [albumArtBg, setAlbumArtBg] = useState<boolean>(false);
  const accessToken = localStorage.getItem("accessToken");
  const [volume, setVolume] = useState<number>(0.5);
  /*   const [viewMode, setViewMode] = useState<string>(""); */
  const location = useLocation();
  const UICOntext = useContext(UIContext);


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
            sx={{ height: "calc(100vh - 150px);" }}
            width="100vw"
            justifyContent="center"
            paddingY="5"
          >
            <Flex
              direction="row"
              alignItems={"center"}
              justifyContent="center"
              gridGap="10"
              width="95vw"
              backgroundColor={"brandDark.300"}
              height={"40px"}
              borderRadius={"10"}
            >
              <Heading>Artistit</Heading>
              {!location.pathname.includes("/app/album/") && 
              
              <Flex marginLeft="auto" direction={"row"} gridGap="10" p="3">
         
              <IconButton variant="list" onClick={() => UICOntext.setView("LIST")} />
              <IconButton variant="listimages" onClick={() => UICOntext.setView("IMAGES")} />
            </Flex>
            
            }
      
            </Flex>
            <Outlet />
          </Flex>

          <Footer handleVolume={handleVolume} volume={volume} />
        </Wrapper>
      </WebPlaybackSDK>
    </>
  );
};

export default Layout;
