import axios from "axios";
import { useContext } from "react";
import {
  spotifyAlbum,
  spotifyArtist,
  SpotifySearchResult,
  spotifyUser,
} from "../../server/types/SpotifyTypes";
import { AuthContext } from "./hooks/useAuth";
import { isAccessTokenValid, refreshAccessToken } from "./utils/authUtils";



const SPOTIFYBASEURL = "https://api.spotify.com/v1";
//@ts-ignore
const BASEURL = import.meta.env.NODE_ENV === "development" ? `${import.meta.env.VITE_BACKEND_URL_DEV}/api` : `${import.meta.env.VITE_BACKEND_URL_PROD}/api`
console.log({ BASEURL })
const API = axios.create({});

const usr = localStorage.getItem("user");
console.log(usr);
//TODO: Headeri Bearer instanceen api

export const play = (token: string, deviceID: string, ids: string[]) => {
  API.put(
    `${SPOTIFYBASEURL}/me/player/play?device_id=${deviceID}`,
    JSON.stringify({ uris: ids })
  );
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
  console.log("CHECKAUTH")
  console.log("CHECKAUTH")
  console.log("CHECKAUTH")
  console.log("CHECKAUTH")
  console.log("CHECKAUTH")

  const resp = await API.get(`${BASEURL}/check/`);
  //@ts-ignore
  return resp;
};

export const refreshToken = async (token: string): Promise<spotifyUser> => {
  console.log("API.tsx");
  console.log({ token });
  const resp = await API.post(`${BASEURL}/auth/refresh/${token}`);
  //@ts-ignore
  return resp.data;
};

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user");
    if (token) {
      console.log("TOKEN löyty");
      //@ts-ignore
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  async (config) => {
    console.log(config.config.url);
    console.log(config.status);
    console.log(config.statusText);
    console.log(config.status);
    if (config.status === 400) {
      console.log("xxxxxxxxxxxxxxxx");
      console.log("xxxxxxxxxxxxxxxx");
      console.log("xxxxxxxxxxxxxxxx");
      console.log("xxxxxxxxxxxxxxxx");
      console.log("xxxxxxxxxxxxxxxx");
      console.log("xxxxxxxxxxxxxxxx");
      console.log("xxxxxxxxxxxxxxxx");
      if (!isAccessTokenValid()) {
        await refreshAccessToken();
        try {
          await checkAuth();
        } catch (e) {
          localStorage.removeItem("user");
          // TODO: Change path without react router?
          //  setUser("");
          // navigate("/login");
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
