import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/layout";
import {
  Avatar,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { SpotifyUser } from "@typings/SpotifyTypes";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { HOMEPAGE } from "../config";
import { useDebounce } from "../hooks/useDebounce";
import { UIContext } from "../hooks/useUI";
import { IconButton as IconB } from "./IconButton";

interface HeaderProps {
  handleAlbumArtToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleAlbumArtToggle }) => {
  /*  const [term, setTerm] = useState<string>(""); */
  const { toggleColorMode, colorMode } = useColorMode();
  const user: SpotifyUser = JSON.parse(localStorage.getItem("user") || "{}");
  const UICOntext = useContext(UIContext);
  useDebounce(() => doSearch(UICOntext.spotifySearch), 1500, [
    UICOntext.spotifySearch,
  ]);

  const navigate = useNavigate();

  /*   const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
      const searchValue = e.currentTarget.value;
      setTerm(searchValue);
    };
   */
  const doSearch = async (searchterm: string) => {
    if (searchterm.length > 1) {
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
      window.open(user.external_urls.spotify, "_blank");
    }
  };

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
      <IconB
        variant="homepage"
        key="homepage"
        onClick={() => navigate(`/app`)}
      />

      <Flex marginLeft="auto" direction={"row"}>
        <IconB variant="search" />
        <Input
          placeholder="Hae Spotifystä"
          size="md"
          maxWidth="200px"
          onChange={(e) => UICOntext.setSpotifySearch(e.target.value)}
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
          <MenuList
            backgroundColor={useColorModeValue("brand.500", "brandDark.900")}
          >
            {user && (
              <MenuItem disabled={true} onClick={() => handleUserClick()}>
                <Flex gridGap="3" alignItems="center">
                  {user.images && user.images[0] && (
                    <Avatar name={user.display_name} src={user.images[0].url} />
                  )}
                  {user.display_name && <Text>{user.display_name}</Text>}
                </Flex>
              </MenuItem>
            )}

            <MenuDivider />

            <MenuItem closeOnSelect={false}>
              <Flex direction="row" gridGap="3">
                <Text>Albumart Background</Text>
                <Switch size="md" onChange={() => handleAlbumArtToggle()} />
              </Flex>
            </MenuItem>

            <MenuItem closeOnSelect={false}>
              <Flex
                direction="row"
                gridGap="3"
                alignContent={"center"}
                alignItems={"center"}
                width={"100%"}
              >
                <Text>{colorMode === "dark" ? "Light" : "Dark"}</Text>
                {/* <Switch size="md" onChange={() => toggleColorMode()} /> */}

                {/*            <IconButton
                  aria-label="ColorMode"
                  icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                  onClick={() => toggleColorMode()}
                  marginLeft={"auto"}
                /> */}
                {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                <Switch
                  size="md"
                  onChange={() => toggleColorMode()}
                  marginLeft={"auto"}
                />
              </Flex>
            </MenuItem>
            <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>

            <MenuDivider />
            <Flex direction={"row-reverse"}>
              <Box paddingX={5}>
                <IconB
                  variant="github"
                  onClick={() => window.open(HOMEPAGE, "_blank")}
                />
              </Box>
            </Flex>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Header;
