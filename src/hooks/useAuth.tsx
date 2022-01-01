import React, { createContext, useState } from "react";
import { SpotifyUser } from "../../server/types/SpotifyTypes";

interface defaultAuth {
  user: SpotifyUser;
  accessToken: string;
  refreshToken: string;
  expiryDate: string;
  setUser: (a: SpotifyUser) => void;
  setAccessToken: (a: string) => void;
  setRefreshToken: (a: string) => void;
  setExpiryDate: (a: string) => void;
}

export const AuthContext = createContext<defaultAuth>({} as defaultAuth);

const AuthProvider = (props) => {
  const [user, setUser] = useState<SpotifyUser>(Object);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        expiryDate,
        setUser,
        setAccessToken,
        setRefreshToken,
        setExpiryDate,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
