import { Center, Flex, Heading } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { spotifyAlbum, spotifyArtist } from "../../server/types/SpotifyTypes";
import { getArtist, getArtistAlbums } from "../API";
import { useAPI } from "../hooks/useApi";
import { UIContext } from "../hooks/useUI";
import Item from "./Item";
import { AlbumListView } from "./list/AlbumListView";
import { SpinnerPage } from "./SpinnerPage";

const ArtistPage: React.FC = () => {
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
    if (UICOntext.setHeading && data?.name) {
      UICOntext.setHeading && UICOntext.setHeading(data?.name)
    }

  }, [data]);

  /*   const handleSingleSwitch = async () => {
      setShowSingles(!showSingles);
    }; */
  //  { UICOntext.view === "LIST" ? <div>asd</div> : <div>asd</div> }

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
            <AlbumListView albumList={albData ? albData : []} loading={loading || albLoading} />
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

                      {albData.filter(f => f.name.toLowerCase().includes(UICOntext.filter)).filter(s => s.album_type !== "single").map((a, i) => (
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
                          {albData.filter(s => s.album_type === "single").map((a, i) => (
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
