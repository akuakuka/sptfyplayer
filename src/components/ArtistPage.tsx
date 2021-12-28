import { Flex, Heading } from "@chakra-ui/layout";
import { Switch, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  spotifyAlbum,
  spotifyArtist
} from "../../server/types/SpotifyTypes";
import { getArtist, getArtistAlbums } from "../API";
import { UIContext } from "../hooks/useUI";
import Item from "./Item";
import { AlbumListView } from "./list/AlbumListView";
import { SpinnerPage } from "./SpinnerPage";

/* interface ArtistPageProps {
    id:string
} */
const ArtistPage: React.FC = () => {
  const [artist, setArtist] = useState<spotifyArtist>(Object);
  const [albums, setAlbums] = useState<spotifyAlbum[]>([]);
  const [singles, setSingles] = useState<spotifyAlbum[]>([]);
  const [showSingles, setShowSingles] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const UICOntext = useContext(UIContext);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        setIsLoading(true);
        const resp = await getArtist(id);
        setArtist(resp);
        const alabums = await getArtistAlbums(id);
        console.log(alabums)
        setAlbums(alabums.filter((a) => a.album_type === "album"));
        setSingles(alabums.filter((a) => a.album_type === "single"));
        setIsLoading(false);
      }
    })();
  }, []);

  const handleSingleSwitch = async () => {
    setShowSingles(!showSingles);
  };
  //  { UICOntext.view === "LIST" ? <div>asd</div> : <div>asd</div> }
  return (
    <Flex direction="column">
      {isLoading ? (
        <SpinnerPage />
      ) : (
        <>
          {UICOntext.view === "LIST" ? (
            <AlbumListView albumList={albums} loading={isLoading} />
          ) : (
            <Flex direction="column">
              <Flex
                direction="column"
                alignContent="center"
                alignItems="center"
              >
                <Heading>{artist.name}</Heading>
              </Flex>

              <Flex gridGap="10">
                <Heading paddingLeft="10">Albumit </Heading>
                <Flex gridGap="3">
                  <Text>Näytä singlet?</Text>
                  <Switch
                    colorScheme={useColorModeValue("yellow", "red")}
                    onChange={() => handleSingleSwitch()}
                  ></Switch>
                </Flex>
              </Flex>
              <Flex direction="column" gridGap="10">
                <Flex
                  direction="row"
                  gridGap="10px"
                  wrap="wrap"
                  justifyContent="center"
                >
                  {albums && albums.length ? (
                    <>
                      {albums.map((a, i) => (
                        <Item key={i} {...a} />
                      ))}
                    </>
                  ) : (
                    <> ei albumeita</>
                  )}
                </Flex>
                {showSingles && (
                  <Flex direction="column" gridGap="5">
                    <Heading paddingLeft="10">Singlet </Heading>
                    <Flex
                      direction="row"
                      gridGap="10px"
                      wrap="wrap"
                      justifyContent="center"
                    >
                      {singles && singles.length ? (
                        <>
                          {singles.map((a, i) => (
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
        </>
      )}
    </Flex>
  );
};

export default ArtistPage;