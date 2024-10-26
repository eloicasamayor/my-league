import { apiSlice } from "./apiSlice";
import { supabase } from "../../supabase";

export const matches = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMatches: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.from("matches").select();
        return error ? { error } : { data };
      },
      providesTags: ["matches"],
    }),
    insertMatch: builder.mutation({
      queryFn: async (post) => {
        const { data, error } = await supabase.from("matches").insert(post);
        return error ? { error } : { data };
      },
      invalidatesTags: ["matches"],
    }),
    updateMatch: builder.mutation({
      queryFn: async (patch) => {
        const { data, error } = await supabase
          .from("matches")
          .update({
            played: patch.played,
            local_goals: patch.local_goals,
            visitor_goals: patch.visitor_goals,
            local_scorers: patch.local_scorers,
            visitor_scorers: patch.visitor_scorers,
          })
          .eq("id", patch.id);
        return error ? { error } : { data };
      },
      invalidatesTags: ["matches", "teams"],
    }),
    deleteMatch: builder.mutation({
      queryFn: async (body) => {
        const { data, error } = await supabase
          .from("matches")
          .delete()
          .eq("id", body.id);
        return error ? { error } : { data };
      },
      invalidatesTags: ["matches", "teams"],
    }),
    deleteAllLeagueMatches: builder.mutation({
      queryFn: async (body) => {
        const { data, error } = await supabase
          .from("matches")
          .delete()
          .eq("league", body.id);
        return error ? { error } : { data };
      },
      invalidatesTags: ["matches", "teams"],
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
