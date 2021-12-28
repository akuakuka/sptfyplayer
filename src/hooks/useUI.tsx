import React, { createContext, useState } from "react";

interface defaultUI {
    view: string
    setView?: (a: string) => void;
}
const defaultState = { view: "IMAGES" }

export const UIContext = createContext<defaultUI>(defaultState);

const UIProvider = (props) => {

    const [view, setView] = useState(defaultState.view);

    return (
        <UIContext.Provider
            value={{
                view,
                setView
            }}>
            {props.children}
        </UIContext.Provider>
    );
};

export { UIProvider };
