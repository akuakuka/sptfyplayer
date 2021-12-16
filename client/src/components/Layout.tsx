import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Outlet,
  Routes,
} from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  handleVolume: (val: number) => void;
  volume: number;
}

const Layout: React.FC<LayoutProps> = ({ handleVolume, volume }) => {
  return (
    <>
      <Header
        handleAlbumArtToggle={() =>
          console.log("Handle albumart toggle </layout>")
        }
      />
      <Box
        /*         backgroundImage={
          //@ts-ignore
          albumArtBg ? getAlbumArtFromPLaybackState(playbackState) : ""
        } */
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundAttachment={"fixed"}
        backgroundPosition={"center"}
        height={"90vh"}
        width={"100vw"}
        overflow={"hidden"}
      >
        <Outlet />
      </Box>

      <Footer handleVolume={handleVolume} volume={volume} />
    </>
  );
};

export default Layout;
