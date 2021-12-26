interface SpotifyCopyrights {
  text: string;
  type: string;
}

interface externalUrl {
  spotify: string;
}

interface followers {
  href: string | null;
  total: number;
}

interface external_urls {
  spotify: string | null;
  total: number;
}

interface external_ids {
  [key: string]: any;
}

export interface spotifyImage {
  height: number;
  url: string;
  width: number;
}

interface spotifySimpleAlbumArtist {
  external_urls: externalUrl;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface spotifyArtistAlbum {
  album_group: string;
  album_type: string;
  artists: spotifySimpleAlbumArtist[];
  external_urls: externalUrl;
  href: string;
  id: string;
  images: spotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface spotifyArtistAlbumsReponse {
  href: string;
  items: spotifyArtistAlbum[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
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
  type: string;
  images: spotifyImage[];
  href: string;
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
  tracks: {
    href: string;
    items: spotifyTrack[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
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

export interface UserData {
  user: spotifyAlbum;
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
  genres: string[];
  href: string;
  id: string;
  images: spotifyImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface SearchResultAlbum {
  album_type: string;
  artists: spotifyArtist[];
  external_urls: externalUrl;
  href: string;
  id: string;
  images: spotifyImage[];
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
  expires_in: number;
  scope: string;
}

export interface SpotifyUser {
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
export interface SpotifyDetailedTrack {
  album: {
    album_type: string;
    artists: spotifySimpleAlbumArtist[];
    external_urls: external_urls;
    href: string;
    id: string;
    images: spotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  artists: spotifySimpleAlbumArtist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: external_ids;
  external_urls: external_urls;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface SpotifyDetailedAlbum {
  album_type: string;
  artists: spotifySimpleAlbumArtist[];
  copyrights: SpotifyCopyrights[];
  external_ids: external_ids;
  external_urls: external_urls;
  genres: [];
  href: string;
  id: string;
  images: spotifyImage[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  tracks: {
    href: string;
    items: spotifyTrack[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
  type: string;
  uri: string;
}

export interface SpotifyClientCredentialsFlowResponse {
  access_token: string;
  token_type: string;
  expires_in: number
}

export interface SpotifyDevice {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
}

export interface SpotifyDeviceResponse {
  devices: SpotifyDevice[]
}