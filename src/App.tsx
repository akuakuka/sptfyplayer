import { AnimatePresence } from "framer-motion";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AlbumPage from "./components/Pages/AlbumPage";
import ArtistPage from "./components/Pages/ArtistPage";
import ArtistView from "./components/Pages/ArtistView";
import Login from "./components/Pages/Login";
import SearchResultPage from "./components/Pages/SearchResultPage";
import { ProtectedRoute } from "./protectedRoute";

// TODO : types from ../server path to alias
const NotFound: React.FC = () => {
  return <Navigate to="/app" />;

  // return <div>404</div>;
};

const App: React.FC = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/app" element={<ArtistView />} />
            <Route path="/app/artist/:id" element={<ArtistPage />} />
            <Route path="/app/album/:id" element={<AlbumPage />} />
            <Route path="/app/search/:term" element={<SearchResultPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
