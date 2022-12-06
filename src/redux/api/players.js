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
    insertPlayer: builder.mutation({
      query: ({ ...post }) => ({
        url: `/players`,
        method: "POST",
        body: post,
      }),
    }),
    updatePlayer: builder.mutation({
      query: ({ ...patch }) => ({
        url: "/players?id=eq." + patch.id,
        method: "PATCH",
        body: {
          name: patch.name,
          team: patch.team,
        },
      }),
    }),
    deletePlayer: builder.mutation({
      query: ({ ...body }) => ({
        url: "/players?id=eq." + body.id,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetPlayersQuery,
  useInsertPlayerMutation,
  useUpdatePlayerMutation,
  useDeletePlayerMutation,
} = players;
