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
        url: "/matches",
        method: "PATCH",
        body: patch,
      }),
    }),
  }),
});

export const { useGetMatchesQuery, useInsertMatchMutation, useUpdateMatchMutation } = matches;
