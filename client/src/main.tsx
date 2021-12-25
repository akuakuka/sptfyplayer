import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/aldrich";
import "@fontsource/cabin";
import "@fontsource/lemon";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
//@ts-ignore
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import { QueProvider } from "./hooks/usePlayQue";
import { UIProvider } from "./hooks/useUI";
import "./index.css";


registerSW();

const theme = extendTheme({
  colors: {
    brand: {
      100: "#FAF3F3",
      300: "#afb1d7",
      500: "#FCD6CC",
      600: "#A7BBC7",
      700: "#7a626b",
      800: "#decad6",
      900: "#e4bbff8a",
    },
    brandDark: {
      100: "#718096",
      200: "#870000",
      300: "#2D3748",
      600: "#s1A202C",
      900: "#171923",

    }
  },
  shadows: {
    neored: 'inset 20px 20px 60px #bdacb6,inset -20px -20px 60px #ffe8f6;',
    neorednoblur: "11px 11px 0px #4d3e43,-11px -11px 0px #a78693"
  },
  initialColorMode: "dark",
  fonts: {
    heading: 'Cabin',
    body: 'Cabin',
  },

})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <QueProvider>
          <UIProvider>
            <App />
          </UIProvider>
        </QueProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
