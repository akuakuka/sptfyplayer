import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React,{ useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  /*   const user = localStorage.getItem("user"); */
  let query = useQuery();
  // const history = useHistory();

  useEffect(() => {
    // TODO: date
    const accessToken = query.get("accessToken");
    const refreshToken = query.get("refreshToken");

    const expiryDate = new Date(
      new Date().setHours(new Date().getHours() + 1)
    ).valueOf();

    // TODO: expiryDate from backend and into user object?
    if (accessToken) {
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("expiryDate", expiryDate.toString());
      localStorage.setItem("user", accessToken);
      navigate("/app");
    }
  }, []);

  const handleLogin = () => {
 //@ts-ignore
   const loginURL = import.meta.env.MODE === "development" ? `${import.meta.env.VITE_BACKEND_URL_DEV}/api/auth/login` : `${import.meta.env.VITE_BACKEND_URL_PROD}/api/auth/login`;
   console.log("##########################################################")
   console.log({loginURL})
   //@ts-ignore
    window.location.href = loginURL;
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
