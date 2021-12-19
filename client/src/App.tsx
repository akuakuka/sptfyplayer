import { Navigate, Route, Routes } from "react-router-dom";
import ArtistView from "./components/ArtistView";
import "./index.css";
import ArtistPage from "./components/ArtistPage";
import AlbumPage from "./components/AlbumPage";
import Login from "./components/Login";
import { ProtectedRoute } from "./protectedRoute";
import SearchResultPage from "./components/SearchResultPage";
import Layout from "./components/Layout";
import { AnimatePresence } from "framer-motion";

const NotFound: React.FC = () => {
  return <Navigate to="/app" />;
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
