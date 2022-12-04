import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store";

// Components
import { LeaguesPage } from "./pages/LeaguesPage";
import { LeaguePage } from "./pages/LeaguePage";
import { TeamPage } from "./pages/TeamPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter base="/">
        <Routes>
          <Route index element={<LeaguesPage />} />
          <Route path=":leagueUrlName" element={<LeaguePage />} />
          <Route path=":leagueUrlName/:teamName" element={<TeamPage />} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
