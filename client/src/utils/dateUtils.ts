import { spotifyImage } from "../../../server/types/SpotifyTypes"

export const getAlbumReleaseYearFromDate = (date: string, precision: string): string => {
    /*     release_date
        release_date_precision
     */
    if (precision === "day") {
        return date.split("-")[0]
    }
    if (precision === "year") {
        return date
    }
    return "unknown"
}

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

    return sorted[0].url
}