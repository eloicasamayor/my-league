import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { supabaseUrl, supabaseKey } from "../constants";
import { setCredentials, logOut } from "./authSlice";

export const apiBaseQuery = fetchBaseQuery({
  baseUrl: supabaseUrl,
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    headers.set("apikey", `${supabaseKey}`);
    const token = getState().auth.token;
    /* if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } */
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({}),
});
