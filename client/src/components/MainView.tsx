import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { usePlaybackState } from "react-spotify-web-playback-sdk";
import AlbumPage from "./AlbumPage";
import ArtistPage from "./ArtistPage";
import ArtistView from "./ArtistView";
import Footer from "./Footer";
import Header from "./Header";
import SearchResultPage from "./SearchResultPage";

/* import { useAuth } from "./hooks/useAuth"; */
export const debug: React.FC = () => {
  useEffect(() => {
    console.log("DEBUG");
  }, []);
  return <div>debug</div>;
};
export const MainView: React.FC = () => {
  const [albumArtBg, setAlbumArtBg] = useState<boolean>(false);
  const handleVolume = (val: number) => console.log(val);
  let { path, url } = useRouteMatch();
  const playbackState = usePlaybackState();
  // TODO: Custom hook?
  const getAlbumArtFromPLaybackState = (
    playbackState: Spotify.PlaybackState
  ): string => {
    if (playbackState) {
      return playbackState.track_window.current_track.album.images[0].url;
    }
    /*     console.log(playbackState);
    if (playbackState.track_window.current_track.album) {
     
    } */
    return "";
  };

  useEffect(() => {
    console.log("#########################");
    console.log(path);
  }, [albumArtBg]);

  const handleAlbumArtToggle = () => {
    setAlbumArtBg(!albumArtBg);
  };
  return (
    //@ts-ignore
    <Box
      backgroundImage={
        //@ts-ignore
        albumArtBg ? getAlbumArtFromPLaybackState(playbackState) : ""
      }
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      backgroundAttachment={"fixed"}
      backgroundPosition={"center"}
      height={"100vh"}
      width={"100vw"}
      overflow={"hidden"}
    >
      {/*       <Link to="/app/artist"> Linkki </Link>
      <Link to="/app/artist"> Linkki </Link>
      <Link to={`${url}/artist`}>Rendering with React</Link> */}
      <Header handleAlbumArtToggle={handleAlbumArtToggle} albumArtBg />
      <Switch>
        <Route exact path={path}>
          <ArtistView />
        </Route>

        <Route path={`${path}/artist/:id`} exact component={ArtistPage} />
        <Route path={`${path}/album/:id`} exact component={AlbumPage} />
      </Switch>
      {/*   <Switch>
      <Route exact path="/artist" >
      <ArtistView/>
      </Route>
      <Route path="/search/:term" exact component={SearchResultPage} />
      <Route path="/artist/:id" exact component={ArtistPage} />
      <Route path="/album/:id" exact component={AlbumPage} />
      </Switch> */}
      <Footer handleVolume={handleVolume} volume={0.1} />
    </Box>
  );
};
