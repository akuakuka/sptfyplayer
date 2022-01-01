import { Flex } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  usePlaybackState,
  WebPlaybackSDK
} from "react-spotify-web-playback-sdk";
import { UIContext } from "../hooks/useUI";
import { isAccessTokenValid, refreshAccessToken } from "../utils/authUtils";
import Footer from "./Footer";
import Header from "./Header";
import { SubHeading } from "./SubHeading";

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
      direction={"column"}
      height={"100vh"}
      overflow={"hidden"}
      backgroundImage={
        albumArtBg && playbackState
          ? getAlbumArtFromPLaybackState(playbackState)
          : ""
      }
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
          <Flex flex={1} overflow={"auto"} direction={"column"}>
            <SubHeading />
            <Outlet />
          </Flex>
          <Footer handleVolume={handleVolume} volume={volume} />
        </Wrapper>
      </WebPlaybackSDK>
    </>
  );
};

export default Layout;
