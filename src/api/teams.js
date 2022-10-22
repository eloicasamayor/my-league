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
  }),
});

export const { useGetTeamsQuery } = teams;
