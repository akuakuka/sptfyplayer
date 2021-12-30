import React, { createContext, useState } from "react";

interface defaultUI {
    view: string;
    singles: boolean;
    heading: string;
    filter: string;
    setFilter: (a: string) => void;
    setHeading: (h: string) => void;
    setView: (a: string) => void;
    toggleSingles: () => void;
}
/* const defaultState = { view: "IMAGES", singles: false, heading: "", filter: "", setFilter: ("") => } */

export const UIContext = createContext<defaultUI>({} as defaultUI);

const UIProvider = (props) => {
    const [filter, setFilter] = useState("");
    const [view, setView] = useState("IMAGES");
    const [singles, setSingless] = useState(false);
    const [heading, setHeading] = useState("");

    const toggleSingles = () => {
        console.log("singels")
        setSingless(!singles)
        console.log(singles)
    }
    return (
        <UIContext.Provider
            value={{
                view,
                singles,
                heading,
                filter,
                setFilter,
                setHeading,
                setView,
                toggleSingles
            }}>
            {props.children}
        </UIContext.Provider>
    );
};

export { UIProvider };
