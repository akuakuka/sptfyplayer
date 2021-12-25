import { Heading, useColorModeValue } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { spotifyArtist } from "../../../server/types/SpotifyTypes";
import { API } from "../API";
import { useAPI } from "../hooks/useApi";
import { UIContext } from "../hooks/useUI";
import Item from "./Item";
import { ListView } from "./list/ArtistListView";
import { SpinnerPage } from "./SpinnerPage";

const ArtistView: React.FC = () => {
  const [artists, setArtists] = useState<spotifyArtist[]>([]);
  // @ts-ignore
  const [status, statusText, data, error, loading] = useAPI(`/artists`, API);
  // TODO : Artistien cache - react memo?
  const UICOntext = useContext(UIContext);
  useEffect(() => {
    console.log("UICOntext.view")
    console.log(UICOntext.view)
  }, [UICOntext.view])
  return (
    <>
      {loading ? (
        <SpinnerPage />
      ) : (
        <>
          <Heading
            flexGrow={0}
            flexShrink={0}
            flexBasis={"100%"}
            margin="auto"
            textAlign="center"
            textColor={useColorModeValue("brand.200", "brandDark.600")}
          >
            Seuratut artistit
          </Heading>

          {UICOntext.view === "LIST" ? <ListView artistsList={data} loading={loading} /> :
            <>{data && data.length ? (
              <>
                {data.map((a, i) => (
                  <Item {...a} key={i} />
                ))}
              </>
            ) : (
              <> ei artisteja</>
            )}</>
          }

        </>
      )}
    </>
  );
};

export default ArtistView;
