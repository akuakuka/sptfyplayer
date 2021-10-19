

import axios from "axios"
import qs from "qs";
import {
    spotifyArtist, userArtistsResponse, spotifyAlbum,
    albumResponse,
    spotifyUser,
    SpotifySearchResult,
    SpotifyRefreshTokenResponse
} from "../types/SpotifyTypes"

const API = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    timeout: 1000,
    
});

const market = "FI"

const albumType = "album"

export const getFollowedArtists = async (accesstoken:string): Promise<spotifyArtist[]> => {
    // console.log(API)
    // const data = { headers: { 'Authorization': `Bearer ${token}` }, Accept: "application/json", "Content-Type": "application/json" }
    try {

        const headers = { 'Authorization': `Bearer ${accesstoken}`, Accept: "application/json", "Content-Type": "application/json" }
        const response = await API.get("/me/following?type=artist&limit=50",{headers})
        //@ts-ignore
        console.log(response.data)
        //@ts-ignore
        return response.data;
    } catch (e) {
        console.log("error getFollowedArtists")
        console.log(e.response.status)
    }

}

// getArtist

export const getArtist = async (id: string,accesstoken:string): Promise<spotifyArtist> => {
    //https://api.spotify.com/v1/artists/{id}
    // console.log(API)
  //  const data = { headers: { 'Authorization': `Bearer ${token}` }, Accept: "application/json", "Content-Type": "application/json" }
    try {
        const headers = { 'Authorization': `Bearer ${accesstoken}`, Accept: "application/json", "Content-Type": "application/json" }
        const response = await API.get(`/artists/${id}`,{headers})
        //@ts-ignore
        console.log(response.data)
        //@ts-ignore
        return response.data;
    } catch (e) {
        console.log("error getArtist ")
        console.log(e.response.status)
    }

}


export const getArtistalbums = async (id: string,accesstoken:string): Promise<spotifyAlbum[]> => {


    // 05fG473iIaoy82BF1aGhL8
    try {
        const headers = { 'Authorization': `Bearer ${accesstoken}`, Accept: "application/json", "Content-Type": "application/json" }
        const response = await API.get(`/artists/${id}/albums?market=${market}&include_groups=album`,{headers})
        //@ts-ignore
        console.log(response.data)
        //@ts-ignore
        return response.data;
    } catch (e) {
        console.log("error getArtistalbums")
        console.log(e.response.status)
    }
}

export const getAlbum = async (id: string,accesstoken:string): Promise<spotifyAlbum> => {
    try {
        const headers = { 'Authorization': `Bearer ${accesstoken}`, Accept: "application/json", "Content-Type": "application/json" }
   
        const response = await API.get(`/albums/${id}`,{headers})
        //@ts-ignore
        console.log(response.data)
        //@ts-ignore
        return response.data;
    } catch (e) {
        console.log("error getAlbum")
        console.log(e.response.status)
    }
}



export const checkAuth = async (accesstoken:string): Promise<spotifyUser> => {
    try {
        const headers = { 'Authorization': `Bearer ${accesstoken}`, Accept: "application/json", "Content-Type": "application/json" }
        const response = await API.get(`/me/`,{headers})
        console.log("checkAuth")
        console.log(response.data)
        //@ts-ignore
        return response.data;
    } catch (e) {
        console.log("error checkAuth")
        console.log(e.response.status)
    }
}



export const searchSpotify = async (term:string,accesstoken:string): Promise<SpotifySearchResult> => {
    try {
        //https://api.spotify.com/v1/search

        const headers = { 'Authorization': `Bearer ${accesstoken}`, Accept: "application/json", "Content-Type": "application/json" }
        const response = await API.get(`/search?q=${term}&type=artist%2Calbum&market=${market}`,{headers})
        console.log("checkAuth")
        console.log(response.data)
        //@ts-ignore
        return response.data;
    } catch (e) {
        console.log("error checkAuth")
        console.log(e.response.status)
    }
}



export const refreshToken = async (
  refreshtoken: string
): Promise<SpotifyRefreshTokenResponse> => {
  const basic = `Basic ${Buffer.from(
    "5dd94bcf5c144e7f8c846b7185f0f296:d9aaa26409cf4ff592f445c24c8fc6c8"
  ).toString("base64")}`;
  const data = qs.stringify({
    grant_type: "refresh_token",
    refresh_token: refreshtoken,
  });

  var config = {
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: basic,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  //@ts-ignore
  const response = await axios(config);
  console.log(response.data);
  //@ts-ignore
  return response.data;
};

