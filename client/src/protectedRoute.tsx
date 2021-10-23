import { Spinner } from "@chakra-ui/spinner";
import { useContext, useEffect, useState } from "react";
import { Redirect, Route, RouteProps, useHistory } from "react-router";
import { checkAuth } from "./API";

/* import { useAuth } from "./hooks/useAuth"; */

export type ProtectedRouteProps = {
} & RouteProps;

export const ProtectedRoute = ({
  ...routeProps
}: ProtectedRouteProps) => {
    const authenticationPath = "/login";
  const [authenticated, setauthenticated] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const user = localStorage.getItem("user")

  const history = useHistory();

  useEffect(() => {
    (async () => {
        console.log("Protected route useEffect", routeProps.path)
        console.log({authenticated})
        setReady(false)
        if(user) {
            console.log("USER LÖYTYY")
            try {
                const resp = await checkAuth();
                console.log(resp)
                setauthenticated(true);
                setReady(true)
              } catch (e) {
                  console.log(e)
                console.log("ERROR");
                setauthenticated(false);
              //  setUser("");
                history.push("/login");
              }
        } else {
            console.log("USER EI LÖYDY")
            console.log("protectedroute else")
            history.push("/login");
        }
     
    })();
  }, []);

if(ready) {
    if (authenticated) {
        return <Route {...routeProps} />;
      } else {
        return <Redirect to={{ pathname: authenticationPath }} />;
      }
} else return <Spinner/>

}
