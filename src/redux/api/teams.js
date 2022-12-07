import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabaseUrl, supabaseKey } from "../constants";
import { apiSlice } from "./apiSlice";

export const teams = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({ query: () => "rest/v1/teams" }),
    insertTeam: builder.mutation({
      query: ({ ...post }) => ({
        url: `rest/v1/teams`,
        method: "POST",
        body: post,
      }),
    }),
    deleteTeam: builder.mutation({
      query: ({ ...body }) => ({
        url: "rest/v1/teams?id=eq." + body.id,
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
