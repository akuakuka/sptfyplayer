import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Input,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "../IconButton";
//TODO: rename this. Conflicts with chakra ui component

interface SidebarProps {
  handleAlbumArtToggle: () => void;
}

export const DrawerMenu: React.FC<SidebarProps> = ({
  handleAlbumArtToggle,
}) => {
  const bgColor = useColorModeValue("brand.500", "brandDark.900");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode, colorMode } = useColorMode();
  const navigate = useNavigate();
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
      <IconButton variant={"hamburger"} onClick={onOpen} />

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size={"xs"}
        colorScheme={bgColor}
      >
        <DrawerOverlay />
        <DrawerContent backgroundColor={"brandDark.900"}>
          <DrawerCloseButton />
          <DrawerHeader>SPTFYPLAYER</DrawerHeader>

          <DrawerBody>
            <Flex direction={"column"} height={"90vh"} gap={3}>
              <Input placeholder="Search from Spotify" />
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => {
                  navigate(`/app/`);
                  onClose();
                }}
              >
                Artists
              </Button>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => {
                  navigate(`/app/album/`);
                  onClose();
                }}
              >
                Albums
              </Button>
              <Flex direction={"column"} alignItems={"center"}>
                <Heading>Settings</Heading>
              </Flex>

              <Flex direction={"row"}>
                <Text>Dark mode</Text>
                <Switch
                  marginLeft={"auto"}
                  paddingRight={6}
                  size="lg"
                  onChange={() => toggleColorMode()}
                />
              </Flex>
              <Flex direction={"row"}>
                <Text>AlbumArt</Text>
                <Switch
                  marginLeft={"auto"}
                  paddingRight={6}
                  size="lg"
                  onChange={() => handleAlbumArtToggle()}
                />
              </Flex>
              <Button
                marginTop={"auto"}
                backgroundColor={"brandDark.200"}
                onClick={() => handleLogout()}
              >
                Logout
              </Button>
            </Flex>
          </DrawerBody>

          {/*          <DrawerFooter>
      
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
};
