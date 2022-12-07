import { apiSlice } from "./apiSlice";

export const leagues = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeagues: builder.query({ query: () => "rest/v1/leagues" }),
    insertLeague: builder.mutation({
      query: ({ ...post }) => ({
        url: `rest/v1/leagues`,
        method: "POST",
        body: post,
      }),
    }),
    updateLeague: builder.mutation({
      query: ({ ...patch }) => ({
        url: "rest/v1/leagues",
        method: "PATCH",
        body: patch,
      }),
    }),
    deleteLeague: builder.mutation({
      query: ({ ...body }) => ({
        url: "rest/v1/leagues?id=eq." + body.id,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetLeaguesQuery,
  useInsertLeagueMutation,
  useUpdateLeagueMutation,
  useDeleteLeagueMutation,
} = leagues;
