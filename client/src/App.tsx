import { Route, Routes } from "react-router-dom";
import ArtistView from "./components/ArtistView";
import { Box } from "@chakra-ui/layout";
import "./index.css";
import ArtistPage from "./components/ArtistPage";
import AlbumPage from "./components/AlbumPage";
import Footer from "./components/Footer";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Login from "./components/Login";
import { ProtectedRoute } from "./protectedRoute";
import Header from "./components/Header";
import SearchResultPage from "./components/SearchResultPage";
import { MainView } from "./components/MainView";
import Layout from "./components/Layout";
import { AnimatePresence } from "framer-motion";

const App: React.FC = () => {
  const [volume, setVolume] = useState(0.5);
  const user = localStorage.getItem("user");

  const getAccesStoken = () => {
    // TODO : REFreshTokenFlow
    console.log("getAccesStoken");
    return user;
  };

  useEffect(() => {
    console.log("App User");
    console.log(user);
  }, [user]);

  const getOAuthToken = useCallback(
    (callback) => {
      const act = getAccesStoken();
      callback(act);
    },
    [user]
  );

  const handleVolume = (val: number) => {
    console.log(val);
    setVolume(val);
  };

  // TODO: React Router new version
  // TODO: Volume contextiin?
  const UserContext = createContext({
    userName: "",
    setUserName: () => {},
  });

  return (
    <WebPlaybackSDK
      deviceName="sptfyplayer"
      getOAuthToken={getOAuthToken}
      connectOnInitialized={true}
      volume={volume}
    >
      <AnimatePresence exitBeforeEnter>
        <Routes>
          <Route
            element={<Layout handleVolume={handleVolume} volume={volume} />}
          >
            <Route path="/app" element={<ArtistView />} />
            <Route path={`/app/artist/:id`} element={<ArtistPage />} />
            <Route path={`/app/album/:id`} element={<AlbumPage />} />
            <Route path={`/app/search/:term`} element={<SearchResultPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ArtistView />} />
        </Routes>
      </AnimatePresence>
    </WebPlaybackSDK>
  );
};

export default App;
