import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabaseUrl, supabaseKey } from "../constants";

export const teams = createApi({
  reducerPath: "teams",
  baseQuery: fetchBaseQuery({
    baseUrl: supabaseUrl,
    prepareHeaders: (headers) => {
      headers.set("apikey", `${supabaseKey}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTeams: builder.query({ query: () => "/teams" }),
    insertTeam: builder.mutation({
      query: ({ ...post }) => ({
        url: `/teams`,
        method: "POST",
        body: post,
      }),
    }),
    deleteTeam: builder.mutation({
      query: ({ ...body }) => ({
        url: "/teams?id=eq." + body.id,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useInsertTeamMutation,
  useDeleteTeamMutation,
} = teams;
