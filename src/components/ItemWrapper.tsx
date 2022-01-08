import { Flex } from "@chakra-ui/react";
import React from "react";

interface ItemWrapperProps {
  islist?: boolean;
}

// TODO : make use of plexprops?
export const ItemWrapper: React.FC<ItemWrapperProps> = ({
  children,
  islist,
}) => {
  return (
    <>
      {islist ? (
        <Flex
          direction={"row"}
          wrap={"wrap"}
          justifyContent={"center"}
          width={"95vw"}
          paddingX={"10"}
          paddingY={"3"}
          gap={2}
        >
          {children}
        </Flex>
      ) : (
        <Flex
          direction={"row"}
          wrap={"wrap"}
          justifyContent={"center"}
          gap={2}
          /*        _after={{
            content: '""',
            justifyContent: "flex-start",
          }} */
          /*   sx={{ "&:after": { "'content'": "", flex: "'auto'" } }} */
        >
          {children}
        </Flex>
      )}
    </>
  );
};

/* 
sx={{
        '.my-box:hover &': {
          color: 'green.500',
        },
      }}



        &:after {
    content: "";
    flex: auto;
  } */
