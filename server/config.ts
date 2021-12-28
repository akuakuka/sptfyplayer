import dotenv from "dotenv";

console.log(__dirname + '.env')
dotenv.config();

// Spotify-WEB-Player-SDK : "streaming", "user-read-email", "user-read-private"
const scopes = [
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
  "user-follow-read",
];
const NODE_ENV = "production"
const { SPOTIFY_CLIENTID, SPOTIFY_SECRET, SPOTIFY_CALLBACK_DEV, SPOTIFY_CALLBACK_PROD, FRONTEND_URL_DEV, FRONTEND_URL_PROD, BACKEND_URL_DEV } = process.env;
//@ts-ignore
const FRONTEND_URL = NODE_ENV !== "dev" ? FRONTEND_URL_PROD : FRONTEND_URL_DEV;
//@ts-ignore
const BASEURL = NODE_ENV !== "dev" ? FRONTEND_URL_PROD : BACKEND_URL_DEV;
//@ts-ignore
const SPOTIFY_CALLBACK = NODE_ENV !== "dev" ? SPOTIFY_CALLBACK_PROD : SPOTIFY_CALLBACK_DEV;
console.log({ SPOTIFY_CLIENTID })
console.log({ SPOTIFY_SECRET })
console.log({ SPOTIFY_CALLBACK })
console.log({ FRONTEND_URL })
console.log({ NODE_ENV })
console.log({ BASEURL })

export {
  SPOTIFY_CLIENTID,
  SPOTIFY_SECRET,
  SPOTIFY_CALLBACK,
  scopes,
  FRONTEND_URL,
  NODE_ENV,
  BASEURL
};
