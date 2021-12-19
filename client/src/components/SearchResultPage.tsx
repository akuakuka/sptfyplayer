import { Box, Flex, Container, Heading } from "@chakra-ui/layout";
import { Button, Input, Spacer, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  SearchResultAlbum,
  SearchResultArtist,
} from "../../../server/types/SpotifyTypes";
import { search } from "../API";

import Item from "./Item";

const SearchResultPage: React.FC = () => {
  const [artists, setArtists] = useState<SearchResultArtist[]>(Object);
  const [albums, setAlbums] = useState<SearchResultAlbum[]>(Object);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  //@ts-ignore
  let { term } = useParams();

  useEffect(() => {
    console.log(albums);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const nonordics = term
          .replaceAll("ö", "o")
          .replaceAll("ä", "a")
          .replaceAll("å", "a");
        console.log(nonordics);
        setLoading(true);
        const resp = await search(nonordics);
        console.log(resp);
        if (resp.artists) setArtists(resp.artists.items);
        if (resp.albums) setAlbums(resp.albums.items);

        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [term]);

  return (
    <Container
      height="calc( 100vh - 100px )"
      maxWidth="calc( 100vw - 100px )"
      paddingTop="80px"
    >
      <Flex>
        {loading ? (
          <Spinner />
        ) : (
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
        )}
      </Flex>
    </Container>
  );
};
export default SearchResultPage;
