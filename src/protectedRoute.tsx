import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { SpinnerPage } from "./components/SpinnerPage";

export const ProtectedRoute: React.FC = () => {
  // let auth = useAuth();
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const expiryDate = localStorage.getItem("expiryDate");
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [refreshReady, setRefreshReady] = useState<boolean>(false);
  //const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      /*      console.log("ProtectedRoute useEffect");
      if (accessToken) {
        console.log("ProtectedRoute accessToken found");
        if (isAccessTokenValid()) {
          console.log("ProtectedRoute accessToken valid");
          setAuthenticated(true);
          setReady(true);
        } else {
          console.log("ProtectedRoute accessToken expired");
          await refreshAccessToken();
          setRefreshReady(false);
        }
      } else {
        setAuthenticated(false);
        setReady(true);
      } */

      if (accessToken) {
        setAuthenticated(true);
        setReady(true);
      } else {
        setAuthenticated(false);
        setReady(true);
      }
    })();
  }, []);

  if (ready) {
    if (!authenticated) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
    return <Outlet />;
  }
  return <SpinnerPage />;
};
