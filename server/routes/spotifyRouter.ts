import { Request, Response, Router } from "express";
import { asyncMiddleware } from "../middleware/asyncMiddleware";
import {
  checkAuth,
  getAlbum,
  getArtist,
  getArtistalbums,
  getFollowedArtists,
  getSpotifyUser,
  searchSpotify
} from "../services/spotifyService";

export const spotifyRouter = Router();

spotifyRouter.get(
  "/artists",
  asyncMiddleware(async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    try {
      const resp = await getFollowedArtists(authorization, [], null);
      res.json(resp);
    } catch (e) {
      res.sendStatus(e.response.status);
    }
  })
);

spotifyRouter.get(
  "/artist/:id",
  asyncMiddleware(async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const resp = await getArtist(req.params.id, authorization);
    res.json(resp);
  })
);

spotifyRouter.get(
  "/artist/:id/albums",
  asyncMiddleware(async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const resp = await getArtistalbums(req.params.id, authorization);
    res.json(resp);
  })
);

spotifyRouter.get(
  "/album/:id",
  asyncMiddleware(async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const resp = await getAlbum(req.params.id, authorization);
    res.json(resp);
  })
);
// TODO: Tarvitaanko async middleware=?
spotifyRouter.get("/check", async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  const resp = await checkAuth(authorization);
  res.json(resp);
});

spotifyRouter.get(
  "/search/:term",
  asyncMiddleware(async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const resp = await searchSpotify(req.params.term, authorization);
    res.json(resp);
  })
);

spotifyRouter.get(
  "/me",
  asyncMiddleware(async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const resp = await getSpotifyUser(authorization);
    res.json(resp);
  })
);
