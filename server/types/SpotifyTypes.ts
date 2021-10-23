interface externalUrl {
  spotify: string
}

interface followers {
  href: string | null
  total: number
}

export interface userArtistsResponse {
  artists: {
    items: spotifyArtist[];
    next: string;
    total: number;
    cursors: {
      after: string;
    };
    limit: number;
    href: string;
  };
}


export interface spotifyItem {
  id: string;
  name: string;
  type:string;
  images: spotifyImage[];
  href:string;
}


export interface spotifyArtist {
  external_urls: externalUrl;
  followers: followers;
  genres: string[];
  href: string;
  id: string;
  images: spotifyImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface spotifyImage {
  height: number;
  url: string;
  width: number;
}

//TODO: detailed type vs search tyhpe?
export interface spotifyAlbum {
  album_group: string;
  album_type: string;
  artists: spotifyArtist[];
  external_urls: externalUrl;
  href: string;
  id: string;
  images: spotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  total_tracks: number;
  tracks: spotifyTrack[];
}

export interface albumResponse {
  href: string;
  items: spotifyAlbum[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface spotifyUser {
  birthdate: string;
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: externalUrl;

  followers: followers;
  href: string;
  id: string;
  images: spotifyImage[];
  product: string;
  type: string;
  uri: string;
}

export interface UserData {
  user: spotifyUser;
  accessToken: string;
  refreshToken: string;
  expires_in: number;
}

export interface spotifyTrack {
  artists: spotifyArtist;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;

  external_urls: externalUrl;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  preview_url: string;
  track_number: string;
  type: string;
  uri: string;
}

export interface SpotifySearchResult {
  albums: {
    href: string;
    items: spotifyAlbum[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
  artists: {
    href: string;
    items: spotifyArtist[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
}


export interface SearchResultArtist {
  external_urls: externalUrl;
  followers: followers;
  genres: string[]
  href: string;
  id: string;
  images: spotifyImage[]
  name: string;
  popularity: number;
  type: string;
  uri: string;

}

export interface SearchResultAlbum {
  album_type: string;
  artists: spotifyArtist[]
  external_urls: externalUrl;
  href: string;
  id: string;
  images: spotifyImage[]
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface SpotifyTokenResponse {
  access_token: string;
  refresh_token: string;
token_type: string;
expires_in:number;
scope: string
}

/* {
    "access_token": "BQAGOH2UMRJlMUDeiO1d5ER59B-uFAFULD3WCWVzyTgE5NGqr1JKoM9bgEnVt-Jkodv60DnRtpHAeg58jeZH2V4lz5Ids5ox0xtLgH1jg41IyIqWsAosjZ5S136QJc2_MgbQ6HEF7212w7rZ50B8jjV3FhwRA3koFTyRTpYNL-rn5yRSZGXZwX778Xug1K7cugyPzAYzKxCQVASQh6rHZQKGp9EMweWeqZv7PILFcwlaSHSRZpmWgfdmKIkfBPbLY4UxW2Wdz_7ELo7Nb8EzVNUAuGElWA",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "playlist-read-private playlist-read-collaborative ugc-image-upload user-follow-read playlist-modify-private user-read-email user-read-private app-remote-control streaming user-follow-modify user-modify-playback-state user-library-read user-library-modify playlist-modify-public user-read-playback-state user-read-currently-playing user-read-recently-played user-read-playback-position user-top-read"
} */






/* {
  artists: {
    items: [
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object]
    ],
    next: 'https://api.spotify.com/v1/me/following?type=artist&after=19WQljDiwhjoGNc8CMbQgn&limit=50',
    total: 296,
    cursors: { after: '19WQljDiwhjoGNc8CMbQgn' },
    limit: 50,
    href: 'https://api.spotify.com/v1/me/following?type=artist&limit=50'
  }
} */