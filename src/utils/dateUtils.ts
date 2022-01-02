import {
  spotifyAlbum,
  spotifyImage,
  spotifyTrack,
} from "../../server/types/SpotifyTypes";

export const getAlbumReleaseYearFromDate = (
  date: string,
  precision: string
): string => {
  /*     release_date
        release_date_precision
     */
  if (precision === "day") {
    return date.split("-")[0];
  }
  if (precision === "year") {
    return date;
  }
  return "unknown";
};

export const getSmallestImage = (images: spotifyImage[]): string => {
  const sorted = images.sort((first, second) => {
    const firstpixels = first.height * first.width;
    const secondpixels = second.height * second.width;
    if (firstpixels > secondpixels) {
      return 1;
    }
    if (firstpixels < secondpixels) {
      return -1;
    }
    return 0;
  });

  return sorted[0].url;
};

export const getExpiryDate = (): number => {
  const expiryDate = new Date(
    new Date().setHours(new Date().getHours() + 1)
  ).valueOf();
  return expiryDate;
};

export const getDateNow = (): number => {
  const expiryDate = new Date(
    new Date().setHours(new Date().getHours())
  ).valueOf();
  return expiryDate;
};

// TODO : Utils to right files
export const getTrackUrisFromAlbum = (tracks: spotifyTrack[]) => {
  return tracks.map((t) => t.uri);
};

export const getIDFromSpotifyUri = (uri: string) => {
  return uri.split(":")[2];
};

//TODO: Hours?
export const getMinutesAndSecondsFromMs = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (+seconds < 10 ? "0" : "") + seconds;
};

export const getAlbumDuration = (alb: spotifyAlbum): string => {
  let duration = 0;
  alb.tracks.items.forEach((t) => (duration = t.duration_ms + duration));

  return getMinutesAndSecondsFromMs(duration);
};
