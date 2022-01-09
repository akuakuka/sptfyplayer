import dotenv from "dotenv";
/* {
  path: __dirname + `/../.env.test`;
} */
const path =
  process.env.NODE_ENV === "production"
    ? __dirname + `/../../.env.production`
    : __dirname + `/../.env`;

dotenv.config({ path: path });

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

const {
  FRONTEND_URL,
  VITE_BACKEND_URL,
  SPOTIFY_CLIENTID,
  SPOTIFY_SECRET,
  NODE_ENV,
} = process.env;

const SPOTIFY_CALLBACK = `${VITE_BACKEND_URL}/api/auth/callback`;

/* console.log(
  FRONTEND_URL,
  VITE_BACKEND_URL,
  SPOTIFY_CLIENTID,
  SPOTIFY_SECRET,
  SPOTIFY_CALLBACK,
  NODE_ENV
); */

export {
  FRONTEND_URL,
  VITE_BACKEND_URL,
  SPOTIFY_CLIENTID,
  SPOTIFY_SECRET,
  SPOTIFY_CALLBACK,
  scopes,
  NODE_ENV,
};
