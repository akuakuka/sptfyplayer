import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGINURL } from "../config";
import { getExpiryDate } from "../utils/dateUtils";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const query = useQuery();
  // const history = useHistory();

  useEffect(() => {
    // TODO: date
    const accessToken = query.get("accessToken");
    const refreshToken = query.get("refreshToken");

    const expiryDate = getExpiryDate()

    // TODO: expiryDate from backend and into user object?
    if (accessToken) {
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("expiryDate", expiryDate.toString());
      localStorage.setItem("accessToken", accessToken);
      navigate("/app");
    }
  }, []);

  const handleLogin = () => {
    window.location.href = LOGINURL;
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
