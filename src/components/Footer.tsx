import { Flex } from "@chakra-ui/layout";
import {
  Box,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { SpotifyDevice, SpotifyUser } from "@typings/SpotifyTypes";
import React, { useEffect, useState } from "react";
import { MdComputer, MdDevices, MdSmartphone, MdSpeaker } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
  useWebPlaybackSDKReady,
} from "react-spotify-web-playback-sdk";
import { changeDevice, getDevices } from "../API/API";
import { getIDFromSpotifyUri } from "../utils/dateUtils";
import { IconButton as IconB } from "./IconButton";
import { SongProgress } from "./SongProgress";

// TODO: Volume contextiin?=
interface FooterProps {
  handleVolume: (val: number) => void;
  volume: number;
}

const Footer: React.FC<FooterProps> = ({ handleVolume, volume }) => {
  const [initialCheck, setInitialCheck] = useState<boolean>(false);
  const [devicesLoading, setDevicesLoading] = useState<boolean>(false);
  const [devices, setDevices] = useState<SpotifyDevice[]>([]);
  const webPlaybackSDKReady = useWebPlaybackSDKReady();
  const player = useSpotifyPlayer();
  const playbackState = usePlaybackState();
  const device = usePlayerDevice();
  const user: SpotifyUser = JSON.parse(localStorage.getItem("user") || "{}");
  const bgColor = useColorModeValue("brand.500", "brandDark.900");
  const navigate = useNavigate();
  // Change spotify device when connected
  useEffect(() => {
    (async () => {
      if (!initialCheck) {
        if (device) {
          console.log(device);
          await changeDevice(device.device_id);
          setInitialCheck(true);
        }
      }
    })();
  }, [device]);

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
  const handleDeviceMenu = async () => {
    setDevicesLoading(true);
    const devices = await getDevices();
    setDevices(devices);
    setDevicesLoading(false);
  };

  const getDeviceIcon = (type: string, active: boolean) => {
    if (type === "Computer") {
      if (active) {
        return <MdComputer color={"brandDark.200"} />;
      } else {
        return <MdComputer />;
      }
    }
    if (type === "AVR") {
      if (active) {
        return <MdSpeaker stroke={"brandDark.200"} />;
      } else {
        return <MdSpeaker />;
      }
    }
    if (type === "Smartphone") {
      if (active) {
        return <MdSmartphone stroke={"brandDark.200"} />;
      } else {
        return <MdSmartphone />;
      }
    }
  };

  return (
    <>
      {playbackState && (
        <SongProgress
          durationMS={playbackState.duration}
          paused={playbackState.paused}
        />
      )}
      <Flex
        bottom="0"
        width="100vw"
        height={"100px"}
        backgroundColor={bgColor}
        boxShadow="dark-lg"
        alignContent="center"
        alignItems="center"
        justifyContent="space-around"
        zIndex="100"
        gridGap="3"
      >
        {user && user.product === "premium" ? (
          <>
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
                  <>
                    {playbackState && (
                      <Image
                        position={"fixed"}
                        bottom={"15px"}
                        width={"20vw"}
                        maxWidth="200px"
                        align={"revert"}
                        src={
                          playbackState.track_window.current_track.album
                            .images[0].url
                        }
                        cursor={"pointer"}
                        onClick={() =>
                          navigate(
                            `/app/album/${getIDFromSpotifyUri(
                              playbackState.track_window.current_track.album.uri
                            )}`
                          )
                        }
                      />
                    )}
                  </>
                </Box>
                <Flex
                  direction="column"
                  gridGap="1"
                  width="30vw"
                  alignContent={"center"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {playbackState && (
                    <Text noOfLines={1} width="50vw" isTruncated>
                      {playbackState.track_window.current_track.artists[0].name}{" "}
                      - {playbackState.track_window.current_track.name}
                    </Text>
                  )}

                  <Flex px="10" paddingBottom="7">
                    <IconB
                      aria-label="next track"
                      variant={"prev"}
                      onClick={() => handlePrev()}
                      key="prevbutton"
                    />
                    {playbackState && playbackState.paused ? (
                      <IconB
                        aria-label="play"
                        variant={"play"}
                        onClick={() => handlePlay()}
                        key="playbutton"
                      />
                    ) : (
                      <IconB
                        aria-label="pause"
                        variant={"pause"}
                        onClick={() => handlePause()}
                        key="pausebutton"
                      />
                    )}

                    <IconB
                      aria-label="next track"
                      variant={"next"}
                      onClick={() => handleNext()}
                      key="nextbutton"
                    />
                  </Flex>
                </Flex>

                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={
                      devicesLoading ? (
                        <Spinner />
                      ) : (
                        <MdDevices stroke="brandDark.200" />
                      )
                    }
                    variant="outline"
                    backgroundColor={bgColor}
                    onClick={() => handleDeviceMenu()}
                  />
                  <MenuList>
                    {devices && (
                      <>
                        {devices.map((d) => {
                          return (
                            <MenuItem key={d.id}>
                              <Flex
                                direction="row"
                                alignItems="center"
                                gridGap={3}
                              >
                                {getDeviceIcon(d.type, d.is_active)}
                                <Text> {d.name} </Text>
                              </Flex>
                            </MenuItem>
                          );
                        })}
                      </>
                    )}
                  </MenuList>
                </Menu>

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
          </>
        ) : (
          <Text> Premium subscription is needed to play music !</Text>
        )}
      </Flex>
    </>
  );
};

export default Footer;
