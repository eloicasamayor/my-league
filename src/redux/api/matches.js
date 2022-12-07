import { apiSlice } from "./apiSlice";

export const matches = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMatches: builder.query({ query: () => "rest/v1/matches" }),
    insertMatch: builder.mutation({
      query: ({ ...post }) => ({
        url: `rest/v1/matches`,
        method: "POST",
        body: post,
      }),
    }),
    updateMatch: builder.mutation({
      query: ({ ...patch }) => ({
        url: "rest/v1/matches?id=eq." + patch.id,
        method: "PATCH",
        body: {
          played: patch.played,
          local_goals: patch.local_goals,
          visitor_goals: patch.visitor_goals,
          local_scorers: patch.local_scorers,
          visitor_scorers: patch.visitor_scorers,
        },
      }),
    }),
    deleteMatch: builder.mutation({
      query: ({ ...body }) => ({
        url: "rest/v1/matches?id=eq." + body.id,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetMatchesQuery,
  useInsertMatchMutation,
  useUpdateMatchMutation,
  useDeleteMatchMutation,
} = matches;
