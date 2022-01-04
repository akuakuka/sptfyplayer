import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SpotifyLoginURLResponse,
  SpotifyUser,
} from "../../server/types/SpotifyTypes";
import { getUser } from "../API/API";
import { LOGINURL } from "../config";
import { useAPI } from "../hooks/useApi";
import { getExpiryDate } from "../utils/dateUtils";
import { SpinnerPage } from "./SpinnerPage";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Login: React.FC = () => {
  const { execute, loading, data, error } = useAPI<SpotifyUser>(
    () => getUser(),
    false
  );
  const navigate = useNavigate();
  const query = useQuery();
  const userToken = localStorage.getItem("accessToken") || "";

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

        /*  await execute(); */

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
    /*     window.location.href = ; */
    console.log("##########################");
    console.log(LOGINURL);
    const { data } = await axios.get<SpotifyLoginURLResponse>(LOGINURL);

    window.location.replace(data.spotifyAuthUrl);
    /*   window.location.replace(LOGINURL); */
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
