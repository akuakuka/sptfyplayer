import {Router} from "express"
import {getFollowedArtists,getArtist, getArtistalbums, getAlbum,searchSpotify} from "../services/spotifyService"
export const spotifyRouter =  Router()

spotifyRouter.get("/artists", async (req,res) => {
    console.log("spotifyRouter")
    //@ts-ignore
    const resp = await getFollowedArtists(req.user.accessToken);
    res.json(resp)
})

spotifyRouter.get("/artist/:id", async (req,res) => {
    console.log("spotifyRouter")
     //@ts-ignore
    const resp = await getArtist(req.params.id,req.user.accessToken);
    res.json(resp)
})


spotifyRouter.get("/artist/:id/albums", async (req,res) => {
    console.log("spotifyRouter")
     //@ts-ignore
    const resp = await getArtistalbums(req.params.id,req.user.accessToken);
    res.json(resp)
})

spotifyRouter.get("/album/:id", async (req,res) => {
    console.log("spotifyRouter")
     //@ts-ignore
    const resp = await getAlbum(req.params.id,req.user.accessToken);
    res.json(resp)
})

spotifyRouter.get('/check', (req, res) => {
    //@ts-ignore
  
    res.json(req.user);
  });



  spotifyRouter.get('/search/:term', async (req, res) => {
          //@ts-ignore
    const resp = await searchSpotify(req.params.term, req.user.accessToken);

    res.json(resp);
  });