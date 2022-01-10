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
import { IconButton } from "../IconButton";
//TODO: rename this. Conflicts with chakra ui component
export const DrawerMenu: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <IconButton variant={"hamburger"} onClick={onOpen} />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"xs"}>
        <DrawerOverlay />
        <DrawerContent backgroundColor={"brandDark.900"}>
          <DrawerCloseButton />
          <DrawerHeader>SPTFYPLAYER</DrawerHeader>

          <DrawerBody>
            <Flex direction={"column"}>
              <Input placeholder="Search from Spotify" />
              <Button colorScheme="teal" variant="outline">
                Artists
              </Button>
              <Button colorScheme="teal" variant="outline">
                Albums
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
