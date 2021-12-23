import { Flex } from "@chakra-ui/layout";
import {
  Box, Image, Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack, Text, useColorModeValue
} from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  useErrorState,
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
  useWebPlaybackSDKReady
} from "react-spotify-web-playback-sdk";
import { QueContext } from "../hooks/usePlayQue";
import { Size, useWindowSize } from "../hooks/useWindowSize";
import { IconButton } from "./IconButton";
/* import { useVolume } from "../hooks/useVolume"; */

interface FooterProps {
  handleVolume: (val: number) => void;
  volume: number;
}

const Footer: React.FC<FooterProps> = ({ handleVolume, volume }) => {
  const webPlaybackSDKReady = useWebPlaybackSDKReady();
  const size: Size = useWindowSize();

  const player = useSpotifyPlayer();
  const playbackState = usePlaybackState();
  const device = usePlayerDevice();
  //@ts-ignore
  const [que, setQue] = useContext(QueContext);
  //@ts-ignore
  const errorState = useErrorState();
  const user = localStorage.getItem("user") || "";

  const handlePlay = async () => {
    if (device === null) return;
    /*     play(user, device?.device_id, que); */
    player?.resume();
  };

  const handlePause = async () => {
    player?.pause();
  };

  const handleNext = () => {
    console.log("handlenext");
    player?.nextTrack();
  };

  const handlePrev = async () => {
    player?.previousTrack();
  };
  // TODO: Footer not working with small height view


  /*   <Flex
    position="fixed"
    top="0"
    width="100vw"
    borderBottom="100px"
    height="50px"
    backgroundColor={useColorModeValue("brand.500", "brandDark.900")}
    boxShadow="dark-lg"
    alignContent="center"
    alignItems="center"
    justifyContent="center"
    zIndex="100"
    gridGap="10"
  >
   */


  return (
    <Flex
      position="fixed"
      bottom="0"
      width="100vw"
      height="100px"
      backgroundColor={useColorModeValue("brand.500", "brandDark.900")}
      boxShadow="dark-lg"
      alignContent="center"
      alignItems="center"
      justifyContent="space-around"
      zIndex="100"
      gridGap="3"
    >
      {webPlaybackSDKReady ? (
        <>
          <Box
            height="30vh"
            width="30vw"
            minHeight="80px"
            minWidth="80px"
            paddingLeft="3"
            position="relative"
            marginBottom="0 auto"

          >
            {(size.width && size.width > 400) &&
              <>
                {playbackState && (
                  <Image position="absolute"
                    src={
                      playbackState.track_window.current_track.album.images[0].url
                    }

                  />
                )}
              </>}

          </Box>
          <Flex
            direction="column"
            gridGap="1"
            width="30vw"
          >
            {playbackState && (

              <Text noOfLines={1} width="50vw">
                {playbackState.track_window.current_track.artists[0].name} - {playbackState.track_window.current_track.name}
              </Text>

            )}

            <Flex px="10" paddingBottom="7">
              <IconButton
                aria-label="next track"
                variant={"prev"}
                onClick={() => handlePrev()}
                key="prevbutton"
              />
              {
                (playbackState && playbackState.paused) ? <IconButton
                  aria-label="play-pause"
                  variant={"play"}
                  onClick={() => handlePlay()}
                  key="playbutton"
                /> : <IconButton
                  aria-label="play-pause"
                  variant={"pause"}
                  onClick={() => handlePause()}
                  key="pausebutton"
                />
              }

              <IconButton
                aria-label="next track"
                variant={"next"}
                onClick={() => handleNext()}
                key="nextbutton"
              />
            </Flex>
          </Flex>

          <Slider
            defaultValue={0.5}
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={(val) => handleVolume(val)}
            width="30vw"
            maxWidth="100px"
            minWidth="50px"
            marginRight="1"
          >
            <SliderTrack bg="brandDark.200">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="brandDark.200" />
            </SliderTrack>
            <SliderThumb boxSize={3} />
          </Slider>
        </>
      ) : (
        <> webPlaybackSDK NOT READY </>
      )}
    </Flex>
  );
};

export default Footer;
