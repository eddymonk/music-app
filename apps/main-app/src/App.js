import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AlbumsPhotosApp = lazy(() => import("albums_photos_app/AlbumsPhotosApp"));
const RecentPhotosApp = lazy(() => import("recent_photos_app/RecentPhotosApp"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/albums" element={<AlbumsPhotosApp />} />
          <Route path="/recent-photos" element={<RecentPhotosApp />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
