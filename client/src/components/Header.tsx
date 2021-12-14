import { Box, Flex, Container } from "@chakra-ui/layout";
import { Button, Input, Switch, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { refreshToken, search } from "../API";

interface HeaderProps {
  handleAlbumArtToggle: Function;
  albumArtBg: boolean;
}

const Header: React.FC<HeaderProps> = ({
  handleAlbumArtToggle,
  albumArtBg,
}) => {
  const [term, setTerm] = useState("");
  const history = useHistory();
  useEffect(() => {}, []);
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    console.log(searchValue);
    setTerm(searchValue);
  };

  const doSEarch = async () => {
    if (term.length > 2) history.push(`/search/${term}`);
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
    >
      <Input
        placeholder="Hae"
        size="md"
        maxWidth="200px"
        onChange={(e) => handleSearch(e)}
      />
      <Button onClick={() => doSEarch()}>Hae </Button>
      <Button onClick={() => refreshToken()}>refreshj </Button>
      <Text>Albumart </Text>
      <Switch size="md" onChange={() => handleAlbumArtToggle()} />
    </Flex>
  );
};

export default Header;
