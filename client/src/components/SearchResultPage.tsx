import { Box, Flex, Container, Heading } from "@chakra-ui/layout";
import { Button, Input, Spacer, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  SearchResultAlbum,
  SearchResultArtist,
} from "../../../server/types/SpotifyTypes";
import { search } from "../API";
import Album from "./Album";
import Artist from "./Artist";

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
        setLoading(true);
        const resp = await search(term);
        setArtists(resp.artists.items);
        setAlbums(resp.albums.items);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <Container height="calc( 100vh - 100px )" maxWidth="calc( 100vw - 100px )" paddingTop="80px" >
    <Flex>
      {loading ? (
        <Spinner />
      ) : (
        <Flex>
          <Flex direction="column">
            <Heading> Artistit</Heading>
            {artists.length && (
              <>
                {artists.map((a, i) => (
                  <Artist key={i} {...a} />
                ))}
              </>
            )}
          </Flex>
          <Spacer />
          <Flex direction="column">
            <Heading> Albumit</Heading>
            {artists.length && (
              <>
                {albums.map((a, i) => (
                  <Box key={i}>{a.name}</Box>
                ))}
              </>
            )}
          </Flex>
        </Flex>
      )}
    </Flex>
    </Container>
  );
};
export default SearchResultPage;
