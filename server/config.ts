import dotenv from "dotenv";
dotenv.config();
// TODO: Vain tarvittavat scopet
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
// TODO: to .env


const { SPOTIFY_CLIENTID, SPOTIFY_SECRET, SPOTIFY_CALLBACK_DEV, SPOTIFY_CALLBACK_PROD, FRONTEND_URL_DEV, FRONTEND_URL_PROD, NODE_ENV, BACKEND_URL_DEV } = process.env;
const FRONTEND_URL = NODE_ENV !== "dev" ? FRONTEND_URL_PROD : FRONTEND_URL_DEV;
const BASEURL = NODE_ENV !== "dev" ? FRONTEND_URL_PROD : BACKEND_URL_DEV;
const SPOTIFY_CALLBACK = NODE_ENV !== "dev" ? SPOTIFY_CALLBACK_PROD : SPOTIFY_CALLBACK_DEV;

console.log({ NODE_ENV })
console.log({ SPOTIFY_CLIENTID })
console.log({ SPOTIFY_SECRET })
console.log({ SPOTIFY_CALLBACK })
console.log({ FRONTEND_URL })
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
