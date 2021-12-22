import { Router } from "express";
import { checkBearerWithSpotify } from "../middleware/authMiddleware";
import {
  checkAuth, getAlbum, getArtist,
  getArtistalbums, getFollowedArtists, searchSpotify
} from "../services/spotifyService";
export const spotifyRouter = Router();

spotifyRouter.get("/artists", checkBearerWithSpotify, async (req, res) => {
  const { authorization } = req.headers;
  /* 
  console.log(req.headers.authorization);
  console.log("spotifyRouter"); */
  //@ts-ignore
  try {
    const resp = await getFollowedArtists(authorization, [], null);
    res.json(resp);
  } catch (e) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(e.response.status);
    console.log(e.response.statusText);
    res.sendStatus(e.response.status);
  }
});

spotifyRouter.get("/artist/:id", checkBearerWithSpotify, async (req, res) => {
  const { authorization } = req.headers;
  /*   
  console.log({ authorization }); */
  //@ts-ignore
  const resp = await getArtist(req.params.id, authorization);
  res.json(resp);
});

spotifyRouter.get(
  "/artist/:id/albums",
  checkBearerWithSpotify,
  async (req, res) => {
    const { authorization } = req.headers;
    /*   
  console.log({ authorization }); */
    //@ts-ignore
    const resp = await getArtistalbums(req.params.id, authorization);
    res.json(resp);
  }
);

spotifyRouter.get("/album/:id", checkBearerWithSpotify, async (req, res) => {
  const { authorization } = req.headers;
  /*   console.log({ authorization }); */
  //@ts-ignore
  const resp = await getAlbum(req.params.id, authorization);
  res.json(resp);
});

spotifyRouter.get("/check", async (req, res) => {
  const { authorization } = req.headers;
  const resp = await checkAuth(authorization);

  res.json(resp);
});

spotifyRouter.get("/search/:term", checkBearerWithSpotify, async (req, res) => {
  const { authorization } = req.headers;
  /*   const { authorization } = req.headers;
  console.log({ authorization }); */
  const resp = await searchSpotify(req.params.term, authorization);
  res.json(resp);
});
