import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabaseUrl, supabaseKey } from "../constants";

export const matches = createApi({
  reducerPath: "matches",
  baseQuery: fetchBaseQuery({
    baseUrl: supabaseUrl,
    prepareHeaders: (headers) => {
      headers.set("apikey", `${supabaseKey}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMatches: builder.query({ query: () => "/matches" }),
    insertMatch: builder.mutation({
      query: ({ ...post }) => ({
        url: `/matches`,
        method: "POST",
        body: post,
      }),
    }),
    updateMatch: builder.mutation({
      query: ({ ...patch }) => ({
        url: "/matches?id=eq."+patch.id,
        method: "PATCH",
        body: {played: patch.played, local_goals: patch.local_goals, visitor_goals: patch.visitor_goals},
      }),
    }),
    deleteMatch: builder.mutation({
      query: ({ ...body }) => ({
        url: "/matches?id=eq."+body.id,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const { useGetMatchesQuery, useInsertMatchMutation, useUpdateMatchMutation, useDeleteMatchMutation } = matches;
