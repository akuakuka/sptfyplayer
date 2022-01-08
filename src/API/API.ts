import {
  spotifyAlbum,
  spotifyArtist,
  SpotifyDevice,
  SpotifySearchResult,
  SpotifyTokenResponse,
  SpotifyUser,
} from "@typings/SpotifyTypes";
import axios from "axios";
import { refreshAccessToken } from "../utils/authUtils";
import { BASEURL, REFRESHURL } from "./../config";
// TODO: project paths for typigns

const SPOTIFYBASEURL = "https://api.spotify.com/v1";

export const API = axios.create({ baseURL: BASEURL });

const REFRESHTOKENAPI = axios.create({
  baseURL: `${REFRESHURL}`,
});

export const play = (token: string, deviceID: string, ids: string[]): void => {
  const data = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axios.put(
    `${SPOTIFYBASEURL}/me/player/play?device_id=${deviceID}`,
    JSON.stringify({ uris: ids }),
    data
  );
};
export const refreshToken = async (
  token: string
): Promise<SpotifyTokenResponse> => {
  const { data } = await REFRESHTOKENAPI.post<SpotifyTokenResponse>(
    `/${token}`
  );
  return data;
};

export const getArtists = async (): Promise<spotifyArtist[]> => {
  const { data } = await API.get<spotifyArtist[]>(`/artists`);
  return data;
};

export const getArtist = async (id: string): Promise<spotifyArtist> => {
  const { data } = await API.get<spotifyArtist>(`/artist/${id}`);
  return data;
};

export const getArtistAlbums = async (id: string): Promise<spotifyAlbum[]> => {
  const { data } = await API.get<spotifyAlbum[]>(`/artist/${id}/albums`);
  return data;
};

export const getAlbum = async (id: string): Promise<spotifyAlbum> => {
  const { data } = await API.get<spotifyAlbum>(`/album/${id}`);
  return data;
};

export const search = async (term: string): Promise<SpotifySearchResult> => {
  const { data } = await API.get<SpotifySearchResult>(`/search/${term}`);
  return data;
};

export const checkAuth = async (): Promise<SpotifyUser> => {
  const { data } = await API.get<SpotifyUser>(`/check/`);
  return data;
};

export const getUser = async (): Promise<SpotifyUser> => {
  const { data } = await API.get<SpotifyUser>(`/me`);
  return data;
};

export const getDevices = async (): Promise<SpotifyDevice[]> => {
  const { data } = await API.get<SpotifyDevice[]>(`/devices`);
  return data;
};

export const changeDevice = async (
  deviceid: string
): Promise<SpotifyDevice[]> => {
  const { data } = await API.get<SpotifyDevice[]>(`/devices/${deviceid}`);
  return data;
};

API.interceptors.response.use(
  (response) => {
    console.log("interceptors response 200");
    const status = response.status;
    console.log({ status });
    return response;
  },
  async (error) => {
    console.log("interceptors response 400");
    console.log(error);
    console.log(Object.keys(error));
    console.log(error.config);
    console.log(error.response);

    const originalRequest = error.config;
    const status = error.response.status;
    console.log(status);
    console.log({ status });
    if ((status === 401 || status === 403) && !originalRequest._retry) {
      console.log("400 error. refreshing");
      originalRequest._retry = true;
      await refreshAccessToken();
      return API(originalRequest);
    }
    console.log("promise rejecting");
    return Promise.reject(error);
  }
);

API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

REFRESHTOKENAPI.interceptors.request.use(
  (config) => {
    console.log("REFRESHTOKENAPI ");
    return config;
  },
  (error) => Promise.reject(error)
);

// TODO : handle 400 if trying to access wrong album or artist id
