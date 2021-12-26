import { Flex } from "@chakra-ui/layout";
import {
  Box, Button, Image, Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack, Text, useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
  useWebPlaybackSDKReady
} from "react-spotify-web-playback-sdk";
import { SpotifyUser } from "../../../server/types/SpotifyTypes";
import { changeDevice, getDevices } from "../API";
import { Size, useWindowSize } from "../hooks/useWindowSize";
import { IconButton } from "./IconButton";

// TODO: Volume contextiin?=
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

  const user: SpotifyUser = JSON.parse(localStorage.getItem("user") || "");

  useEffect(() => {
    console.log(device)
    console.log(playbackState)
  },[playbackState,device])
  const handlePlay = async () => {
    if (device === null) return;
    player?.resume();
  };

  const handlePause = async () => {
    player?.pause();
  };

  const handleNext = () => {
    player?.nextTrack();
  };

  const handlePrev = async () => {
    player?.previousTrack();
  };

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
      {user.product === "premium" ? <> {webPlaybackSDKReady ? (
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
<Button onClick={() => getDevices() }> l</Button>
<Button onClick={() => changeDevice("ae652a79f98302ea55069071663f61001820efe2")}>c </Button>
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
      )} </> : <Text> Premium subscription is needed to play music !</Text>}
    </Flex>
  );
};

export default Footer;
