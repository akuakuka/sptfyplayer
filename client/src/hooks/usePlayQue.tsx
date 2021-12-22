import React, { createContext, useEffect, useState } from "react";
//@ts-ignore
export const QueContext = createContext();
//@ts-ignore
const QueProvider = (props) => {
  const [que, setQue] = useState(["spotify:track:1jzDzZWeSDBg5fhNc3tczV"]);

  useEffect(() => {
    console.log(que);
  }, [que]);

  return (
    <QueContext.Provider value={[que, setQue]}>
      {props.children}
    </QueContext.Provider>
  );
};

export { QueProvider };
