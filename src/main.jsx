import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./redux/store";

// Components
import { LeaguesPage } from "./pages/LeaguesPage";
import { LeaguePage } from "./pages/LeaguePage";
import { TeamPage } from "./pages/TeamPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter base="/">
        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/leagues">
            <Route index element={<LeaguesPage />} />
            <Route path=":leagueUrlName">
              <Route index element={<LeaguePage />} />
              <Route path=":teamName" element={<TeamPage />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
