import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { checkAuth } from "./API";
import { refreshAccessToken } from "./utils/authUtils";

export const ProtectedRoute: React.FC = () => {
  // let auth = useAuth();
  const location = useLocation();
  const user = localStorage.getItem("user");
  const [authenticated, setauthenticated] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      console.log({ authenticated });
      setReady(false);
      if (user) {
        console.log("USER LÖYTYY");
        try {
          await checkAuth();

          setauthenticated(true);
          setReady(true);
        } catch (e) {
          try {
            await refreshAccessToken();
            await checkAuth();
            setauthenticated(true);
            setReady(true);
          } catch (e) {
            setauthenticated(false);
            //  setUser("");
            navigate("/login");
          }
        }
      } else {
        console.log("USER EI LÖYDY");
        console.log("protectedroute else");
        navigate("/login");
      }
    })();
  }, []);

  if (ready) {
    if (!authenticated) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      console.log("##################################");
      console.log("NOT AUTHENTICATED");
      return <Navigate to="/login" state={{ from: location }} />;
    } else {
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      console.log("ELSEEEEEEEEEEEE");
    }
    return <Outlet />;
  } else {
    console.log("NULLLLLLLLLLLLLLLLLLLLLLLLLL");
    return null;
  }
};
