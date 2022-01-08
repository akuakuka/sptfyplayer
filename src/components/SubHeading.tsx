import {
  Box,
  Flex,
  Heading,
  Input,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { UIContext } from "../hooks/useUI";
import { IconButton } from "./IconButton";

export const SubHeading: React.FC = () => {
  const UICOntext = useContext(UIContext);

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
      justifyContent={"space-between"}
      marginBottom={4}
      padding={4}
    >
      <Box width={"40%"}>
        <Heading isTruncated>{UICOntext.heading}</Heading>
      </Box>
      <Input
        variant="flushed"
        placeholder="Filtteröi"
        value={UICOntext.filter}
        onChange={(e) => UICOntext.setFilter(e.target.value)}
        width={"25%"}
      />
      <Box>
        {UICOntext.page === "artistpage" && (
          <Flex gridGap="2" p="3">
            <Text>Singlet</Text>
            <Switch
              size="md"
              isChecked={UICOntext.singles}
              onChange={() => UICOntext.toggleSingles()}
            />
          </Flex>
        )}
      </Box>
      <Flex direction={"row"} gap={6}>
        {UICOntext.page !== "albumpage" && (
          <>
            <IconButton
              variant="list"
              onClick={() => UICOntext.setView("LIST")}
            />
            <IconButton
              variant="listimages"
              onClick={() => UICOntext.setView("IMAGES")}
            />
          </>
        )}
      </Flex>
    </Flex>
  );
};
