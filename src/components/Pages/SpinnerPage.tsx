import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import { ItemWrapper } from "../ItemWrapper";

export const SpinnerPage: React.FC = () => {
  return (
    /*    <Flex justifyContent="center" width={"100%"} height={"100%"}> */
    <ItemWrapper>
      <Flex flex={1} height={"60vh"} alignItems={"center"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brandDark.200"
          boxSize={"50vw"}
          maxHeight={"300px"}
          maxWidth={"300px"}
        />
      </Flex>
    </ItemWrapper>

    /*  </Flex> */
  );
};
