import axios from "axios";
import qs from "qs";
import { SPOTIFY_CLIENTID, SPOTIFY_SECRET } from "../config";
import {
  spotifyAlbum, spotifyArtist, SpotifySearchResult,
  SpotifyTokenResponse, spotifyUser, SpotifyUserResponse, userArtistsResponse
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
  /*   console.log("Artisteja pituus : ", [...items, ...data.artists.items].length); */
  return [...items, ...data.artists.items];
};

export const getArtist = async (
  id: string,
  accesstoken: string
): Promise<spotifyArtist> => {
  try {
    const headers = {
      Authorization: `${accesstoken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const { data } = await API.get<spotifyArtist>(`/artists/${id}`, {
      headers,
    });
    return data;
  } catch (e) {
    console.log("error getArtist ");
    console.log(e.response.status);
  }
};

export const getArtistalbums = async (
  id: string,
  accesstoken: string
): Promise<spotifyAlbum[]> => {
  // 05fG473iIaoy82BF1aGhL8
  try {
    const headers = {
      Authorization: `${accesstoken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const { data } = await API.get<spotifyAlbum[]>(
      `/artists/${id}/albums?market=${market}&include_groups=album,single&limit=50`,
      { headers }
    );
    return data;
  } catch (e) {
    console.log("error getArtistalbums");
    console.log(e.response.status);
  }
};

export const getAlbum = async (
  id: string,
  accesstoken: string
): Promise<spotifyAlbum> => {
  try {
    const headers = {
      Authorization: `${accesstoken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const { data } = await API.get<spotifyAlbum>(
      `/albums/${id}?market=${market}`,
      { headers }
    );

    return data;
  } catch (e) {
    console.log("error getAlbum");
    console.log(e.response.status);
  }
};
//TODO: Tyyppeihin myös error
export const checkAuth = async (accesstoken: string): Promise<spotifyUser> => {
  const headers = {
    Authorization: `${accesstoken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const { data } = await API.get<spotifyUser>(`/me/`, { headers });
  return data;
};

export const searchSpotify = async (
  term: string,
  accesstoken: string
): Promise<SpotifySearchResult> => {
  try {
    //https://api.spotify.com/v1/search

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
  } catch (e) {
    console.log("error checkAuth");
    console.log(e.response.status);
  }
};

export const refreshToken = async (
  refreshtoken: string
): Promise<SpotifyTokenResponse> => {
  console.log("SpotifyService refersh token");
  console.log(refreshtoken);
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

export const getSpotifyUser = async (accesstoken: string): Promise<SpotifyUserResponse> => {

  const headers = {
    Authorization: `${accesstoken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };


  const { data } = await API.get<SpotifyUserResponse>(`/me`, { headers });

  return data;


};


