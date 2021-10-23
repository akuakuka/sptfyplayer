import { Box } from "@chakra-ui/layout";
import { useEffect } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import ProtectedRoute from "../protectedRoute";
import AlbumPage from "./AlbumPage";
import ArtistPage from "./ArtistPage";
import ArtistView from "./ArtistView";
import Footer from "./Footer";
import Header from "./Header";
import SearchResultPage from "./SearchResultPage";

/* import { useAuth } from "./hooks/useAuth"; */

export const MainView: React.FC = () => {
  const handleVolume = (val: number) => console.log(val);
  let { path, url } = useRouteMatch();

  
  useEffect(() => {
    console.log("maiunview");
  }, []);
  return (
    <>
{/*       <Link to="/app/artist"> Linkki </Link>
      <Link to="/app/artist"> Linkki </Link>
      <Link to={`${url}/artist`}>Rendering with React</Link> */}

    {/*   <Header /> */}
    <ArtistView/>
    <Switch>

    <Route path="/artist/:id" exact component={ArtistPage} />
    </Switch>
    
  {/*   <Switch>
      <Route exact path="/artist" >
      <ArtistView/>
      </Route>
      <Route path="/search/:term" exact component={SearchResultPage} />
      <Route path="/artist/:id" exact component={ArtistPage} />
      <Route path="/album/:id" exact component={AlbumPage} />
      </Switch> */}
    {/*   <Footer handleVolume={handleVolume} volume={0.1} /> */}
    </>
  );
};
