import { Flex, Spinner } from "@chakra-ui/react";

export const SpinnerPage: React.FC = () => {
  return (
    <Flex
      align="center"
      alignSelf="center"
      alignItems="center"
      justifyContent="center"
      justifyItems="center"
      justifySelf="center"
      height="90vh"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        width="200px"
        height="200px"
      />
    </Flex>
  );
};