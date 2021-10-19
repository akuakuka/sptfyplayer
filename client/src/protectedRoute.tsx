import { useContext, useEffect, useState } from 'react'
import { Redirect, Route, RouteProps, useHistory } from 'react-router'
import { checkAuth } from './API';
import { AuthContext } from './hooks/useAuth';
/* import { useAuth } from "./hooks/useAuth"; */

export type ProtectedRouteProps = {
    authenticationPath: string
} & RouteProps

export default function ProtectedRoute({
    authenticationPath,
    ...routeProps
}: ProtectedRouteProps) {
   //  useState<spotifyArtist[]>([])
   
 
    const [authenticated, setauthenticated] = useState<boolean>(false)
    const { setAccessToken,getAccesStoken } = useContext(AuthContext);
    const history = useHistory()
        useEffect(() => {
            (async () => {
                try {
              
                    const resp = await checkAuth()
                    console.log(resp)
                    setauthenticated(true)
                   
                } catch(e) {
                    console.log(e)
                    setauthenticated(false)
                    setAccessToken("")
                    history.push("/login")
                }
               
            })();
        },[])

  useEffect(() => {
    console.log({authenticated})
  },[authenticated])


    if (authenticated) {
        return <Route {...routeProps} />
    } else {
        return <Redirect to={{ pathname: authenticationPath }} />
    }
 
}