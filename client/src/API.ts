import axios from "axios";
import {
  spotifyAlbum,
  spotifyArtist,
  SpotifySearchResult,
  spotifyUser
} from "../../server/types/SpotifyTypes";
import { isAccessTokenValid } from "./utils/authUtils";
import { getExpiryDate } from "./utils/dateUtils";


const SPOTIFYBASEURL = "https://api.spotify.com/v1";
//@ts-ignore
const BASEURL = import.meta.env.MODE === "development" ? `${import.meta.env.VITE_BACKEND_URL_DEV}/api/spotify` : `${import.meta.env.VITE_BACKEND_URL_PROD}/api/spotify`
//@ts-ignore
const REFRESHURL = import.meta.env.MODE === "development" ? `${import.meta.env.VITE_BACKEND_URL_DEV}/api/auth/refresh` : `${import.meta.env.VITE_BACKEND_URL_PROD}/api/auth/refresh`
console.log({ BASEURL })
const API = axios.create({});

const usr = localStorage.getItem("user");
console.log(usr);
//TODO: Headeri Bearer instanceen api

export const play = (token: string, deviceID: string, ids: string[]) => {
  //  config.headers.Authorization = `Bearer ${token}`;
  const data = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  axios.put(`${SPOTIFYBASEURL}/me/player/play?device_id=${deviceID}`, JSON.stringify({ uris: ids }), data);
};

export const getArtists = async (): Promise<spotifyArtist[]> => {
  console.log("TRY");
  const response = await API.get<spotifyArtist[]>(`${BASEURL}/artists`);
  console.log(response);
  //@ts-ignore
  return response;
};

export const getArtist = async (id: string): Promise<spotifyArtist> => {
  const resp = await API.get(`${BASEURL}/artist/${id}`);
  //@ts-ignore
  return resp.data;
};

export const getArtistAlbums = async (id: string): Promise<spotifyAlbum[]> => {
  const resp = await API.get(`${BASEURL}/artist/${id}/albums`);
  //@ts-ignore
  return resp.data.items;
};

export const getAlbum = async (id: string): Promise<spotifyAlbum> => {
  const resp = await API.get(`${BASEURL}/album/${id}`);
  //@ts-ignore
  return resp.data;
};

export const search = async (term: string): Promise<SpotifySearchResult> => {
  const resp = await API.get(`${BASEURL}/search/${term}`);
  //@ts-ignore
  return resp.data;
};

export const checkAuth = async (): Promise<spotifyUser> => {

  const resp = await API.get(`${BASEURL}/check/`);
  //@ts-ignore
  return resp;
};

export const refreshToken = async (token: string): Promise<spotifyUser> => {
  console.log("API.tsx");
  console.log({ token });
  const resp = await axios.post(`${REFRESHURL}/${token}`);
  //@ts-ignore
  return resp.data;
};

/* API.interceptors.request.use(async (config) => {
  // Check access if token expired

}) */


API.interceptors.request.use(async (config) => {
  if (!isAccessTokenValid()) {
    const refreshtoken = localStorage.getItem("refreshToken") || "";
    if (refreshtoken) {

      const response = await refreshToken(refreshtoken);

      //@ts-ignore 
      localStorage.setItem("user", response.access_token);


      const expiryDate = getExpiryDate()
      localStorage.setItem("expiryDate", expiryDate.toString());

    } else {
      console.error("NO REFRESHTOKENrefreshtoken")
    }
  } return config;
}, (error) => {
  return Promise.reject(error);
});


API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user");

    if (token) {
      console.log("TOKEN löyty");
      //@ts-ignore
      config.headers.Authorization = `Bearer ${token}`;
      //@ts-ignore


    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  async (config) => {
    const responseStatus = config.status;
    console.log({ responseStatus });

    return config;
  },
  (error) => Promise.reject(error)
);


