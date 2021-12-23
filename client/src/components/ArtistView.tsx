import { Heading, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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

      setIsLoading(true);
      const resp = await getArtists();
      setArtists(resp);
      setIsLoading(false);

    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <SpinnerPage />
      ) : (
        <>
          <Heading flexGrow={0} flexShrink={0} flexBasis={"100%"} margin="auto" textAlign="center" textColor={useColorModeValue("brand.200", "brandDark.600")}>Seuratut artistit</Heading>
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
