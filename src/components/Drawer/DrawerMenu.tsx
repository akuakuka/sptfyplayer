import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "../IconButton";
//TODO: rename this. Conflicts with chakra ui component
export const DrawerMenu: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
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

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"xs"}>
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
                onClick={() => navigate(`/app/artist/`)}
              >
                Artists
              </Button>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => navigate(`/app/album/`)}
              >
                Albums
              </Button>
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
