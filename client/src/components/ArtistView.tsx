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
    <>
      {artists && artists.length ? (
        <>
          {artists.map((a, i) => (
            <Item {...a} key={i} />
          ))}{" "}
        </>
      ) : (
        <> ei artisteja</>
      )}
    </>
  );
};

export default ArtistView;
