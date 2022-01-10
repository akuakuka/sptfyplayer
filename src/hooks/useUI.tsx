import React, { createContext, useState } from "react";

interface defaultUI {
  page: string;
  view: string;
  singles: boolean;
  heading: string;
  filter: string;
  setPage: (a: string) => void;
  setFilter: (a: string) => void;
  setHeading: (h: string) => void;
  setView: (a: string) => void;
  toggleSingles: () => void;
}

export const UIContext = createContext<defaultUI>({} as defaultUI);

const UIProvider = (props) => {
  const [filter, setFilter] = useState<string>("");
  const [view, setView] = useState<string>("IMAGES");
  const [singles, setSingless] = useState<boolean>(false);
  const [heading, setHeading] = useState<string>("");
  const [page, setPage] = useState<string>("");
  const toggleSingles = () => setSingless(!singles);

  return (
    <UIContext.Provider
      value={{
        view,
        singles,
        heading,
        filter,
        page,
        setFilter,
        setHeading,
        setView,
        toggleSingles,
        setPage,
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
};

export { UIProvider };
