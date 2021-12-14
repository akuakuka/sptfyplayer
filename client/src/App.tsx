import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
} from "react-router-dom";
import ArtistView from "./components/ArtistView";
import { Box } from "@chakra-ui/layout";
import "./index.css";
import ArtistPage from "./components/ArtistPage";
import AlbumPage from "./components/AlbumPage";
import Footer from "./components/Footer";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { useCallback, useEffect, useState } from "react";
import Login from "./components/Login";
import { ProtectedRoute } from "./protectedRoute";
import Header from "./components/Header";
import SearchResultPage from "./components/SearchResultPage";
import { MainView } from "./components/MainView";

const App: React.FC = () => {
  const [volume, setVolume] = useState(0.5);
  const user = localStorage.getItem("user");

  const getAccesStoken = () => {
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
  // TODO: Protected route authenticationPAth proppi pois
  // TODO: React Router new version
  return (
    <Router>
      <WebPlaybackSDK
        deviceName="AlbumApp"
        getOAuthToken={getOAuthToken}
        connectOnInitialized={true}
        volume={volume}
      >
        {/*           <ProtectedRoute
            path="/app"
            authenticationPath="/login"
            exact
            component={MainView}
          /> */}
        <Switch>
          <ProtectedRoute exact path="/app" component={MainView} />
          <Route path={`/artist/:id`} exact component={ArtistPage} />
        </Switch>
        {/*           <ProtectedRoute path="/artist/:id" exact component={ArtistPage} />
          <ProtectedRoute path="/album/:id" exact component={AlbumPage} /> */}
      </WebPlaybackSDK>

      <Route path="/login" exact component={Login} />

      {/*   <Redirect to="/app" /> */}
    </Router>
  );
};

export default App;
