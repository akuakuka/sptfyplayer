import React, { createContext, useState } from "react";

interface defaultUI {
    view: string;
    singles: boolean;
    heading: string;
    filter: string;
    spotifySearch: string;
    setSpotifySearch: (a: string) => void;
    setFilter: (a: string) => void;
    setHeading: (h: string) => void;
    setView: (a: string) => void;
    toggleSingles: () => void;
}
/* const defaultState = { view: "IMAGES", singles: false, heading: "", filter: "", setFilter: ("") => } */

export const UIContext = createContext<defaultUI>({} as defaultUI);

const UIProvider = (props) => {
    const [spotifySearch, setSpotifySearch] = useState<string>("");
    const [filter, setFilter] = useState<string>("");
    const [view, setView] = useState<string>("IMAGES");
    const [singles, setSingless] = useState<boolean>(false);
    const [heading, setHeading] = useState<string>("");

    const toggleSingles = () => setSingless(!singles);

    return (
        <UIContext.Provider
            value={{
                view,
                singles,
                heading,
                filter,
                spotifySearch,
                setSpotifySearch,
                setFilter,
                setHeading,
                setView,
                toggleSingles,
            }}
        >
            {props.children}
        </UIContext.Provider>
    );
};

export { UIProvider };
