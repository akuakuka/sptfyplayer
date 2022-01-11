import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { SpotifyLoginURLResponse, SpotifyUser } from "@typings/SpotifyTypes";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLoginURL, getUser } from "../../API/API";
import { useAPI } from "../../hooks/useApi";
import { getExpiryDate } from "../../utils/dateUtils";
import { SpinnerPage } from "./SpinnerPage";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
// TODO: Login loop network error
const Login: React.FC = () => {
  const { execute, loading, data, error } = useAPI<SpotifyUser>(
    () => getUser(),
    false
  );

  const {
    execute: executeGetLoginUrl,
    loading: loadingLogin,
    data: dataLogin,
    error: errorLogin,
  } = useAPI<SpotifyLoginURLResponse>(() => getLoginURL(), false);

  const navigate = useNavigate();
  const query = useQuery();
  const userToken = localStorage.getItem("accessToken") || "";

  useEffect(() => {
    (async () => {
      await executeGetLoginUrl();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const accessToken = query.get("accessToken");

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        const refreshToken = query.get("refreshToken");
        const expiryDate = getExpiryDate();
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("expiryDate", expiryDate.toString());

        await execute();

        navigate("/app");
      } else if (userToken) {
        navigate("/app");
      }
    })();
  }, []);

  useEffect(() => {
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    }
  }, [data]);

  const handleLogin = async () => {
    if (dataLogin) {
      if (dataLogin.spotifyAuthUrl) {
        window.location.replace(dataLogin.spotifyAuthUrl);
      }
    }
  };

  return (
    <>
      {loading ? (
        <SpinnerPage />
      ) : (
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bgGradient="linear(to-l, #2D3748, #822727)"
        >
          <Button
            boxShadow="dark-lg"
            p="6"
            rounded="md"
            bg="green.400"
            onClick={() => handleLogin()}
            id="loginButton"
          >
            Login with spotify
          </Button>
        </Flex>
      )}
    </>
  );
};

export default Login;

/* 
    brand: {
      100: "#FAF3F3",
      300: "#afb1d7",
      500: "#FCD6CC",
      600: "#A7BBC7",
      700: "#7a626b",
      800: "#decad6",
      900: "#e4bbff8a",
    },
    brandDark: {
      100: "#718096",
      200: "#870000",
      300: "#2D3748",
      600: "#s1A202C",
      900: "#171923",
    },
     */
