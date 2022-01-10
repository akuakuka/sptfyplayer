import { Center } from "@chakra-ui/react";
import { spotifyAlbum } from "@typings/SpotifyTypes";
import React, { useContext, useEffect, useState } from "react";
import { getAllAlbums } from "../../API/API";
import { useAPI } from "../../hooks/useApi";
import { UIContext } from "../../hooks/useUI";
import { AnimatedRoute } from "../AnimateRoute";
import Item from "../Item";
import { ItemWrapper } from "../ItemWrapper";
import { AlbumListView } from "../list/AlbumListView";
import { SpinnerPage } from "./SpinnerPage";

// TODO : Artistien cache - react memo?
// TODO: ArtistImage lazyload

export const AlbumView: React.FC = () => {
  const [uniqAlbums, setUniqAlbums] = useState<spotifyAlbum[]>([]);
  const { execute, loading, data, error } = useAPI<spotifyAlbum[]>(
    getAllAlbums,
    false
  );

  const UICOntext = useContext(UIContext);

  useEffect(() => {
    execute();
  }, []);

  useEffect(() => {
    //TODO: page järkevämmin, enumtype?
    UICOntext.setHeading("Albumit");
    UICOntext.setPage("albumview");
  }, []);

  useEffect(() => {
    // SpotifyApi is broken. Does not handle market parameter so dublicate albums appear. Handling :
    if (data) {
      const uniques: spotifyAlbum[] = Object.values(
        data.reduce((c, e) => {
          if (!c[e.name.toUpperCase()]) c[e.name.toUpperCase()] = e;
          return c;
        }, {})
      );

      setUniqAlbums(uniques);
    }
  }, [data]);

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
              <AlbumListView albumList={data ? data : []} loading={loading} />
            ) : (
              <>
                {data && data.length ? (
                  <ItemWrapper>
                    {uniqAlbums
                      .filter((f) =>
                        f.name.toLowerCase().includes(UICOntext.filter)
                      )
                      .map((a, i) => (
                        <Item {...a} key={i} />
                      ))}
                  </ItemWrapper>
                ) : (
                  <> Ei albumeita</>
                )}
              </>
            )}
          </AnimatedRoute>
        </>
      )}
    </>
  );
};
