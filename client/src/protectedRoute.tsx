import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute: React.FC = () => {
  // let auth = useAuth();
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  //const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (accessToken) {
        setAuthenticated(true)
        setReady(true)
      } else {
        setAuthenticated(false)
        setReady(true)
      }
    })();
  }, []);

  if (ready) {
    if (!authenticated) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
    return <Outlet />;
  } return null;
};
