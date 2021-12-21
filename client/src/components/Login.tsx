import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
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
    // TODO: Loginurl to .env
   //  https://sptfyplayer.herokuapp.com
   // 






   const BASEURL = import.meta.env.NODE_ENV === "development" ? import.meta.env.VITE_BACKEND_URL_DEV : import.meta.env.VITE_BACKEND_URL_PROD


console.log(import.meta.env.MODE) //: {string} the mode the app is running in.

console.log(import.meta.env.BASE_URL) //: {string} the base url the app is being served from. This is determined by the base config option.
console.log(import.meta.env.VITE_BACKEND_URL_DEV)
console.log(import.meta.env.VITE_BACKEND_URL_PROD)
   const loginURL = process.env.NODE_ENV === "development" ? `${import.meta.env.VITE_BACKEND_URL_DEV}/api/auth/login` : `${import.meta.env.VITE_BACKEND_URL_PROD}/api/auth/login`;
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
