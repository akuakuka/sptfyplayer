import axios from "axios";
import { Router } from "express";
import qs from "qs";
import {
  FRONTEND_URL, scopes, SPOTIFY_CALLBACK,
  SPOTIFY_CLIENTID,
  SPOTIFY_SECRET
} from "../config";
import { asyncMiddleware } from "../middleware/asyncMiddleware";
import { refreshToken } from "../services/spotifyService";
import { SpotifyTokenResponse } from "../types/SpotifyTypes";

export const authRouter = Router();

authRouter.get("/login", (req, res) => {
  console.log("authRouter.get(login");
  // TODO: oauth state?
  const scopesString = scopes.join(" ");
  const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENTID}&scope=${scopesString}&redirect_uri=${SPOTIFY_CALLBACK}&show_dialog=true`;
  console.log(url)
  res.redirect(url);
});

authRouter.post("/refresh/:refreshtoken", asyncMiddleware(async (req, res) => {
  console.log("/refresh/:refreshtoken")
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
}))

authRouter.get("/logout", (req, res) => {
  res.redirect("/");
});

authRouter.get("/callback", asyncMiddleware(async (req, res) => {
  console.log(req.query)
  if (!req.query.code) res.json(403);

  const basic = `Basic ${Buffer.from(
    `${SPOTIFY_CLIENTID}:${SPOTIFY_SECRET}`
  ).toString("base64")}`;

  const code = req.query.code;
  // TODO: redirect_uri to .env
  const codeData = qs.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: SPOTIFY_CALLBACK,
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
  console.log(data)
  res.redirect(
    `${FRONTEND_URL}/login?accessToken=${data.access_token}&refreshToken=${data.refresh_token}&expires_in=${data.expires_in}}`
  );
}));