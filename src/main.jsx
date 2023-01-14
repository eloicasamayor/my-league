import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./redux/store";

// Components
import {
  LeaguesPage,
  LeaguePage,
  TeamPage,
  LoginPage,
  HomePage,
} from "./pages";
import { PageLayout } from "./components/pageLayout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter base="/">
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<LeaguesPage />} />
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path=":leagueUrlName">
              <Route index element={<LeaguePage />} />
              <Route path=":teamName" element={<TeamPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
