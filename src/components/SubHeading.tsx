import {
  Flex,
  Heading,
  Input,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UIContext } from "../hooks/useUI";
import { IconButton } from "./IconButton";

export const SubHeading: React.FC = () => {
  const UICOntext = useContext(UIContext);
  const location = useLocation();

  return (
    <Flex
      direction="row"
      backgroundColor={useColorModeValue("brand.500", "brandDark.300")}
      height={"40px"}
      width={"86vw"}
      borderRadius={"8"}
      alignItems={"center"}
      marginX="auto"
      marginTop={4}
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
          <Input
            variant="flushed"
            placeholder="Filtteröi"
            value={UICOntext.filter}
            onChange={(e) => UICOntext.setFilter(e.target.value)}
          />
          {UICOntext.heading !== "Seuratut artistit" && (
            <Flex gridGap="2" p="3">
              <Text>Singlet</Text>
              <Switch
                size="md"
                isChecked={UICOntext.singles}
                onChange={() => UICOntext.toggleSingles()}
              />
            </Flex>
          )}
          <IconButton
            variant="list"
            onClick={() => UICOntext.setView("LIST")}
          />
          <IconButton
            variant="listimages"
            onClick={() => UICOntext.setView("IMAGES")}
          />
        </Flex>
      )}
    </Flex>
  );
};
