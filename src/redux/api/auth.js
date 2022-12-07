import { user } from "./user";
import { apiSlice } from "./apiSlice";

export const auth = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query(data) {
        return {
          url: "/auth/v1/register",
          method: "POST",
          body: data,
        };
      },
    }),
    login: builder.mutation({
      query(data) {
        return {
          url: "/auth/v1/token?grant_type=password",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        debugger;
        try {
          await queryFulfilled;
          await dispatch(user.endpoints.getLoggedInUser.initiate(null));
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation } = auth;
