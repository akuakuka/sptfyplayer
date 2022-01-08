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
import { asyncMiddleware } from "../middleware/asyncMiddleware";
import { refreshToken } from "../services/spotifyService";
import { SpotifyTokenResponse } from "../types/SpotifyTypes";

export const authRouter = Router();

authRouter.get("/login", (req: Request, res: Response) => {
  console.log("authRouter /login");
  const scopesString = scopes.join(" ");
  const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENTID}&scope=${scopesString}&redirect_uri=${SPOTIFY_CALLBACK}&show_dialog=true`;
  res.json({ spotifyAuthUrl: url });
});

authRouter.post(
  "/refresh/:refreshtoken",
  asyncMiddleware(async (req: Request, res: Response) => {
    console.log("/refresh/:refreshtoken");
    if (req.params.refreshtoken) {
      console.log("/refresh/:refreshtoken IFIFIFIF");
      try {
        console.log("/refresh/:refreshtoken TRYYYYYYYYYYYYYYYYYYYYYY");
        const resp = await refreshToken(req.params.refreshtoken);
        res.json(resp);
      } catch (e) {
        console.log("/refresh/:refreshtoken EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        console.log(e);
        res.send(500);
      }

      /*       res.sendStatus(400);

      res.send(403); */
    } else {
      res.send(400);
    }
  })
);

authRouter.get(
  "/callback",
  asyncMiddleware(async (req: Request, res: Response) => {
    console.log("/callback");
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
    console.log("callback");
    console.log(
      `${FRONTEND_URL}/login?accessToken=${data.access_token}&refreshToken=${data.refresh_token}&expires_in=${data.expires_in}`
    );
    res.redirect(
      `${FRONTEND_URL}/login?accessToken=${data.access_token}&refreshToken=${data.refresh_token}&expires_in=${data.expires_in}`
    );
  })
);
