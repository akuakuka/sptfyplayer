import { Flex, Heading, Input, Switch, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UIContext } from "../hooks/useUI";
import { IconButton } from "./IconButton";

/* const getHeading = (): string => {
    // TODO: Artist or album name to heading, Better way to get heading than route?
    console.log(location.pathname);
    if (location.pathname === "/app") return "Seuratut Artistit";
    if (location.pathname.includes("/app/artist")) return "Albumit";
    if (location.pathname.includes("/app/album")) return "Albumi";
    return "";
}; */
// TODO : Single switch rerenders
export const SubHeading: React.FC = () => {
    const UICOntext = useContext(UIContext);
    const location = useLocation();

    return (
        <Flex
            direction="row"
            backgroundColor={"brandDark.300"}
            height={"40px"}
            width={"86vw"}
            borderRadius={"8"}
            alignItems={"center"}
        >
            <Heading>{UICOntext.heading}</Heading>
            {!location.pathname.includes("/app/album/") && (
                <Flex
                    marginLeft="auto"
                    direction={"row"}
                    gridGap="10"
                    p="3"
                    alignItems={"center"}
                >
                    {UICOntext.heading !== "Seuratut artistit" &&
                        <Flex gridGap="2" p="3">
                            <Text >Singlet</Text>
                            <Switch size="md" isChecked={UICOntext.singles} onChange={() => UICOntext.toggleSingles && UICOntext.toggleSingles()} />
                        </Flex>
                    }


                    <Input variant='flushed' placeholder='Filtteröi' value={UICOntext.filter} onChange={(e) => UICOntext.setFilter && UICOntext.setFilter(e.target.value)} />
                    <IconButton
                        variant="list"
                        onClick={() => UICOntext.setView && UICOntext.setView("LIST")}
                    />
                    <IconButton
                        variant="listimages"
                        onClick={() => UICOntext.setView && UICOntext.setView("IMAGES")}
                    />
                </Flex>
            )}
        </Flex>
    );
};
