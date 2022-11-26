import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { leagues } from "./api/leagues";
import { teams } from "./api/teams";
import { players } from "./api/players";
import { matches } from "./api/matches";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [leagues.reducerPath]: leagues.reducer,
    [teams.reducerPath]: teams.reducer,
    [players.reducerPath]: players.reducer,
    [matches.reducerPath]: matches.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(leagues.middleware)
      .concat(teams.middleware)
      .concat(players.middleware)
      .concat(matches.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
