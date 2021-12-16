import { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation, Navigate } from "react-router-dom";
import { checkAuth } from "./API";

export const ProtectedRoute: React.FC = () => {
  // let auth = useAuth();
  let location = useLocation();
  const user = localStorage.getItem("user");
  const [authenticated, setauthenticated] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
      console.log({ authenticated });
      setReady(false);
      if (user) {
        console.log("USER LÖYTYY");
        try {
          const resp = await checkAuth();
          console.log(resp);
          setauthenticated(true);
          setReady(true);
        } catch (e) {
          console.log(e);
          console.log("ERROR");
          setauthenticated(false);
          //  setUser("");
          navigate("/login");
        }
      } else {
        console.log("USER EI LÖYDY");
        console.log("protectedroute else");
        navigate("/login");
      }
    })();
  }, []);

  useEffect(() => {
    console.log("READY :: ", ready);
    console.log("authenticated :: ", authenticated);
  }, [ready, authenticated]);
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
    console.log(
      "<Outlet /><Outlet /><Outlet /><Outlet /><Outlet /><Outlet /><Outlet /><Outlet /><Outlet /><Outlet /><Outlet /><Outlet /><Outlet /><Outlet /><Outlet /><Outlet /><Outlet /><Outlet />"
    );
    return <Outlet />;
  } else {
    console.log("NULLLLLLLLLLLLLLLLLLLLLLLLLL");
    return null;
  }
};
