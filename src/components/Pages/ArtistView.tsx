import { Center } from "@chakra-ui/react";
import { spotifyArtist } from "@typings/SpotifyTypes";
import React, { useContext, useEffect } from "react";
import { getArtists } from "../../API/API";
import { useAPI } from "../../hooks/useApi";
import { UIContext } from "../../hooks/useUI";
import { AnimatedRoute } from "../AnimateRoute";
import Item from "../Item";
import { ItemWrapper } from "../ItemWrapper";
import { ListView } from "../list/ArtistListView";
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
    //TODO: page järkevämmin, enumtype?
    UICOntext.setHeading("Seuratut artistit");
    UICOntext.setPage("artistview");
  }, []);

  return (
    <>
      {loading ? (
        <AnimatedRoute>
          <Center width="90vw">
            <SpinnerPage />
          </Center>
        </AnimatedRoute>
      ) : (
        <>
          <AnimatedRoute>
            {UICOntext.view === "LIST" ? (
              <ListView artistsList={data ? data : []} loading={loading} />
            ) : (
              <>
                {data && data.length ? (
                  <ItemWrapper>
                    {data
                      .filter((f) =>
                        f.name.toLowerCase().includes(UICOntext.filter)
                      )
                      .map((a, i) => (
                        <Item {...a} key={i} />
                      ))}
                  </ItemWrapper>
                ) : (
                  <> ei artisteja</>
                )}
              </>
            )}
          </AnimatedRoute>
        </>
      )}
    </>
  );
};

export default ArtistView;
