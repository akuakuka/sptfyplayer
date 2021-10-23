import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Login: React.FC = () => {
  const user = localStorage.getItem("user")
  let query = useQuery();
  const history = useHistory();

  useEffect(() => {
    const accessToken = query.get("accessToken");
    if (accessToken) {
     localStorage.setItem("user",accessToken);
      history.push("/app");
    }
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/spotify";
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Button
        boxShadow="dark-lg"
        p="6"
        rounded="md"
        bg="green.400"
        onClick={() => handleLogin()}
      >
        Login with spotify
      </Button>
    </Flex>
  );
};

export default Login;
