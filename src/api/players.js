import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabaseUrl, supabaseKey } from "../constants";

export const players = createApi({
  reducerPath: "players",
  baseQuery: fetchBaseQuery({
    baseUrl: supabaseUrl,
    prepareHeaders: (headers) => {
      headers.set("apikey", `${supabaseKey}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPlayers: builder.query({ query: () => "/players" }),
  }),
});

export const { useGetPlayersQuery } = players;
