// Dependencies
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { user } from "./user";

// Constants
import { supabaseAuthUrl, supabaseKey } from "../constants";

export const auth = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: supabaseAuthUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      headers.set("apikey", `${supabaseKey}`);
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query(data) {
        return {
          url: "register",
          method: "POST",
          body: data,
        };
      },
    }),
    login: builder.mutation({
      query(data) {
        return {
          url: "token?grant_type=password",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(user.endpoints.getLoggedInUser.initiate(null));
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation } = auth;
