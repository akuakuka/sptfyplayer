import axios from "axios";
import qs from "qs";
import { SPOTIFY_CLIENTID, SPOTIFY_SECRET } from "../config";
import {
  spotifyAlbum,
  spotifyArtist,
  spotifyArtistAlbum,
  spotifyArtistAlbumsReponse,
  SpotifyClientCredentialsFlowResponse,
  SpotifyDetailedAlbum,
  SpotifyDevice,
  SpotifyDeviceResponse,
  SpotifySearchResult,
  SpotifyTokenResponse,
  SpotifyUser,
  userArtistsResponse,
} from "../types/SpotifyTypes";
// TODO: refresh token to use instance with interceptor tricks?
const API = axios.create({
  baseURL: "https://api.spotify.com/v1",
});
const REFRESHTOKENAPI = axios.create({
  baseURL: "https://accounts.spotify.com/api",
});

const market = "FI";
// TODO: namespace?
export const getAllAlbums = async (
  accesstoken: string
): Promise<spotifyAlbum[]> => {
  const headers = {
    Authorization: `${accesstoken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const artists = await getFollowedArtists(accesstoken, [], "");

  let allAlbums: spotifyAlbum[] = [];
  //TODO: typings
  /*   artists.slice(4).forEach(async (a) => {
    const albums = await getArtistalbums(a.id, accesstoken);
    //@ts-ignore
    allAlbums = [...albums, albums];
  });
 */

  for (let index = 0; index < artists.length; index++) {
    console.log("foor", artists[index].name);
    const albums = await getArtistalbums(artists[index].id, accesstoken, false);
    //@ts-ignore
    allAlbums = [...allAlbums, ...albums];
    console.log(allAlbums.length);
  }

  return allAlbums;
};

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
  accesstoken: string,
  getSingles: boolean = true
): Promise<spotifyArtistAlbum[]> => {
  const headers = {
    Authorization: `${accesstoken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const url = getSingles
    ? `/artists/${id}/albums?market=${market}&include_groups=album,single&limit=50`
    : `/artists/${id}/albums?market=${market}&include_groups=album&limit=50`;
  const { data } = await API.get<spotifyArtistAlbumsReponse>(url, { headers });

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

  const { data } = await REFRESHTOKENAPI.post<SpotifyTokenResponse>(
    "/token",
    refreshTokenData,
    { headers }
  );

  return data;
};

export const getSpotifyUser = async (
  accesstoken: string
): Promise<SpotifyUser> => {
  const headers = {
    Authorization: `${accesstoken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const { data } = await API.get<SpotifyUser>(`/me`, { headers });

  return data;
};

export const getTokenForTesting =
  async (): Promise<SpotifyClientCredentialsFlowResponse> => {
    // Client Credentials Flow token -> No access to user data

    const url = "https://accounts.spotify.com/api/token";

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

    const { data } = await axios.post<SpotifyTokenResponse>(url, tokenData, {
      headers,
    });

    return data;
  };

export const getSpotifyDevices = async (
  accesstoken: string
): Promise<SpotifyDevice[]> => {
  const headers = {
    Authorization: `${accesstoken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const { data } = await API.get<SpotifyDeviceResponse>(`/me/player/devices`, {
    headers,
  });

  return data.devices;
};

export const changeSpotifyDevice = async (
  accesstoken: string,
  deviceid: string
) => {
  const headers = {
    Authorization: `${accesstoken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const putData = {
    device_ids: [deviceid],
  };
  //TODO: typings
  const { data } = await API.put(`/me/player/`, putData, { headers });

  return data;
};
//TODO: handle 429 timeout
API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
    // throw error;
  }
);

API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
    // throw error;
  }
);

REFRESHTOKENAPI.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
    //throw error;
  }
);

REFRESHTOKENAPI.interceptors.response.use(
  (response) => {
    const status = response.status;

    return response;
  },
  async (error) => {
    //  throw error;
    return Promise.reject(error);
  }
);
