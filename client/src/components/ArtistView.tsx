import { useEffect, useState } from "react";
import { spotifyArtist } from "../../../server/types/SpotifyTypes";
import { getArtists } from "../API";
import Item from "./Item";
import { SpinnerPage } from "./SpinnerPage";

const ArtistView: React.FC = () => {
  const [artists, setArtists] = useState<spotifyArtist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // TODO : Artistien cache - react memo?
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const resp = await getArtists();
        // @ts-ignore
        setArtists(resp.data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <SpinnerPage />
      ) : (
        <>
          {artists && artists.length ? (
            <>
              {artists.map((a, i) => (
                <Item {...a} key={i} />
              ))}{" "}
            </>
          ) : (
            <> ei artisteja</>
          )}
        </>
      )}
    </>
  );
};

export default ArtistView;
