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
import { spotifyArtist } from "@typings/SpotifyTypes";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UIContext } from "../../hooks/useUI";
import { ItemWrapper } from "../ItemWrapper";
import { SpinnerPage } from "../Pages/SpinnerPage";

/* interface sortStatus {
    column: string;
    direction: boolean;
}
 */

interface ListViewProps {
  artistsList: spotifyArtist[];
  loading: boolean;
}

export const ListView: React.FC<ListViewProps> = ({ artistsList, loading }) => {
  const [artists, setArtists] = useState<spotifyArtist[]>([]);
  const [sortStatus, setSortStatus] = useState<string>("");
  const UICOntext = useContext(UIContext);
  const bgColor = useColorModeValue("brand.200", "brandDark.900");
  const navigate = useNavigate();

  useEffect(() => {
    setArtists(artistsList);
  }, [artistsList]);

  const MotionRow = motion<TableRowProps>(Tr);

  const handleSortChange = (column: string) => {
    // NAME	FOLLOWERS	POPULARITY
    const copy = [...artists];
    if (column === "NAME") {
      if (sortStatus === "NAME") {
        setArtists(copy.reverse());
      } else {
        setArtists(
          copy.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          )
        );
      }
    }

    if (column === "POPULARITY") {
      if (sortStatus === "POPULARITY") {
        setArtists(copy.reverse());
      } else {
        setArtists(copy.sort((a, b) => (a.popularity > b.popularity ? 1 : -1)));
      }
    }

    if (column === "FOLLOWERS") {
      if (sortStatus === "FOLLOWERS") {
        setArtists(
          copy.sort((a, b) => (a.followers.total < b.followers.total ? 1 : -1))
        );
      } else {
        setArtists(
          copy.sort((a, b) => (a.followers.total > b.followers.total ? 1 : -1))
        );
      }
    }
    setSortStatus(column);
    //    objs.sort((a, b) => a.last_nom.localeCompare(b.last_nom));
  };

  return (
    <>
      {loading ? (
        <SpinnerPage />
      ) : (
        <ItemWrapper islist>
          <Table size="sm" backgroundColor={bgColor}>
            <Thead>
              <Tr>
                <Th>
                  Name{" "}
                  <MinusIcon
                    cursor={"pointer"}
                    onClick={() => handleSortChange("NAME")}
                  />
                </Th>
                <Th isNumeric>
                  Followers{" "}
                  <MinusIcon
                    cursor={"pointer"}
                    onClick={() => handleSortChange("FOLLOWERS")}
                  />
                </Th>
                <Th isNumeric>
                  Popularity{" "}
                  <MinusIcon
                    cursor={"pointer"}
                    onClick={() => handleSortChange("POPULARITY")}
                  />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {artists && (
                <>
                  {artists
                    .filter((f) =>
                      f.name.toLowerCase().includes(UICOntext.filter)
                    )
                    .map((a) => (
                      <MotionRow
                        cursor={"pointer"}
                        key={a.id}
                        whileHover={{ scale: 0.95 }}
                        onClick={() => navigate(`/app/artist/${a.id}`)}
                      >
                        <Td>{a.name}</Td>
                        <Td isNumeric>{a.followers ? a.followers.total : 0}</Td>
                        <Td isNumeric>{a.popularity ? a.popularity : 0}</Td>
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
