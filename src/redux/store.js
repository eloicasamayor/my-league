import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { leagues } from "./api/leagues";
import { teams } from "./api/teams";
import { players } from "./api/players";
import { matches } from "./api/matches";
import { auth } from "./api/auth";
import { user } from "./api/user";
import { authSlice } from "./api";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [leagues.reducerPath]: leagues.reducer,
    [teams.reducerPath]: teams.reducer,
    [players.reducerPath]: players.reducer,
    [matches.reducerPath]: matches.reducer,
    [auth.reducerPath]: auth.reducer,
    [user.reducerPath]: user.reducer,
    userState: authSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(leagues.middleware)
      .concat(teams.middleware)
      .concat(players.middleware)
      .concat(matches.middleware)
      .concat(auth.middleware)
      .concat(user.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
