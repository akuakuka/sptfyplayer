import { Center, Flex, Heading } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { spotifyAlbum, spotifyArtist } from "../../server/types/SpotifyTypes";
import { getArtist, getArtistAlbums } from "../API/API";
import { useAPI } from "../hooks/useApi";
import { UIContext } from "../hooks/useUI";
import Item from "./Item";
import { AlbumListView } from "./list/AlbumListView";
import { SpinnerPage } from "./SpinnerPage";

const ArtistPage: React.FC = () => {
  const [uniqAlbums, setUniqAlbums] = useState<spotifyAlbum[]>([])
  const dd = useParams();
  const id = dd.id || ""

  const { execute, loading, data, error } = useAPI<spotifyArtist>(
    () => getArtist(id),
    false
  );

  const { execute: albExecute, loading: albLoading, data: albData, error: albError } = useAPI<spotifyAlbum[]>(
    () => getArtistAlbums(id),
    false
  );
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
      UICOntext.setHeading(data?.name)
    }

  }, [data]);


  useEffect(() => {
    // SpotifyApi is broken. Does not handle market parameter so dublicate albums appear. Handling : 
    if (albData) {
      console.log(albData)
      const uniques: spotifyAlbum[] = Object.values(
        albData.reduce((c, e) => {
          if (!c[e.name.toUpperCase()]) c[e.name.toUpperCase()] = e;
          return c;
        }, {})
      );

      setUniqAlbums(uniques)
      console.log(uniques)
    }

  }, [albData]);


  return (
    <Flex direction="column">
      {loading || albLoading ? (
        <Center width="90vw">
          <SpinnerPage />
        </Center>
      ) : (
        <Flex
          direction="row"
          gridGap="10px"
          wrap="wrap"
          overflow="hidden"
          sx={{ height: "calc(100vh - 150px);" }}
          width="90vw"
          justifyContent="center"
          alignContent={"flex-start"}
          paddingY="5"
        >
          {UICOntext.view === "LIST" ? (
            <AlbumListView albumList={albData ? uniqAlbums : []} loading={loading || albLoading} />
          ) : (
            <Flex
              direction="column"
              alignContent={"flex-start"}
              justifyContent={"flex-start"}
            >


              <Flex gridGap="10">
                <Heading paddingLeft="10">Albumit </Heading>
              </Flex>
              <Flex direction="column" gridGap="10">
                <Flex
                  direction="row"
                  gridGap="10px"
                  wrap="wrap"
                  justifyContent="center"
                >
                  {albData && albData.length ? (
                    <>

                      {uniqAlbums.filter(f => f.name.toLowerCase().includes(UICOntext.filter)).filter(s => s.album_type !== "single").map((a, i) => (
                        <Item key={i} {...a} />
                      ))}
                    </>
                  ) : (
                    <> ei albumeita</>
                  )}
                </Flex>
                {UICOntext.singles && (
                  <Flex direction="column" gridGap="5">
                    <Heading paddingLeft="10">Singlet </Heading>
                    <Flex
                      direction="row"
                      gridGap="10px"
                      wrap="wrap"
                      justifyContent="center"
                    >
                      {albData && albData.length ? (
                        <>
                          {uniqAlbums.filter(f => f.name.toLowerCase().includes(UICOntext.filter)).filter(s => s.album_type === "single").map((a, i) => (
                            <Item key={i} {...a} />
                          ))}
                        </>
                      ) : (
                        <> </>
                      )}
                    </Flex>
                  </Flex>
                )}
              </Flex>
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default ArtistPage;
