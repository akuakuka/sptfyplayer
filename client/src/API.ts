import axios from "axios";
import {
  spotifyAlbum,
  spotifyArtist,
  SpotifySearchResult,
  SpotifyTokenResponse,
  SpotifyUser
} from "../../server/types/SpotifyTypes";
import { BASEURL, REFRESHURL } from "./config";
import { isAccessTokenValid } from "./utils/authUtils";
import { getExpiryDate } from "./utils/dateUtils";


const SPOTIFYBASEURL = "https://api.spotify.com/v1";

const API = axios.create({});

//TODO: Headeri Bearer instanceen api

export const play = (token: string, deviceID: string, ids: string[]): void => {
  const data = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  axios.put(`${SPOTIFYBASEURL}/me/player/play?device_id=${deviceID}`, JSON.stringify({ uris: ids }), data);
};

export const getArtists = async (): Promise<spotifyArtist[]> => {
  const { data } = await API.get<spotifyArtist[]>(`${BASEURL}/artists`);
  return data;
};

export const getArtist = async (id: string): Promise<spotifyArtist> => {
  const { data } = await API.get<spotifyArtist>(`${BASEURL}/artist/${id}`);
  return data;
};

export const getArtistAlbums = async (id: string): Promise<spotifyAlbum[]> => {
  const { data } = await API.get<spotifyAlbum[]>(`${BASEURL}/artist/${id}/albums`);
  return data;
};

export const getAlbum = async (id: string): Promise<spotifyAlbum> => {
  const { data } = await API.get<spotifyAlbum>(`${BASEURL}/album/${id}`);
  return data
};

export const search = async (term: string): Promise<SpotifySearchResult> => {
  const { data } = await API.get<SpotifySearchResult>(`${BASEURL}/search/${term}`);
  return data;
};

export const checkAuth = async (): Promise<SpotifyUser> => {
  const { data } = await API.get<SpotifyUser>(`${BASEURL}/check/`);
  return data;
};

export const refreshToken = async (token: string): Promise<SpotifyTokenResponse> => {
  const { data } = await axios.post<SpotifyTokenResponse>(`${REFRESHURL}/${token}`);
  return data
};

export const getUser = async (): Promise<SpotifyUser> => {
  const { data } = await API.get<SpotifyUser>(`${BASEURL}/me`);
  return data
};

API.interceptors.request.use(async (config) => {
  if (!isAccessTokenValid()) {
    const refreshtoken = localStorage.getItem("refreshToken") || "";
    if (refreshtoken) {

      const response = await refreshToken(refreshtoken);
      localStorage.setItem("accessToken", response.access_token);
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
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      console.log("TOKEN löyty");
      if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
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


