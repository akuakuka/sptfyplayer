import { Center, Flex } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { spotifyArtist } from "../../server/types/SpotifyTypes";
import { getArtists } from "../API";
import { useAPI } from "../hooks/useApi";
import { UIContext } from "../hooks/useUI";
import Item from "./Item";
import { ListView } from "./list/ArtistListView";
import { SpinnerPage } from "./SpinnerPage";

// TODO : Artistien cache - react memo?
// TODO: ArtistImage lazyload

const ArtistView: React.FC = () => {
  const { execute, loading, data, error } = useAPI<spotifyArtist[]>(
    getArtists,
    false
  );

  const UICOntext = useContext(UIContext);

  useEffect(() => {
    execute();
  }, []);

  useEffect(() => {
    UICOntext.setHeading("Seuratut artistit")
  }, []);

  return (
    <>
      {loading ? (
        <Center width="90vw">
          <SpinnerPage />
        </Center>
      ) : (
        <>
          {UICOntext.view === "LIST" ? (
            <ListView artistsList={data ? data : []} loading={loading} />
          ) : (
            <>
              {data && data.length ? (
                <Flex
                  direction="row"
                  gridGap="10px"
                  wrap="wrap"
                  justifyContent="center"
                >
                  {data.filter(f => f.name.toLowerCase().includes(UICOntext.filter)).map((a, i) => (
                    <Item {...a} key={i} />
                  ))}
                </Flex>
              ) : (
                <> ei artisteja</>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ArtistView;
