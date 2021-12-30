import axios from "axios";
import qs from "qs";
import { SPOTIFY_CLIENTID, SPOTIFY_SECRET } from "../config";
import {
  spotifyArtist, spotifyArtistAlbum, spotifyArtistAlbumsReponse, SpotifyClientCredentialsFlowResponse, SpotifyDetailedAlbum, SpotifyDevice, SpotifyDeviceResponse, SpotifySearchResult,
  SpotifyTokenResponse, SpotifyUser, userArtistsResponse
} from "../types/SpotifyTypes";

const API = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

const market = "FI";

export const getFollowedArtists = async (
  accesstoken: string,
  items: spotifyArtist[],
  next: string
): Promise<spotifyArtist[]> => {
  let url = "/me/following?type=artist&limit=50";
  if (next) url = next;

  const headers = {
    Authorization: `${accesstoken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const { data } = await API.get<userArtistsResponse>(url, {
    headers,
  });

  if (data.artists.next) {
    return await getFollowedArtists(
      accesstoken,
      [...items, ...data.artists.items],
      data.artists.next
    );
  }
  return [...items, ...data.artists.items];
};

export const getArtist = async (
  id: string,
  accesstoken: string
): Promise<spotifyArtist> => {

  const headers = {
    Authorization: `${accesstoken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const { data } = await API.get<spotifyArtist>(`/artists/${id}`, {
    headers,
  });
  return data;

};

export const getArtistalbums = async (
  id: string,
  accesstoken: string
): Promise<spotifyArtistAlbum[]> => {
  const headers = {
    Authorization: `${accesstoken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const { data } = await API.get<spotifyArtistAlbumsReponse>(
    `/artists/${id}/albums?market=${market}&include_groups=album,single&limit=50`,
    { headers }
  );

  return data.items;
};

export const getAlbum = async (
  id: string,
  accesstoken: string
): Promise<SpotifyDetailedAlbum> => {

  const headers = {
    Authorization: `${accesstoken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const { data } = await API.get<SpotifyDetailedAlbum>(
    `/albums/${id}?market=${market}`,
    { headers }
  );
  return data;
};

export const checkAuth = async (accesstoken: string): Promise<SpotifyUser> => {
  const headers = {
    Authorization: `${accesstoken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const { data } = await API.get<SpotifyUser>(`/me/`, { headers });
  return data;
};

export const searchSpotify = async (
  term: string,
  accesstoken: string
): Promise<SpotifySearchResult> => {


  const headers = {
    Authorization: `${accesstoken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const { data } = await API.get<SpotifySearchResult>(
    `/search?q=${term}&type=artist%2Calbum&market=${market}`,
    { headers }
  );

  return data;

};

export const refreshToken = async (
  refreshtoken: string
): Promise<SpotifyTokenResponse> => {
  const basic = `Basic ${Buffer.from(
    `${SPOTIFY_CLIENTID}:${SPOTIFY_SECRET}`
  ).toString("base64")}`;
  const refreshTokenData = qs.stringify({
    grant_type: "refresh_token",
    refresh_token: refreshtoken,
  });

  const headers = {
    Authorization: basic,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const { data } = await axios.post<SpotifyTokenResponse>(
    "https://accounts.spotify.com/api/token",
    refreshTokenData,
    { headers }
  );
  return data;
};

export const getSpotifyUser = async (accesstoken: string): Promise<SpotifyUser> => {

  const headers = {
    Authorization: `${accesstoken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const { data } = await API.get<SpotifyUser>(`/me`, { headers });

  return data;
};

export const getTokenForTesting = async (): Promise<SpotifyClientCredentialsFlowResponse> => {
  // Client Credentials Flow token -> No access to user data

  const url = 'https://accounts.spotify.com/api/token';

  const basic = `Basic ${Buffer.from(
    `${SPOTIFY_CLIENTID}:${SPOTIFY_SECRET}`
  ).toString("base64")}`;

  const tokenData = qs.stringify({
    grant_type: "client_credentials",
  });

  const headers = {
    Authorization: basic,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const { data } = await axios.post<SpotifyTokenResponse>(url,
    tokenData,
    { headers }
  );
  console.log(data)
  return data;
};

export const getSpotifyDevices = async (accesstoken: string): Promise<SpotifyDevice[]> => {

  const headers = {
    Authorization: `${accesstoken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const { data } = await API.get<SpotifyDeviceResponse>(`/me/player/devices`, { headers });

  return data.devices;

};

export const changeSpotifyDevice = async (accesstoken: string, deviceid: string) => {

  const headers = {
    Authorization: `${accesstoken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const putData = {
    device_ids: [deviceid]
  }

  const { data } = await API.put(`/me/player/`, putData, { headers });
  console.log(data)
  return data;


};



API.interceptors.request.use((config) => {

  console.log(config.url)
  return config;
}, (error) => {
  return Promise.reject(error);
});
