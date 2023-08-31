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
  NewLeaguePage,
  UpdatePassword,
} from "./pages";
import { PageLayout } from "./components/PageLayout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter base="/">
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<LeaguesPage />} />
            <Route path="/account" element={<LoginPage />}></Route>
            <Route path="/update-password" element={<UpdatePassword />}></Route>
            <Route path="/new-league" element={<NewLeaguePage />}></Route>
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
