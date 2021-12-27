import { Flex } from "@chakra-ui/layout";
import {
  Box, IconButton,
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
  useColorModeValue
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdComputer, MdDevices, MdSmartphone, MdSpeaker } from "react-icons/md";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
  useWebPlaybackSDKReady
} from "react-spotify-web-playback-sdk";
import { SpotifyDevice, SpotifyUser } from "../../../server/types/SpotifyTypes";
import { getDevices } from "../API";
import { Size, useWindowSize } from "../hooks/useWindowSize";
import { IconButton as IconB } from "./IconButton";

// TODO: Volume contextiin?=
interface FooterProps {
  handleVolume: (val: number) => void;
  volume: number;
}
// TODO: CONTEXT ORDER HOOK ERROR RED !
const Footer: React.FC<FooterProps> = ({ handleVolume, volume }) => {
  const [devicesLoading, setDevicesLoading] = useState<boolean>(false);
  const [devices, setDevices] = useState<SpotifyDevice[]>([]);
  const size: Size = useWindowSize();
  const webPlaybackSDKReady = useWebPlaybackSDKReady();
  const player = useSpotifyPlayer();
  const playbackState = usePlaybackState();
  const device = usePlayerDevice();
  const user: SpotifyUser = JSON.parse(localStorage.getItem("user") || "");

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
    console.log(devices);
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
      {user.product === "premium" ? (
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
                {size.width && size.width > 400 && (
                  <>
                    {playbackState && (
                      <Image
                        position="absolute"
                        src={
                          playbackState.track_window.current_track.album
                            .images[0].url
                        }
                      />
                    )}
                  </>
                )}
              </Box>
              <Flex direction="column" gridGap="1" width="30vw">
                {playbackState && (
                  <Text noOfLines={1} width="50vw">
                    {playbackState.track_window.current_track.artists[0].name} -{" "}
                    {playbackState.track_window.current_track.name}
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
                  icon={<MdDevices stroke="brandDark.200" />}
                  variant="outline"
                  backgroundColor={useColorModeValue(
                    "brand.500",
                    "brandDark.900"
                  )}
                  onClick={() => handleDeviceMenu()}
                />
                <MenuList>
                  {devicesLoading ? (
                    <Spinner />
                  ) : (
                    <>
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
  );
};

export default Footer;
