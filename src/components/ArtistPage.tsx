import { Center, Flex, Heading } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { spotifyAlbum, spotifyArtist } from "../../server/types/SpotifyTypes";
import { getArtist, getArtistAlbums } from "../API/API";
import { useAPI } from "../hooks/useApi";
import { UIContext } from "../hooks/useUI";
import Item from "./Item";
import { ItemWrapper } from "./ItemWrapper";
import { AlbumListView } from "./list/AlbumListView";
import { SpinnerPage } from "./SpinnerPage";

const ArtistPage: React.FC = () => {
  const [uniqAlbums, setUniqAlbums] = useState<spotifyAlbum[]>([]);
  const dd = useParams();
  const id = dd.id || "";

  const { execute, loading, data, error } = useAPI<spotifyArtist>(
    () => getArtist(id),
    false
  );

  const {
    execute: albExecute,
    loading: albLoading,
    data: albData,
    error: albError,
  } = useAPI<spotifyAlbum[]>(() => getArtistAlbums(id), false);
  const bgColor = useColorModeValue("yellow", "red");
  const UICOntext = useContext(UIContext);

  useEffect(() => {
    if (id.length) {
      execute();
      albExecute();
    }
  }, []);

  useEffect(() => {
    if (data?.name) {
      UICOntext.setHeading(data?.name);
    }
  }, [data]);

  useEffect(() => {
    // SpotifyApi is broken. Does not handle market parameter so dublicate albums appear. Handling :
    if (albData) {

      const uniques: spotifyAlbum[] = Object.values(
        albData.reduce((c, e) => {
          if (!c[e.name.toUpperCase()]) c[e.name.toUpperCase()] = e;
          return c;
        }, {})
      );

      setUniqAlbums(uniques);

    }
  }, [albData]);

  return (
    <Flex direction="column">
      {loading || albLoading ? (
        <Center width="90vw">
          <SpinnerPage />
        </Center>
      ) : (
        <>
          {UICOntext.view === "LIST" ? (
            <AlbumListView
              albumList={albData ? uniqAlbums : []}
              loading={loading || albLoading}
            />
          ) : (
            <ItemWrapper>
              <Heading width={"100vw"} padding={6}>
                Albumit
              </Heading>
              {uniqAlbums
                .filter((f) => f.name.toLowerCase().includes(UICOntext.filter))
                .filter((s) => s.album_type === "album")
                .map((a, i) => (
                  <Item key={i} {...a} />
                ))}
              {UICOntext.singles && (
                <>
                  <Heading width={"100vw"} padding={6}>
                    Singlet
                  </Heading>
                  {uniqAlbums
                    .filter((f) =>
                      f.name.toLowerCase().includes(UICOntext.filter)
                    )
                    .filter((s) => s.album_type === "single")
                    .map((a, i) => (
                      <Item key={i} {...a} />
                    ))}
                </>
              )}
            </ItemWrapper>
          )}
        </>
      )}
    </Flex>
  );
};

export default ArtistPage;
