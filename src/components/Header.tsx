import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/layout";
import {
  Avatar,
  IconButton,
  Input,
  Menu,
  MenuButton, MenuDivider, MenuItem,
  MenuList,
  Switch,
  Text,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { SpotifyUser } from "../../server/types/SpotifyTypes";
import { useDebounce } from "../hooks/useDebounce";
import { IconButton as IconB } from "./IconButton";

interface HeaderProps {
  handleAlbumArtToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleAlbumArtToggle }) => {
  const [term, setTerm] = useState<string>("");
  const { toggleColorMode, colorMode } = useColorMode();
  const user: SpotifyUser = JSON.parse(localStorage.getItem("user") || "");
  useDebounce(() => doSearch(term), 1500, [term]);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    setTerm(searchValue);
  };

  const doSearch = async (searchterm: string) => {
    if (searchterm.length > 1) {
      // TODO: Searchterm not clearing after search
      setTerm("");
      navigate(`/app/search/${searchterm}`);
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

  const handleUserClick = () => {
    if (user.external_urls.spotify) {
      window.open(user.external_urls.spotify, '_blank');
    }
  }

  return (
    <Flex

      top="0"
      width="100vw"
      height="50px"
      backgroundColor={useColorModeValue("brand.500", "brandDark.900")}
      boxShadow="dark-lg"
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      zIndex="100"
      gridGap="10"
    >
      <IconB variant="homepage" key="homepage" onClick={() => navigate(`/app`)} />

      <Flex marginLeft="auto" direction={"row"}>
        <IconB variant="search" />
        <Input
          placeholder="Hae Spotifystä"
          size="md"
          maxWidth="200px"
          onChange={(e) => handleSearch(e)}
        />
      </Flex>
      <Box paddingRight="5" marginLeft="auto">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon stroke="brandDark.200" />}
            variant="outline"

            backgroundColor={useColorModeValue("brand.500", "brandDark.900")}
          />
          <MenuList backgroundColor={useColorModeValue("brand.500", "brandDark.900")}>
            {user &&
              <MenuItem disabled={true} onClick={() => handleUserClick()}>
                <Flex gridGap="3" alignItems="center">
                  {user.images[0] && <Avatar name={user.display_name} src={user.images[0].url} />}
                  {user.display_name && <Text>{user.display_name}</Text>}
                </Flex>
              </MenuItem>}

            <MenuDivider />


            <MenuItem closeOnSelect={false}>
              <Flex direction="row" gridGap="3">
                <Text>Albumart Background</Text>
                <Switch size="md" onChange={() => handleAlbumArtToggle()} />
              </Flex>
            </MenuItem>

            <MenuItem closeOnSelect={false}>
              <Flex direction="row" gridGap="3" alignContent={"center"} alignItems={"center"} width={"100%"}>

                <Text>{colorMode === "dark" ? "Light" : "Dark"}</Text>
                {/* <Switch size="md" onChange={() => toggleColorMode()} /> */}

                <IconButton aria-label='ColorMode' icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />} onClick={() => toggleColorMode()} marginLeft={"auto"} />
              </Flex>
            </MenuItem>
            <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Header;
