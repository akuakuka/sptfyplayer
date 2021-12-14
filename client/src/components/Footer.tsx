import { Flex } from "@chakra-ui/layout";
import {
  Box,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Image,
} from "@chakra-ui/react";

import { ArrowBackIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

import { useContext } from "react";

import {
  useErrorState,
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
  useWebPlaybackSDKReady,
} from "react-spotify-web-playback-sdk";
import { play } from "../API";
import { QueContext } from "../hooks/usePlayQue";
import { AuthContext } from "../hooks/useAuth";

interface FooterProps {
  handleVolume: (val: number) => void;
  volume: number;
}

const Footer: React.FC<FooterProps> = ({ handleVolume, volume }) => {
  const webPlaybackSDKReady = useWebPlaybackSDKReady();

  const player = useSpotifyPlayer();
  const playbackState = usePlaybackState();
  const device = usePlayerDevice();
  const [que, setQue] = useContext(QueContext);
  const errorState = useErrorState();
  const user = localStorage.getItem("user");

  const handlePlay = async () => {
    if (device === null) return;
    play(user, device?.device_id, que);
    player?.togglePlay();
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
      backgroundColor="gray.800"
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
                <>
                  {playbackState.track_window.current_track.artists[0].name} -{" "}
                  {playbackState.track_window.current_track.name}{" "}
                </>
              )}
            </Box>
            <Box px="10">
              <IconButton
                aria-label="next track"
                icon={<ArrowLeftIcon />}
                onClick={() => handlePrev()}
              />
              <IconButton
                aria-label="play-pause"
                icon={<ArrowBackIcon />}
                onClick={() => handlePlay()}
              />
              <IconButton
                aria-label="next track"
                icon={<ArrowRightIcon />}
                onClick={() => handleNext()}
              />
            </Box>
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
            <SliderTrack bg="red.100">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="tomato" />
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
