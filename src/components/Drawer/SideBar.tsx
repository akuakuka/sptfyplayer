import { MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Icon,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { SpotifyUser } from "@typings/SpotifyTypes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const bgColor = useColorModeValue("brand.500", "brandDark.900");
  const { toggleColorMode, colorMode } = useColorMode();

  useDebounce(() => doSearch(searchTerm), 1500, [searchTerm]);

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

  const doSearch = async (searchterm: string) => {
    if (searchterm.length > 1) {
      navigate(`/app/search/${searchterm}`);
    }
  };

  // TODO: Popover button fix
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

        <Popover placement="right">
          <PopoverTrigger>
            {/* //TODO: popover triggeriongelma */}
            <Icon
              role="button"
              aria-label="Search Spotify"
              as={SearchIcon}
              color="brandDark.200"
              w={10}
              h={10}
              _hover={{ transform: "scale(1.5)" }}
            />
          </PopoverTrigger>
          <Text>Search</Text>
          <PopoverContent>
            <PopoverArrow />

            <PopoverBody>
              <Input
                placeholder="Hae Spotifystä"
                maxWidth="200px"
                onChange={(e) => setSearchTerm(e.target.value)}
                minWidth={"100%"}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>

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
          <IconButton
            variant="settings"
            onClick={() => setSettingsOpen(!settingsOpen)}
          />
          <Text>Settings</Text>
        </Flex>

        {settingsOpen && (
          <>
            <Flex direction={"column"} alignItems={"center"}>
              <Switch size="md" onChange={() => handleAlbumArtToggle()} />
              <Text>AlbumArt</Text>
            </Flex>
            <Flex direction={"column"} alignItems={"center"}>
              {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
              <Switch size="md" onChange={() => toggleColorMode()} />
              <Text>{colorMode === "dark" ? "Light" : "Dark"}</Text>
            </Flex>

            <Box paddingBottom={6}>
              <IconButton variant="logout" onClick={() => handleLogout()} />
              <Text>Logout</Text>
            </Box>
          </>
        )}
        <Divider />
      </Flex>
    </>
  );
};
