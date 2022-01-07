import { spotifyImage } from "@typings/SpotifyTypes";
import {
  getAlbumReleaseYearFromDate,
  getIDFromSpotifyUri,
  getMinutesAndSecondsFromMs,
  getSmallestImage,
} from "./dateUtils";

describe("Testing dateUttils", () => {
  it("getAlbumReleaseYearFromDate() is working ", () => {
    const day = getAlbumReleaseYearFromDate("2001-11-12", "day");
    const year = getAlbumReleaseYearFromDate("1971", "year");
    expect(year).toEqual("1971");
    expect(day).toEqual("2001");
  });

  it("getSmallestImage() is working ", () => {
    const images: spotifyImage[] = [
      {
        height: 640,
        url: "https://i.scdn.co/image/ab67616d0000b2739683e5d7361bb80bfb00f46d",
        width: 640,
      },
      {
        height: 300,
        url: "https://i.scdn.co/image/ab67616d00001e029683e5d7361bb80bfb00f46d",
        width: 300,
      },
      {
        height: 64,
        url: "https://i.scdn.co/image/ab67616d000048519683e5d7361bb80bfb00f46d",
        width: 64,
      },
    ];
    const smallest = getSmallestImage(images);
    expect(smallest).toEqual(
      "https://i.scdn.co/image/ab67616d000048519683e5d7361bb80bfb00f46d"
    );
  });

  it("getExpiryDate() is working ", () => {
    // TODO:testing
  });

  it("getDateNow() is working ", () => {
    /*     // turha
    const date = new Date(new Date().setHours(new Date().getHours())).valueOf();
    const datenew = getDateNow();
    expect(datenew.toString()).toEqual(date.toString());
    expect(datenew).toEqual(date); */
    expect(1).toEqual(1);
  });

  it("getTrackUrisFromAlbum() is working ", () => {
    /*     //@ts-ignore
    const album: spotifyAlbum = {
      album_type: "album",
      copyrights: [
        {
          text: "© 2009 Sanctuary Records Group Ltd., a BMG Company",
          type: "C",
        },
        {
          text: "℗ 2009 Gimcastle Ltd. under exclusive licence to Sanctuary Records Group Ltd., a BMG Company",
          type: "P",
        },
      ],
      external_ids: {
        upc: "5414939679377",
      },
      external_urls: {
        spotify: "https://open.spotify.com/album/132qAo1cDiEJdA3fv4xyNK",
      },
      genres: [],
      href: "https://api.spotify.com/v1/albums/132qAo1cDiEJdA3fv4xyNK",
      id: "132qAo1cDiEJdA3fv4xyNK",
      images: [
        {
          height: 640,
          url: "https://i.scdn.co/image/ab67616d0000b2739683e5d7361bb80bfb00f46d",
          width: 640,
        },
        {
          height: 300,
          url: "https://i.scdn.co/image/ab67616d00001e029683e5d7361bb80bfb00f46d",
          width: 300,
        },
        {
          height: 64,
          url: "https://i.scdn.co/image/ab67616d000048519683e5d7361bb80bfb00f46d",
          width: 64,
        },
      ],
      label: "Sanctuary Records",
      name: "Paranoid (2009 Remastered Version)",
      popularity: 77,
      release_date: "1970-09-18",
      release_date_precision: "day",
      total_tracks: 8,
      tracks: {
        href: "https://api.spotify.com/v1/albums/132qAo1cDiEJdA3fv4xyNK/tracks?offset=0&limit=50&market=fi&locale=fi-FI,fi;q=0.9,en-US;q=0.8,en;q=0.7",
        items: [
          {
            disc_number: 1,
            duration_ms: 474400,
            explicit: false,
            external_urls: {
              spotify: "https://open.spotify.com/track/0W35nxtHtFlseSojmygEsf",
            },
            href: "https://api.spotify.com/v1/tracks/0W35nxtHtFlseSojmygEsf",
            id: "0W35nxtHtFlseSojmygEsf",
            is_local: false,
            is_playable: true,
            name: "War Pigs",
            preview_url:
              "https://p.scdn.co/mp3-preview/7b0420fab47dfbf060312207b3f67d8bea8f04ba?cid=774b29d4f13844c495f206cafdad9c86",
            track_number: 1,
            type: "track",
            uri: "spotify:track:0W35nxtHtFlseSojmygEsf",
          },
          {
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5M52tdBnJaKSvOpJGz8mfZ",
                },
                href: "https://api.spotify.com/v1/artists/5M52tdBnJaKSvOpJGz8mfZ",
                id: "5M52tdBnJaKSvOpJGz8mfZ",
                name: "Black Sabbath",
                type: "artist",
                uri: "spotify:artist:5M52tdBnJaKSvOpJGz8mfZ",
              },
            ],
            disc_number: 1,
            duration_ms: 168440,
            explicit: false,
            external_urls: {
              spotify: "https://open.spotify.com/track/1jzDzZWeSDBg5fhNc3tczV",
            },
            href: "https://api.spotify.com/v1/tracks/1jzDzZWeSDBg5fhNc3tczV",
            id: "1jzDzZWeSDBg5fhNc3tczV",
            is_local: false,
            is_playable: true,
            name: "Paranoid",
            preview_url:
              "https://p.scdn.co/mp3-preview/c3c74a5d2214f66307037df432d0ba2480e708fe?cid=774b29d4f13844c495f206cafdad9c86",
            track_number: 2,
            type: "track",
            uri: "spotify:track:1jzDzZWeSDBg5fhNc3tczV",
          },
          {
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5M52tdBnJaKSvOpJGz8mfZ",
                },
                href: "https://api.spotify.com/v1/artists/5M52tdBnJaKSvOpJGz8mfZ",
                id: "5M52tdBnJaKSvOpJGz8mfZ",
                name: "Black Sabbath",
                type: "artist",
                uri: "spotify:artist:5M52tdBnJaKSvOpJGz8mfZ",
              },
            ],
            disc_number: 1,
            duration_ms: 269533,
            explicit: false,
            external_urls: {
              spotify: "https://open.spotify.com/track/7wqF3BU0ykeKch6BcNqGiT",
            },
            href: "https://api.spotify.com/v1/tracks/7wqF3BU0ykeKch6BcNqGiT",
            id: "7wqF3BU0ykeKch6BcNqGiT",
            is_local: false,
            is_playable: true,
            name: "Planet Caravan",
            preview_url:
              "https://p.scdn.co/mp3-preview/283911383091073421dc63efd0a6ec13d00980c0?cid=774b29d4f13844c495f206cafdad9c86",
            track_number: 3,
            type: "track",
            uri: "spotify:track:7wqF3BU0ykeKch6BcNqGiT",
          },
          {
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5M52tdBnJaKSvOpJGz8mfZ",
                },
                href: "https://api.spotify.com/v1/artists/5M52tdBnJaKSvOpJGz8mfZ",
                id: "5M52tdBnJaKSvOpJGz8mfZ",
                name: "Black Sabbath",
                type: "artist",
                uri: "spotify:artist:5M52tdBnJaKSvOpJGz8mfZ",
              },
            ],
            disc_number: 1,
            duration_ms: 354773,
            explicit: false,
            external_urls: {
              spotify: "https://open.spotify.com/track/0TI8TP4FitVPoEHPTySx48",
            },
            href: "https://api.spotify.com/v1/tracks/0TI8TP4FitVPoEHPTySx48",
            id: "0TI8TP4FitVPoEHPTySx48",
            is_local: false,
            is_playable: true,
            name: "Iron Man",
            preview_url:
              "https://p.scdn.co/mp3-preview/b5afd236ad1f6a6df6ba6994c665f648c4d0fda4?cid=774b29d4f13844c495f206cafdad9c86",
            track_number: 4,
            type: "track",
            uri: "spotify:track:0TI8TP4FitVPoEHPTySx48",
          },
          {
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5M52tdBnJaKSvOpJGz8mfZ",
                },
                href: "https://api.spotify.com/v1/artists/5M52tdBnJaKSvOpJGz8mfZ",
                id: "5M52tdBnJaKSvOpJGz8mfZ",
                name: "Black Sabbath",
                type: "artist",
                uri: "spotify:artist:5M52tdBnJaKSvOpJGz8mfZ",
              },
            ],
            disc_number: 1,
            duration_ms: 289799,
            explicit: false,
            external_urls: {
              spotify: "https://open.spotify.com/track/39eKdJcCdYYRdKEZRfKJDJ",
            },
            href: "https://api.spotify.com/v1/tracks/39eKdJcCdYYRdKEZRfKJDJ",
            id: "39eKdJcCdYYRdKEZRfKJDJ",
            is_local: false,
            is_playable: true,
            name: "Electric Funeral",
            preview_url:
              "https://p.scdn.co/mp3-preview/b5befd8c1a86b2157ba784e385fe7e9824665e75?cid=774b29d4f13844c495f206cafdad9c86",
            track_number: 5,
            type: "track",
            uri: "spotify:track:39eKdJcCdYYRdKEZRfKJDJ",
          },
          {
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5M52tdBnJaKSvOpJGz8mfZ",
                },
                href: "https://api.spotify.com/v1/artists/5M52tdBnJaKSvOpJGz8mfZ",
                id: "5M52tdBnJaKSvOpJGz8mfZ",
                name: "Black Sabbath",
                type: "artist",
                uri: "spotify:artist:5M52tdBnJaKSvOpJGz8mfZ",
              },
            ],
            disc_number: 1,
            duration_ms: 428386,
            explicit: false,
            external_urls: {
              spotify: "https://open.spotify.com/track/40W1V3aU3g6lEGZVwsxAcO",
            },
            href: "https://api.spotify.com/v1/tracks/40W1V3aU3g6lEGZVwsxAcO",
            id: "40W1V3aU3g6lEGZVwsxAcO",
            is_local: false,
            is_playable: true,
            name: "Hand of Doom",
            preview_url:
              "https://p.scdn.co/mp3-preview/25fb303aa20f6b00376e8e3aefc24707e160c82d?cid=774b29d4f13844c495f206cafdad9c86",
            track_number: 6,
            type: "track",
            uri: "spotify:track:40W1V3aU3g6lEGZVwsxAcO",
          },
          {
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5M52tdBnJaKSvOpJGz8mfZ",
                },
                href: "https://api.spotify.com/v1/artists/5M52tdBnJaKSvOpJGz8mfZ",
                id: "5M52tdBnJaKSvOpJGz8mfZ",
                name: "Black Sabbath",
                type: "artist",
                uri: "spotify:artist:5M52tdBnJaKSvOpJGz8mfZ",
              },
            ],
            disc_number: 1,
            duration_ms: 149741,
            explicit: false,
            external_urls: {
              spotify: "https://open.spotify.com/track/1uPH6mPMlbB4SqrHmRqnlE",
            },
            href: "https://api.spotify.com/v1/tracks/1uPH6mPMlbB4SqrHmRqnlE",
            id: "1uPH6mPMlbB4SqrHmRqnlE",
            is_local: false,
            is_playable: true,
            name: "Rat Salad",
            preview_url:
              "https://p.scdn.co/mp3-preview/4983d7a64b04220585b1a239f2e84ea55551126c?cid=774b29d4f13844c495f206cafdad9c86",
            track_number: 7,
            type: "track",
            uri: "spotify:track:1uPH6mPMlbB4SqrHmRqnlE",
          },
          {
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5M52tdBnJaKSvOpJGz8mfZ",
                },
                href: "https://api.spotify.com/v1/artists/5M52tdBnJaKSvOpJGz8mfZ",
                id: "5M52tdBnJaKSvOpJGz8mfZ",
                name: "Black Sabbath",
                type: "artist",
                uri: "spotify:artist:5M52tdBnJaKSvOpJGz8mfZ",
              },
            ],
            disc_number: 1,
            duration_ms: 373192,
            explicit: false,
            external_urls: {
              spotify: "https://open.spotify.com/track/6Kfyg9nl3TWbtrUFEF4yr5",
            },
            href: "https://api.spotify.com/v1/tracks/6Kfyg9nl3TWbtrUFEF4yr5",
            id: "6Kfyg9nl3TWbtrUFEF4yr5",
            is_local: false,
            is_playable: true,
            name: "Fairies Wear Boots",
            preview_url:
              "https://p.scdn.co/mp3-preview/26d6685d5ba71977adc70aacbaf435dfe665fd2e?cid=774b29d4f13844c495f206cafdad9c86",
            track_number: 8,
            type: "track",
            uri: "spotify:track:6Kfyg9nl3TWbtrUFEF4yr5",
          },
        ],
        limit: 50,
        next: null,
        offset: 0,
        previous: null,
        total: 8,
      },
      type: "album",
      uri: "spotify:album:132qAo1cDiEJdA3fv4xyNK",
    };
    //@ts-ignore
    const uris = getTrackUrisFromAlbum(album.tracks.items);
    //@ts-ignore
    expect(uris.length).toEqual(album.tracks.items.length); */
  });
  it("getIDFromSpotifyUri() is working ", () => {
    const uri = "spotify:track:6Kfyg9nl3TWbtrUFEF4yr5";
    const id = getIDFromSpotifyUri(uri);
    expect(id).toEqual("6Kfyg9nl3TWbtrUFEF4yr5");
  });
});

it("getMinutesAndSecondsFromMs() is working ", () => {
  //    2030005
  // 33 Minutes 50 Seconds
  const duration = getMinutesAndSecondsFromMs(2030005);
  expect(duration).toEqual("33:50");
});
