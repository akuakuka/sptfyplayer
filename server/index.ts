import express from "express";
import cors from "cors";
import { spotifyRouter } from "./routes/spotifyRouter";
import { authRouter } from "./routes/authRouter";
import { SpotifyTokenResponse } from "./types/SpotifyTypes";
import { refreshToken } from "./services/spotifyService";
import { SPOTIFY_CALLBACK, SPOTIFY_CLIENTID, SPOTIFY_SECRET } from "./config";
import axios from "axios";
import qs from "qs";

const app = express();
const port = 3000;
const authCallbackPath = "/callback";
const FRONTEND_URL = "http://localhost:3001";

app.use(cors({ credentials: true, origin: "http://localhost:3001" }));

app.use("/api", spotifyRouter);
app.use("/api/auth/", authRouter);

//@ts-ignore
app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
