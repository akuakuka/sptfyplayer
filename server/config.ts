import dotenv from "dotenv";
const path =
  process.env.NODE_ENV === "production"
    ? `../.env.${process.env.NODE_ENV}`
    : `../.env`;
console.log({ path });
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
  SPOTIFY_CALLBACK,
  NODE_ENV,
} = process.env;

console.log("CONFIGGI");
console.log(
  FRONTEND_URL,
  VITE_BACKEND_URL,
  SPOTIFY_CLIENTID,
  SPOTIFY_SECRET,
  SPOTIFY_CALLBACK,
  NODE_ENV
);

export {
  FRONTEND_URL,
  VITE_BACKEND_URL,
  SPOTIFY_CLIENTID,
  SPOTIFY_SECRET,
  SPOTIFY_CALLBACK,
  scopes,
  NODE_ENV,
};
