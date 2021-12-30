import React, { createContext, useState } from "react";

interface defaultQue {
  que: string[]
  setQue?: (a: string[]) => void;
}
const defaultState = { que: ["spotify:track:1jzDzZWeSDBg5fhNc3tczV"] }

export const QueContext = createContext<defaultQue>(defaultState);
// TODO : slice array when playing one song from album so rest of the songs are in the que
const QueProvider = (props) => {
  // Paranoid!
  const [que, setQue] = useState(defaultState.que);

  return (
    <QueContext.Provider
      value={{
        que,
        setQue
      }}>
      {props.children}
    </QueContext.Provider>
  );
};

export { QueProvider };
