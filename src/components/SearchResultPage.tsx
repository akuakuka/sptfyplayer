import { Container, Flex, Heading } from "@chakra-ui/layout";
import { Spacer } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  SearchResultAlbum,
  SearchResultArtist
} from "../../server/types/SpotifyTypes";
import { search } from "../API/API";
import { UIContext } from "../hooks/useUI";
import Item from "./Item";
import { SpinnerPage } from "./SpinnerPage";


const SearchResultPage: React.FC = () => {
  const [artists, setArtists] = useState<SearchResultArtist[]>(Object);
  const [albums, setAlbums] = useState<SearchResultAlbum[]>(Object);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { term } = useParams();
  const UICOntext = useContext(UIContext);

  useEffect(() => {
    (async () => {
      if (term) {
        const nonordics = term
          .replaceAll("ö", "o")
          .replaceAll("ä", "a")
          .replaceAll("å", "a");
        setLoading(true);
        const resp = await search(nonordics);
        if (resp.artists) setArtists(resp.artists.items);
        if (resp.albums) setAlbums(resp.albums.items);
        setLoading(false);
      }
    })();
  }, [term]);


  useEffect(() => {
    UICOntext.setHeading(`Tulokset : ${term}`)
  }, []);




  // TODO: Artist-itemit menee Albumien alle joillan vw
  return (
    <>

      <Flex>
        {loading ? (
          <SpinnerPage />
        ) : (
          <Container
            height="calc( 100vh - 100px )"
            maxWidth="calc( 100vw - 100px )"
            paddingTop="80px"
          >
            <Flex>
              <Flex direction="column" width="40vw" gridGap="5">
                <Heading> Artistit</Heading>
                {artists.length && (
                  <Flex
                    direction="row"
                    width="40vw"
                    gridGap="5"
                    minWidth="42vw"
                    wrap="wrap"
                  >
                    {artists.map((a, i) => (
                      <Item {...a} key={i} />
                    ))}
                  </Flex>
                )}
              </Flex>
              <Spacer />
              <Flex direction="column" width="40vw" gridGap="5">
                <Heading> Albumit</Heading>
                {albums.length && (
                  <Flex
                    direction="row"
                    width="40vw"
                    gridGap="5"
                    minWidth="42vw"
                    wrap="wrap"
                  >
                    {albums.map((a, i) => (
                      /*   <Box key={i}>{a.name}</Box> */
                      <Item {...a} key={i} />
                    ))}
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Container>
        )}
      </Flex>

    </>
  );
};
export default SearchResultPage;
