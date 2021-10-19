
import { Route, BrowserRouter as Router, useHistory } from 'react-router-dom'
import ArtistView from './components/ArtistView'
import { Box } from '@chakra-ui/layout'
import './index.css'
import ArtistPage from './components/ArtistPage'
import AlbumPage from './components/AlbumPage'
import Footer from './components/Footer'
import { WebPlaybackSDK } from 'react-spotify-web-playback-sdk'
import { useCallback, useEffect, useState } from 'react'
import Login from './components/Login'
import ProtectedRoute from "./protectedRoute"
import { AuthContext } from './hooks/useAuth'
import { Spinner } from '@chakra-ui/react'
import Header from './components/Header'
import SearchResultPage from './components/SearchResultPage'

const App: React.FC = () => {
  const [accessToken, setAccesstoken] = useState("");
  const [visible, setVisible] = useState(true);
  const [volume, setVolume] = useState(0.5)

  const setAccessToken = (token: string) => setAccesstoken(token)
  const getAccesStoken = () => accessToken;

  const history = useHistory()

  const getOAuthToken = useCallback(callback => {
    const act = getAccesStoken();
    console.log({ act })
    callback(act);
  }, [accessToken]);

/*   useEffect(() => {

    console.log("accessToken")
    console.log(accessToken)
    if(accessToken.length < 2 ) {
      history.push("/login")
    }
  }, [accessToken])
 */
  const handleVolume = (val: number) => {
    console.log(val)
    setVolume(val);
  }
  // TODO: Protected route authenticationPAth proppi pois
  return (
    <AuthContext.Provider
      value={{ setAccessToken, getAccesStoken }}
    >
      <Router>
          <Box>
          {accessToken.length > 2 &&        <Header/>}
          
            <WebPlaybackSDK
              deviceName="AlbumApp"
              getOAuthToken={getOAuthToken}
              connectOnInitialized={true}
              volume={volume}>
              <ProtectedRoute path="/" authenticationPath="/login" exact component={ArtistView} />
              <ProtectedRoute path="/search/:term" authenticationPath="/login" exact component={SearchResultPage} />
              <ProtectedRoute path="/artist/:id" authenticationPath="/login" exact component={ArtistPage} />
              <ProtectedRoute path="/album/:id" authenticationPath="/login" exact component={AlbumPage} />
              {accessToken.length > 2 &&       <Footer handleVolume={handleVolume} volume={volume} />}
             
            </WebPlaybackSDK>
          </Box>
        <Route path="/login" exact component={Login} />
      </Router>
    </AuthContext.Provider>

  )
}

export default App
