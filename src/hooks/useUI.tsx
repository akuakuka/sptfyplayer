import React, { createContext, useState } from "react";

interface defaultUI {
    view: string;
    singles: boolean;
    heading: string;
    filter: string;
    setFilter?: (a: string) => void;
    setHeading?: (h: string) => void;
    setView?: (a: string) => void;
    toggleSingles?: () => void;
}
const defaultState = { view: "IMAGES", singles: false, heading: "", filter: "" }

export const UIContext = createContext<defaultUI>(defaultState);

const UIProvider = (props) => {
    const [filter, setFilter] = useState(defaultState.filter);
    const [view, setView] = useState(defaultState.view);
    const [singles, setSingless] = useState(defaultState.singles);
    const [heading, setHeading] = useState(defaultState.heading);

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
