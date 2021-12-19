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
const FRONTEND_URL = "http://localhost:3001";

const { SPOTIFY_CLIENTID, SPOTIFY_SECRET, SPOTIFY_CALLBACK } = process.env;
const PORT = 3000;
export {
  SPOTIFY_CLIENTID,
  SPOTIFY_SECRET,
  SPOTIFY_CALLBACK,
  scopes,
  FRONTEND_URL,
  PORT,
};
