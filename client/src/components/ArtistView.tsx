import { Box, Container, Flex } from "@chakra-ui/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { spotifyArtist } from "../../../server/types/SpotifyTypes";
import { getArtists } from "../API";
import Artist from "./Artist";
import Item from "./Item";

const ArtistView: React.FC = () => {
  const [artists, setArtists] = useState<spotifyArtist[]>([]);

  // TODO : Artistien cache - react memo?
  useEffect(() => {
    (async () => {
      try {
        console.log("ARTISRTVIEW");
        const resp = await getArtists();
        console.log(resp);
        setArtists(resp.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <Container
      height="calc( 100vh - 100px )"
      maxWidth="calc( 100vw - 100px )"
      paddingTop="80px"
    >
      <Flex
        direction="row"
        gridGap="10px"
        wrap="wrap"
        overflow="auto"
        height="100vh"
        width="100vw"
      >
        {artists && artists.length ? (
          <>
            {artists.map((a, i) => (
              <Item {...a} key={i} />
            ))}{" "}
          </>
        ) : (
          <> ei artisteja</>
        )}
      </Flex>
    </Container>
  );
};

export default ArtistView;
