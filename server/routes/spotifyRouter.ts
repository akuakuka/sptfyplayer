import { Request, Response, Router } from "express";
import { asyncMiddleware } from "../middleware/asyncMiddleware";
import {
  changeSpotifyDevice,
  checkAuth,
  getAlbum,
  getArtist,
  getArtistalbums,
  getFollowedArtists,
  getSpotifyDevices,
  getSpotifyUser,
  searchSpotify,
} from "../services/spotifyService";

export const spotifyRouter = Router();

spotifyRouter.get(
  "/artists",
  asyncMiddleware(async (req: Request, res: Response) => {
    const authorization = req.headers.authorization || "";
    const resp = await getFollowedArtists(authorization, [], "");
    res.json(resp);
  })
);

spotifyRouter.get(
  "/artist/:id",
  asyncMiddleware(async (req: Request, res: Response) => {
    const authorization = req.headers.authorization || "";
    const resp = await getArtist(req.params.id, authorization);
    res.json(resp);
  })
);

spotifyRouter.get(
  "/artist/:id/albums",
  asyncMiddleware(async (req: Request, res: Response) => {
    const authorization = req.headers.authorization || "";
    const resp = await getArtistalbums(req.params.id, authorization);
    res.json(resp);
  })
);

spotifyRouter.get(
  "/album/:id",
  asyncMiddleware(async (req: Request, res: Response) => {
    const authorization = req.headers.authorization || "";
    const resp = await getAlbum(req.params.id, authorization);
    res.json(resp);
  })
);
// TODO: Tarvitaanko async middleware=?
spotifyRouter.get("/check", async (req: Request, res: Response) => {
  const authorization = req.headers.authorization || "";
  const resp = await checkAuth(authorization);
  res.json(resp);
});

spotifyRouter.get(
  "/search/:term",
  asyncMiddleware(async (req: Request, res: Response) => {
    const authorization = req.headers.authorization || "";
    const resp = await searchSpotify(req.params.term, authorization);
    res.json(resp);
  })
);

spotifyRouter.get(
  "/me",
  asyncMiddleware(async (req: Request, res: Response) => {
    const authorization = req.headers.authorization || "";
    const resp = await getSpotifyUser(authorization);
    res.json(resp);
  })
);

spotifyRouter.get(
  "/devices",
  asyncMiddleware(async (req: Request, res: Response) => {
    const authorization = req.headers.authorization || "";
    const resp = await getSpotifyDevices(authorization);
    res.json(resp);
  })
);

spotifyRouter.get(
  "/devices/:id",
  asyncMiddleware(async (req: Request, res: Response) => {
    const authorization = req.headers.authorization || "";
    const resp = await changeSpotifyDevice(authorization, req.params.id);
    res.json(resp);
  })
);
