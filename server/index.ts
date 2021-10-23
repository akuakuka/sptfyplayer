import express from "express";
import cors from "cors";
import { spotifyRouter } from "./routes/spotifyRouter";
import { SpotifyTokenResponse } from "./types/SpotifyTypes";
import { refreshToken } from "./services/spotifyService";
import { SPOTIFY_CALLBACK, SPOTIFY_CLIENTID, SPOTIFY_SECRET } from "./config";
import axios from "axios";
import qs from "qs";

const app = express();
const port = 3000;
const authCallbackPath = "/callback";
const FRONTEND_URL = "http://localhost:3001";

const scopes = [
  "ugc-image-upload",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-read-collaborative",
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-library-modify",
  "user-library-read",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-top-read",
  "app-remote-control",
  "streaming",
  "user-follow-modify",
  "user-follow-read",
];

app.use(cors({ credentials: true, origin: "http://localhost:3001" }));

app.get("/logout", (req, res) => {
  //@ts-ignore
  req.logout();
  res.redirect("/");
});

const ensureAuthenticated = async (req, res, next) => {
  /* console.log("ensureAuthenticated")
  try {
   // console.log(req.user)
   if(req.user) {
  
     await checkAuth(req.user.accessToken);
     return next();
   } else {

    res.sendStatus(401)
   }
  } catch (e) {
    console.log(e)
   res.sendStatus(401)
  } */
  next();
};

app.post("/refresh", async (req, res) => {
  //@ts-ignore
  if (req.user.refreshToken) {
    //@ts-ignore
    const resp = await refreshToken(req.user.refreshToken);
    console.log(resp);
    res.json(resp);
  } else {
    res.send(403);
  }
});

app.use("/api", ensureAuthenticated, spotifyRouter);

app.get("/auth/spotify", (req, res) => {
  // var state = generateRandomString(16);
  const scopesString = scopes.join(" ");
  var scope = "user-read-private user-read-email";
  const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENTID}&scope=${scopesString}&redirect_uri=${SPOTIFY_CALLBACK}&show_dialog=true`;
  res.redirect(url);
});

const ensureBearer = (req, res, next) => {
  const { X_expires, X_refresh_token } = req.headers;
  if (!X_expires || !X_refresh_token) {
    res.send(403);
  }
  const epoch = Math.round(Date.now() / 1000);
  if (X_expires < epoch) {
    //DO REFRESH
    console.log("Refreshing token");
  } else {
    next();
  }
};

app.get(authCallbackPath, async (req, res) => {
  if (!req.query.code) res.json(403);

  const basic = `Basic ${Buffer.from(
    `${SPOTIFY_CLIENTID}:${SPOTIFY_SECRET}`
  ).toString("base64")}`;
  
  const code = req.query.code;

  const codeData = qs.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:3000/callback",
  });

  const headers = {
    Authorization: `${basic}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const { data } = await axios.post<SpotifyTokenResponse>(
    "https://accounts.spotify.com/api/token",
    codeData,
    { headers }
  );
  
  res.redirect(
    `${FRONTEND_URL}/login?accessToken=${data.access_token}&refreshToken=${data.refresh_token}&expires_in=${data.expires_in}}`
  );
});

//@ts-ignore
app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
