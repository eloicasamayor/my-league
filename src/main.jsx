import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./redux/store";

// Components
import {
  LeaguesPage,
  LeaguePage,
  TeamPage,
  LoginPage,
  HomePage,
  WelcomePage,
} from "./pages";
import { PageLayout } from "./components/pageLayout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter base="/">
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            {/* <Route path=":access_token" element={<WelcomePage />} /> */}
            <Route path="leagues">
              <Route index element={<LeaguesPage />} />
              <Route path=":leagueUrlName">
                <Route index element={<LeaguePage />} />
                <Route path=":teamName" element={<TeamPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
