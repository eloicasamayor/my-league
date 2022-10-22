import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store";

// Components
import { LeaguesPage } from "./pages/LeaguesPage";
import { LeaguePage } from "./pages/LeaguePage";

import { HomePage } from "./pages/HomePage";
import { TeamsPage } from "./pages/TeamsPage";
import { PlayersPage } from "./pages/PlayersPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leagues" element={<LeaguesPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/:urlname" element={<LeaguePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
