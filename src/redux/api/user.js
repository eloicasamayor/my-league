import { setCredentials } from "./authSlice";
import { apiSlice } from "./apiSlice";

export const user = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUser: builder.query({
      query() {
        return {
          url: "auth/v1/user",
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
