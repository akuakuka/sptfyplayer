import axios from "axios";
import { Request, Response, Router } from "express";
import qs from "qs";
import {
  FRONTEND_URL,
  scopes,
  SPOTIFY_CALLBACK,
  SPOTIFY_CLIENTID,
  SPOTIFY_SECRET,
} from "../config";
import { refreshToken } from "../services/spotifyService";
import { SpotifyTokenResponse } from "../types/SpotifyTypes";

export const authRouter = Router();

authRouter.get("/login", (req: Request, res: Response) => {
  try {
    const scopesString = scopes.join(" ");
    const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENTID}&scope=${scopesString}&redirect_uri=${SPOTIFY_CALLBACK}&show_dialog=true`;
    res.json({ spotifyAuthUrl: url });
  } catch (e: any) {
    if (e.response.status) {
      res.sendStatus(e.response.status);
    } else {
      res.sendStatus(555);
    }
  }
});

authRouter.post(
  "/refresh/:refreshtoken",
  async (req: Request, res: Response) => {
    if (req.params.refreshtoken) {
      try {
        const resp = await refreshToken(req.params.refreshtoken);
        res.json(resp);
      } catch (e: any) {
        res.send(555);
      }
    } else {
      res.send(400);
    }
  }
);

authRouter.get("/callback", async (req: Request, res: Response) => {
  if (!req.query.code) res.sendStatus(400);

  const basic = `Basic ${Buffer.from(
    `${SPOTIFY_CLIENTID}:${SPOTIFY_SECRET}`
  ).toString("base64")}`;

  const code = req.query.code;

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

  res.redirect(
    `${FRONTEND_URL}/login?accessToken=${data.access_token}&refreshToken=${data.refresh_token}&expires_in=${data.expires_in}`
  );
});
