import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/layout";
import {
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  Text,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDebounce } from "../hooks/useDebounce";
import { IconButton as IconB } from "./IconButton";

interface HeaderProps {
  handleAlbumArtToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleAlbumArtToggle }) => {
  const [term, setTerm] = useState<string>("");

  const { toggleColorMode } = useColorMode();

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
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiryDate");
    navigate(`/login`);
  };
  // TODO: Switch background coilor
  return (
    <Flex
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
      <IconB variant="homepage" key="homepage" onClick={() => navigate(`/app`)} />
      <Box marginLeft="auto">
        <Input
          placeholder="Hae"
          size="md"
          maxWidth="200px"
          onChange={(e) => handleSearch(e)}
        />
      </Box>
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
            <MenuItem closeOnSelect={false}>
              <Flex direction="row" gridGap="3">
                <Text>Albumart Background</Text>
                <Switch size="md" onChange={() => handleAlbumArtToggle()} />
              </Flex>
            </MenuItem>

            <MenuItem closeOnSelect={false}>
              <Flex direction="row" gridGap="3">
                <Text>ColorMode</Text>
                <Switch size="md" onChange={() => toggleColorMode()} />
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
