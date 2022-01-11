import { Request, Response, Router } from "express";
import {
  changeSpotifyDevice,
  checkAuth,
  getAlbum,
  getAllAlbums,
  getArtist,
  getArtistalbums,
  getFollowedArtists,
  getSpotifyDevices,
  getSpotifyUser,
  searchSpotify,
} from "../services/spotifyService";

export const spotifyRouter = Router();

spotifyRouter.get("/artists", async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization || "";
    const resp = await getFollowedArtists(authorization, [], "");
    res.json(resp);
  } catch (e: any) {
    if (e.response.status) {
      res.sendStatus(e.response.status);
    } else {
      res.sendStatus(555);
    }
  }
});

spotifyRouter.get("/artist/:id", async (req: Request, res: Response) => {
  const authorization = req.headers.authorization || "";
  try {
    const resp = await getArtist(req.params.id, authorization);
    res.json(resp);
  } catch (e: any) {
    if (e.response.status) {
      res.sendStatus(e.response.status);
    } else {
      res.sendStatus(555);
    }
  }
});

spotifyRouter.get("/artist/:id/albums", async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization || "";
    const resp = await getArtistalbums(req.params.id, authorization);
    res.json(resp);
  } catch (e: any) {
    if (e.response.status) {
      res.sendStatus(e.response.status);
    } else {
      res.sendStatus(555);
    }
  }
});

spotifyRouter.get("/album/:id", async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization || "";
    const resp = await getAlbum(req.params.id, authorization);
    res.json(resp);
  } catch (e: any) {
    if (e.response.status) {
      res.sendStatus(e.response.status);
    } else {
      res.sendStatus(555);
    }
  }
});

spotifyRouter.get("/album", async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization || "";
    const resp = await getAllAlbums(authorization);
    res.json(resp);
  } catch (e: any) {
    if (e.response.status) {
      res.sendStatus(e.response.status);
    } else {
      res.sendStatus(555);
    }
  }
});

// TODO: Tarvitaanko async middleware=?
spotifyRouter.get("/check", async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization || "";
    const resp = await checkAuth(authorization);
    res.json(resp);
  } catch (e: any) {
    if (e.response.status) {
      res.sendStatus(e.response.status);
    } else {
      res.sendStatus(555);
    }
  }
});

spotifyRouter.get("/search/:term", async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization || "";
    const resp = await searchSpotify(req.params.term, authorization);
    res.json(resp);
  } catch (e: any) {
    if (e.response.status) {
      res.sendStatus(e.response.status);
    } else {
      res.sendStatus(555);
    }
  }
});

spotifyRouter.get("/me", async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization || "";
    const resp = await getSpotifyUser(authorization);
    res.json(resp);
  } catch (e: any) {
    if (e.response.status) {
      res.sendStatus(e.response.status);
    } else {
      res.sendStatus(555);
    }
  }
});

spotifyRouter.get("/devices", async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization || "";
    const resp = await getSpotifyDevices(authorization);
    res.json(resp);
  } catch (e: any) {
    if (e.response.status) {
      res.sendStatus(e.response.status);
    } else {
      res.sendStatus(555);
    }
  }
});

spotifyRouter.get("/devices/:id", async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization || "";
    const resp = await changeSpotifyDevice(authorization, req.params.id);
    res.json(resp);
  } catch (e: any) {
    if (e.response.status) {
      res.sendStatus(e.response.status);
    } else {
      res.sendStatus(555);
    }
  }
});
