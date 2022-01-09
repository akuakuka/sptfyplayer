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
      console.log(" await executeLogin();");
      await executeGetLoginUrl();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      console.log(" console.log(window.location);");
      console.log(window.location);
      console.log("Login useEffefct");
      const accessToken = query.get("accessToken");

      if (accessToken) {
        console.log("if (accessToken)");
        localStorage.setItem("accessToken", accessToken);
        const refreshToken = query.get("refreshToken");
        const expiryDate = getExpiryDate();
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("expiryDate", expiryDate.toString());

        await execute();

        navigate("/app");
      } else if (userToken) {
        console.log("else if (userToken)");
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
      console.log("    if (dataLogin) {");
      if (dataLogin.spotifyAuthUrl) {
        console.log(" dataLogin.spotifyAuthUrl");
        window.location.replace(dataLogin.spotifyAuthUrl);
      }
    }
  };

  return (
    <>
      {loading ? (
        <SpinnerPage />
      ) : (
        <Flex justifyContent="center" alignItems="center" height="100vh">
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
