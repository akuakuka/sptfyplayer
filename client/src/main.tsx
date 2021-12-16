import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueProvider } from "./hooks/usePlayQue";
import "@fontsource/aldrich";
import "@fontsource/lemon";
import { BrowserRouter } from "react-router-dom";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    heading: "Lemon",
    body: "Lemon",
  },
};
const theme = extendTheme({ config });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <QueProvider>
          <App />
        </QueProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
