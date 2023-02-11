import { apiSlice } from "./apiSlice";
import { supabase } from "../../supabase";

export const matches = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMatches: builder.query({
      queryFn: async () => await supabase.from("matches").select(),
      providesTags: ["matches"],
    }),
    insertMatch: builder.mutation({
      queryFn: async (post) => await supabase.from("matches").insert(post),
      invalidatesTags: ["matches"],
    }),
    updateMatch: builder.mutation({
      queryFn: async (patch) =>
        await supabase
          .from("matches")
          .update({
            played: patch.played,
            local_goals: patch.local_goals,
            visitor_goals: patch.visitor_goals,
            local_scorers: patch.local_scorers,
            visitor_scorers: patch.visitor_scorers,
          })
          .eq("id", patch.id),
      invalidatesTags: ["matches"],
    }),
    deleteMatch: builder.mutation({
      queryFn: async (body) =>
        await supabase.from("matches").delete().eq("id", body.id),
      invalidatesTags: ["matches"],
    }),
    deleteAllLeagueMatches: builder.mutation({
      queryFn: async (body) =>
        await supabase.from("matches").delete().eq("league", body.id),
      invalidatesTags: ["matches"],
    }),
  }),
});

export const {
  useGetMatchesQuery,
  useInsertMatchMutation,
  useUpdateMatchMutation,
  useDeleteMatchMutation,
  useDeleteAllLeagueMatchesMutation,
} = matches;
