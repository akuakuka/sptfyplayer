import { AnimatePresence } from "framer-motion";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AlbumPage from "./components/AlbumPage";
import ArtistPage from "./components/ArtistPage";
import ArtistView from "./components/ArtistView";
import Layout from "./components/Layout";
import Login from "./components/Login";
import SearchResultPage from "./components/SearchResultPage";
import "./index.css";
import { ProtectedRoute } from "./protectedRoute";
// TODO : types from ../server path to alias
const NotFound: React.FC = () => {
  return <Navigate to="/app" />;
  /* return <Box>404</Box> */
};

const App: React.FC = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/app" element={<ArtistView />} />
            <Route path={`/app/artist/:id`} element={<ArtistPage />} />
            <Route path={`/app/album/:id`} element={<AlbumPage />} />
            <Route path={`/app/search/:term`} element={<SearchResultPage />} />

          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
