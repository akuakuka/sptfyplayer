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
import { IconButton } from "./IconButton";
/* import { useVolume } from "../hooks/useVolume"; */

interface FooterProps {
  handleVolume: (val: number) => void;
  volume: number;
}

const Footer: React.FC<FooterProps> = ({ handleVolume, volume }) => {
  const webPlaybackSDKReady = useWebPlaybackSDKReady();

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

  return (
    <Flex
      justify="space-between"
      backgroundColor={useColorModeValue("brand.500", "brandDark.900")}
      height="100px"
      alignItems="center"
      justifyContent="center"
      gridGap="10px"
      position="fixed"
      width="100vw"
      boxShadow="dark-lg"
    >
      {webPlaybackSDKReady ? (
        <>
          <Box
            marginBottom="100px"
            height="150px"
            width="150px"
            minHeight="150px"
            minWidth="150px"
            position="relative"
            left="-50vw + 50%"
            paddingLeft="3"
            paddingBottom="30"
          >
            {playbackState && (
              <Image
                src={
                  playbackState.track_window.current_track.album.images[0].url
                }
              />
            )}
          </Box>
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            gridGap="10px"
          >
            <Box>
              {playbackState && (

                <Text>
                  {playbackState.track_window.current_track.artists[0].name} - {playbackState.track_window.current_track.name}
                </Text>

              )}
            </Box>
            <Flex px="10">
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
            maxWidth="100px"
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
