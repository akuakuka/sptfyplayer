import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { checkAuth } from "./API";
import { refreshAccessToken } from "./utils/authUtils";
import { getExpiryDate } from "./utils/dateUtils";

export const ProtectedRoute: React.FC = () => {
  // let auth = useAuth();
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const expiryDate = localStorage.getItem("expiryDate");
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  //const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (accessToken) {
        if(expiryDate && (+expiryDate < getExpiryDate())) {
          setAuthenticated(true)
          setReady(true)
        } else {
          await refreshAccessToken();
          setReady(false)
        }

      } else {
        setAuthenticated(false)
        setReady(true)
      }
    })();
  }, [accessToken]);

  if (ready) {
    if (!authenticated) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
    return <Outlet />;
  } return null;
};
