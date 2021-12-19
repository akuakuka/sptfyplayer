import { Router } from "express";
import axios from "axios";
import qs from "qs";
import {
  SPOTIFY_CALLBACK,
  SPOTIFY_CLIENTID,
  SPOTIFY_SECRET,
  scopes,
  FRONTEND_URL,
} from "../config";
import { SpotifyTokenResponse } from "../types/SpotifyTypes";
import { refreshToken } from "../services/spotifyService";

export const authRouter = Router();

authRouter.get("/login", (req, res) => {
  // TODO: oauth state?
  // var state = generateRandomString(16);
  const scopesString = scopes.join(" ");
  const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENTID}&scope=${scopesString}&redirect_uri=${SPOTIFY_CALLBACK}&show_dialog=true`;
  res.redirect(url);
});

authRouter.post("/refresh/:refreshtoken", async (req, res) => {
  //@ts-ignore
  console.log(req.params.refreshtoken);
  //@ts-ignore
  if (req.params.refreshtoken) {
    try {
      //@ts-ignore
      const resp = await refreshToken(req.params.refreshtoken);
      console.log(resp);
      res.json(resp);
    } catch (e) {
      console.log(e);
      console.log("authRouter refreshtoken error");
      res.send(503);
    }
  } else {
    res.send(403);
  }
});

authRouter.get("/logout", (req, res) => {
  //@ts-ignore
  req.logout();
  res.redirect("/");
});

authRouter.get("/callback", async (req, res) => {
  if (!req.query.code) res.json(403);

  const basic = `Basic ${Buffer.from(
    `${SPOTIFY_CLIENTID}:${SPOTIFY_SECRET}`
  ).toString("base64")}`;

  const code = req.query.code;
  // TODO: redirect_uri to .env
  const codeData = qs.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:3000/api/auth/callback",
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
