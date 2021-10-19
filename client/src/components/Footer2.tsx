import { useContext, useEffect } from "react";
import { usePlayerDevice } from "react-spotify-web-playback-sdk";
import { AuthContext } from "../hooks/useAuth";
//import { QueContext } from "../hooks/usePlayQue";

export const Footer2 = () => {
    console.log("footer2")
    const device = usePlayerDevice();
    const [userData, setUserData] = useContext(AuthContext);
    const SPOTIFY_URI = "spotify:track:7xGfFoTpQ2E7fRF5lN10tr";
/*     const [que, setQue] = useContext(QueContext);
    useEffect(() => {
        console.log(que)
    },[que]) */
    console.log("DEVICE NULL ? ")
    console.log(device === null)
    const playCarlyRaeJepsen = () => {
      if (device === null) return;
      console.log("playCarlyRaeJepsen")
      console.log(userData.accessToken)
      fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${device.device_id}`,
        {
          method: "PUT",
          body: JSON.stringify({ uris: [SPOTIFY_URI] }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.accessToken}`,
          },
        },
      );
    };
  
    if (device === null) return null;
  
    return <button onClick={playCarlyRaeJepsen}>Play asd</button>;
  }; 
  