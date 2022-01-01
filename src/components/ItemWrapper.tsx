import { Flex } from "@chakra-ui/react";
import React from "react";

interface ItemWrapperProps {
    islist?: boolean;
}

// TODO : make use of plexprops?
export const ItemWrapper: React.FC<ItemWrapperProps> = ({ children, islist }) => {
    return (
        <>
            {islist ? (
                <Flex direction={"row"} wrap={"wrap"} justifyContent={"center"} width={"95vw"} paddingX={"10"} paddingY={"3"}>
                    {children}
                </Flex>
            ) : (
                <Flex direction={"row"} wrap={"wrap"} justifyContent={"center"} >
                    {children}
                </Flex>
            )
            }
        </>
    );
};
