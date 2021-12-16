import {
  AddIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { Box, Flex, Container } from "@chakra-ui/layout";
import {
  Avatar,
  AvatarBadge,
  Button,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { refreshToken, search } from "../API";

interface HeaderProps {
  handleAlbumArtToggle: Function;
}

const Header: React.FC<HeaderProps> = ({ handleAlbumArtToggle }) => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {}, []);
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    console.log(searchValue);
    setTerm(searchValue);
  };

  const doSEarch = async () => {
    if (term.length > 2) navigate(`/app/search/${term}`);
  };

  const handleLogout = () => {
    console.log("handleLogout");
    localStorage.removeItem("user");
    navigate(`/login`);
  };

  return (
    <Flex
      position="fixed"
      top="0"
      width="100vw"
      borderBottom="100px"
      height="50px"
      backgroundColor="gray.800"
      boxShadow="dark-lg"
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      zIndex="100"
      gridGap="10"
    >
      <Input
        placeholder="Hae"
        size="md"
        maxWidth="200px"
        onChange={(e) => handleSearch(e)}
      />
      <Button onClick={() => doSEarch()}>Hae </Button>
      <Button onClick={() => refreshToken()}>refreshj </Button>
      <Box marginLeft="auto" paddingRight="5">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem closeOnSelect={false}>
              <Flex direction="row" gridGap="3">
                <Text>Albumart </Text>
                <Switch size="md" onChange={() => handleAlbumArtToggle()} />
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
