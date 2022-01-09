import {
  spotifyAlbum,
  spotifyArtist,
  SpotifyDevice,
  SpotifyLoginURLResponse,
  SpotifySearchResult,
  SpotifyTokenResponse,
  SpotifyUser,
} from "@typings/SpotifyTypes";
import axios from "axios";
import { AUTHURL, BASEURL } from "./../config";
// TODO: project paths for typigns

const SPOTIFYBASEURL = "https://api.spotify.com/v1";

export const API = axios.create({ baseURL: BASEURL });

const AUTHAPI = axios.create({
  baseURL: `${AUTHURL}`,
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

export const getLoginURL = async (): Promise<SpotifyLoginURLResponse> => {
  /*   /api/ahtu / login;
  LOGINURL; */
  const { data } = await AUTHAPI.get<SpotifyLoginURLResponse>(`/login`);
  return data;
};

export const refreshToken = async (
  token: string
): Promise<SpotifyTokenResponse> => {
  const { data } = await AUTHAPI.post<SpotifyTokenResponse>(
    `/refresh/${token}`
  );
  return data;
};

export const getAllAlbums = async (): Promise<spotifyAlbum[]> => {
  const { data } = await API.get<spotifyAlbum[]>(`/album`);
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
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }
    const status = error.response.status;
    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshtoken = localStorage.getItem("refreshToken");
      if (refreshtoken) {
        const response = await refreshToken(refreshtoken);
        if (response.access_token) {
          const expiryDate = new Date(
            new Date().setHours(new Date().getHours() + 1)
          ).valueOf();
          localStorage.setItem("expiryDate", expiryDate.toString());
          localStorage.setItem("accessToken", response.access_token);
        }
      }

      return API(originalRequest);
    }

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

AUTHAPI.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);
