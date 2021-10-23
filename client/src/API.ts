import axios from "axios";
import { useContext } from "react";
import { spotifyAlbum, spotifyArtist, SpotifySearchResult, spotifyUser } from "../../server/types/SpotifyTypes";
import { AuthContext } from "./hooks/useAuth";
// TODO: nää proxyyn?

const BASEURL = "http://localhost:3000/api"
const SPOTIFYBASEURL = "https://api.spotify.com/v1"

const API = axios.create({});

const usr = localStorage.getItem("user");
console.log(usr)
//TODO: Headeri Bearer instanceen api

export const play = (token: string, deviceID: string, ids: string[]) => {
  API.put(`${SPOTIFYBASEURL}/me/player/play?device_id=${deviceID}`,JSON.stringify({ uris: ids }))
};

export const getArtists = async (): Promise<spotifyArtist[]> => {
  const response = await API.get<spotifyArtist[]>(`${BASEURL}/artists`);
  console.log(response)
  //@ts-ignore
  return response
}

export const getArtist = async (id: string): Promise<spotifyArtist> => {
  const resp = await API.get(`${BASEURL}/artist/${id}`);
  //@ts-ignore
  return resp.data
}

export const getArtistAlbums = async (id: string): Promise<spotifyAlbum[]> => {
  const resp = await API.get(`${BASEURL}/artist/${id}/albums`);
  //@ts-ignore
  return resp.data.items
}

export const getAlbum = async (id: string): Promise<spotifyAlbum> => {
  const resp = await API.get(`${BASEURL}/album/${id}`)
  //@ts-ignore
  return resp.data
}

export const search = async (term: string): Promise<SpotifySearchResult> => {
  const resp = await API.get(`${BASEURL}/search/${term}`)
  //@ts-ignore
  return resp.data
}

export const checkAuth = async (): Promise<spotifyUser> => {
  const resp = await API.get(`${BASEURL}/check/`,)
  //@ts-ignore
  return resp
}

export const refreshToken = async (): Promise<spotifyUser> => {
  const resp = await API.post(`http://localhost:3000/refresh/`)
  //@ts-ignore
  return resp.data
}


/* API.interceptors.request.use(config => {
  if (config.url?.startsWith("https://api.spotify.com")) {
    config.withCredentials = false;
  }
  return config;
}); */

API.interceptors.request.use(config => {
    const token = localStorage.getItem("user");
    if (token) {
      console.log("TOKEN löyty")
      //@ts-ignore
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

API.interceptors.response.use(config => {
  console.log(config.config.url)
  console.log("3333333333333333")
  console.log(config.status)
  console.log(config.statusText)
},
error => Promise.reject(error)
);




/* 
{
    "error": {
        "status": 401,
        "message": "The access token expired"
    }
} */


API.interceptors.response.use(config => {
/*   //console.log("STATUS : " , error.response.status)
  console.log("intercece")
//  if (error.config && error.response && error.response.status === 401) {
    console.log("ERROR ->  REFRESHING")
    return refreshToken().then((token) => {
      console.log("refreshToken interceptor")
      console.log(token)
      console.log(config.headers)
   //    error.config.headers.xxxx <= set the token
      return axios.request(error.config);
    });
//  }
  return Promise.reject(error); */

  return config;
});



/* 
axios.interceptors.response.use(null, (error) => {
  console.log("STATUS : " , error.response.status)
//  if (error.config && error.response && error.response.status === 401) {
    console.log("ERROR ->  REFRESHING")
    return refreshToken().then((token) => {
      console.log("refreshToken interceptor")
      console.log(token)
      console.log(error.config.headers)
   //    error.config.headers.xxxx <= set the token
      return axios.request(error.config);
    });
//  }
  return Promise.reject(error);
});
 */


/* API.interceptors.response.use(null, (error) => {
  if (error.config && error.response && error.response.status === 401) {
    console.log("error.config && error.response && error.response.status === 401 ");

    return updateToken().then((token) => {
      error.config.headers.xxxx <= set the token
      return axios.request(config);
    });
  }

  return Promise.reject(error);
}); */