import { MinusIcon } from "@chakra-ui/icons";
import {
  Table,
  TableRowProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { spotifyAlbum } from "../../../server/types/SpotifyTypes";
import { UIContext } from "../../hooks/useUI";
import { getAlbumReleaseYearFromDate } from "../../utils/dateUtils";
import { ItemWrapper } from "../ItemWrapper";
import { SpinnerPage } from "../SpinnerPage";

/* interface sortStatus {
    column: string;
    direction: boolean;
}
 */

interface ListViewProps {
  albumList: spotifyAlbum[];
  loading: boolean;
}

export const AlbumListView: React.FC<ListViewProps> = ({
  albumList,
  loading,
}) => {
  const [albums, setAlbums] = useState<spotifyAlbum[]>([]);
  const [sortStatus, setSortStatus] = useState<string>("");
  const bgColor = useColorModeValue("brand.200", "brandDark.900");
  const UICOntext = useContext(UIContext);
  const navigate = useNavigate();

  useEffect(() => {
    setAlbums(albumList);
  }, []);

  const MotionRow = motion<TableRowProps>(Tr);

  const handleSortChange = (column: string) => {
    // Name Year Tracks Type
    // make it render after sort
    const copy = [...albums];

    console.log(sortStatus);
    if (column === "NAME") {
      console.log("IF");
      if (sortStatus === "NAME") {
        console.log("name");

        setAlbums(copy.reverse());
      } else {
        setAlbums(
          copy.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          )
        );
      }
    }

    if (column === "YEAR") {
      if (sortStatus === "YEAR") {
        setAlbums(copy.reverse());
      } else {
        setAlbums(
          copy.sort((a, b) =>
            getAlbumReleaseYearFromDate(
              a.release_date,
              a.release_date_precision
            ) >
            getAlbumReleaseYearFromDate(
              b.release_date,
              b.release_date_precision
            )
              ? 1
              : -1
          )
        );
      }
    }

    if (column === "TRACKS") {
      if (sortStatus === "TRACKS") {
        setAlbums(copy.reverse());
      } else {
        setAlbums(
          copy.sort((a, b) => (a.total_tracks > b.total_tracks ? 1 : -1))
        );
      }
    }
    if (column === "TYPE") {
      if (sortStatus === "TYPE") {
        setAlbums(copy.reverse());
      } else {
        setAlbums(copy.sort((a, b) => (a.album_type > b.album_type ? 1 : -1)));
      }
    }
    setSortStatus(column);
  };
  // TODO : Not centering
  return (
    <>
      {loading ? (
        <SpinnerPage />
      ) : (
        <ItemWrapper islist>
          <Table size="sm" backgroundColor={bgColor}>
            <Thead>
              <Tr>
                <Th cursor="pointer" onClick={() => handleSortChange("NAME")}>
                  Name <MinusIcon cursor={"pointer"} />
                </Th>
                <Th
                  cursor="pointer"
                  isNumeric
                  onClick={() => handleSortChange("YEAR")}
                >
                  Year <MinusIcon cursor={"pointer"} />
                </Th>
                <Th
                  cursor="pointer"
                  isNumeric
                  onClick={() => handleSortChange("TRACKS")}
                >
                  Tracks <MinusIcon cursor={"pointer"} />
                </Th>
                <Th cursor="pointer" onClick={() => handleSortChange("TYPE")}>
                  Type <MinusIcon cursor={"pointer"} />
                </Th>

                {/*  <Th>Name <MinusIcon cursor={"pointer"} onClick={() => handleSortChange("NAME")} /></Th>
                            <Th isNumeric>Followers <MinusIcon cursor={"pointer"} onClick={() => handleSortChange("FOLLOWERS")} /></Th>
                            <Th isNumeric>Popularity <MinusIcon cursor={"pointer"} onClick={() => handleSortChange("POPULARITY")} /></Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {albums && (
                <>
                  {albums
                    .filter((f) =>
                      f.name.toLowerCase().includes(UICOntext.filter)
                    )
                    .map((a) => (
                      <MotionRow
                        cursor={"pointer"}
                        key={a.id}
                        whileHover={{ scale: 0.95 }}
                        onClick={() => navigate(`/app/album/${a.id}`)}
                      >
                        <Td>{a.name}</Td>
                        <Td isNumeric>
                          {getAlbumReleaseYearFromDate(
                            a.release_date,
                            a.release_date_precision
                          )}
                        </Td>
                        <Td isNumeric>{a.total_tracks}</Td>
                        <Td>{a.album_type}</Td>

                        {/*                        <Td isNumeric>{a.followers ? a.followers.total : 0}</Td>
                                    <Td isNumeric>{a.popularity ? a.popularity : 0}</Td> */}
                      </MotionRow>
                    ))}
                </>
              )}
            </Tbody>
          </Table>
        </ItemWrapper>
      )}
    </>
  );
};

/* {uniqAlbums.filter(f => f.name.toLowerCase().includes(UICOntext.filter)).filter(s => s.album_type !== "single").map((a, i) => ( */
