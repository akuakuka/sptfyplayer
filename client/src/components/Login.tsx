import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkAuth, getUser } from "../API";
import { LOGINURL } from "../config";
import { getExpiryDate } from "../utils/dateUtils";
import { SpinnerPage } from "./SpinnerPage";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const query = useQuery();
  const userToken = localStorage.getItem("accessToken") || "";
  // const history = useHistory();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const accessToken = query.get("accessToken");
      const refreshToken = query.get("refreshToken");
      const expiryDate = getExpiryDate();
      // TODO: expiryDate from backend and into user object?
      if (userToken) {
        try {
          console.log("Try")
          await checkAuth();
          setIsLoading(false);
          navigate("/app");
        } catch (e) {
          console.log("e")
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          setIsLoading(false);
        }
      } else if (accessToken) {
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("expiryDate", expiryDate.toString());
        localStorage.setItem("accessToken", accessToken);
        const user = await getUser();
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoading(false);
        navigate("/app");
      }

      setIsLoading(false);
    })();
  }, []);

  const handleLogin = () => {
    console.log(LOGINURL);
    window.location.href = LOGINURL;
  };

  return (
    <>
      {isLoading ? (
        <SpinnerPage />
      ) : (
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
      )}
    </>
  );
};

export default Login;
