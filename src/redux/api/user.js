import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./authSlice";

// Constants
import { supabaseAuthUrl, supabaseKey } from "../constants";

export const user = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: supabaseAuthUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      headers.set("apikey", `${supabaseKey}`);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getLoggedInUser: builder.query({
      query() {
        return {
          url: "user",
          credentials: "include",
        };
      },
      transformResponse: (result) => result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetLoggedInUserQuery } = user;
