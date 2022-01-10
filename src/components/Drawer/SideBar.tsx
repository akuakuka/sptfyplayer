import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { SpotifyUser } from "@typings/SpotifyTypes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "../IconButton";
import { MotionBox } from "../MotionBox";

interface SidebarProps {
  handleAlbumArtToggle: () => void;
}

export const SideBar: React.FC<SidebarProps> = ({ handleAlbumArtToggle }) => {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  /* 
  const btnRef = React.useRef(); */
  const user: SpotifyUser = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const bgColor = useColorModeValue("brand.500", "brandDark.900");
  const { toggleColorMode, colorMode } = useColorMode();

  const handleUserClick = () => {
    if (user.external_urls.spotify) {
      window.open(user.external_urls.spotify, "_blank");
    }
  };

  const handleLogout = () => {
    // TODO: Nämä contextiin
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("user");
    navigate(`/login`);
  };

  return (
    <>
      <Flex
        height={"100vh"}
        minWidth={"80px"}
        maxWidth={"80px"}
        backgroundColor={bgColor}
        direction={"column"}
        alignItems={"center"}
        gridGap={4}
      >
        <Flex paddingTop={5} direction={"column"} alignItems={"center"}>
          {user && (
            <>
              {user.images && user.images[0] && (
                <MotionBox whileHover={{ scale: 0.6 }}>
                  <Avatar
                    name={user.display_name}
                    src={user.images[0].url}
                    onClick={() => handleUserClick()}
                    cursor={"pointer"}
                  />
                </MotionBox>
              )}
              {user.display_name && <Text>{user.display_name}</Text>}
            </>
          )}
        </Flex>
        <Divider />
        <Flex direction={"column"} alignItems={"center"}>
          <IconButton
            variant="artist"
            onClick={() => navigate(`/app/artist/`)}
          />
          <Text>Artists</Text>
        </Flex>
        <Flex direction={"column"} alignItems={"center"}>
          <IconButton variant="album" onClick={() => navigate(`/app/album/`)} />
          <Text>Albums</Text>
        </Flex>
        <Flex direction={"column"} alignItems={"center"}>
          <IconButton variant="search" />
          <Text>Search</Text>
        </Flex>
        <Flex direction={"column"} alignItems={"center"}>
          <IconButton
            variant="settings"
            onClick={() => setSettingsOpen(!settingsOpen)}
          />
          <Text>Settings</Text>
        </Flex>

        {settingsOpen && (
          <MotionBox>
            <Flex direction={"column"} alignItems={"center"}>
              <Switch size="md" onChange={() => handleAlbumArtToggle()} />
              <Text>AlbumArt</Text>
            </Flex>
            <Flex direction={"column"} alignItems={"center"}>
              {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
              <Switch size="md" onChange={() => toggleColorMode()} />
              <Text>{colorMode === "dark" ? "Light" : "Dark"}</Text>
            </Flex>
          </MotionBox>
        )}
        <Divider />

        <Box marginTop="auto" paddingBottom={6}>
          <Divider />
          <IconButton variant="logout" onClick={() => handleLogout()} />
        </Box>
      </Flex>
    </>
  );
};
