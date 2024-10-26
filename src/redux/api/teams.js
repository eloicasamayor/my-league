// Dependencies
import { apiSlice } from "./apiSlice";
import { supabase } from "../../supabase";

export const teams = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.from("teams").select();
        return error ? { error } : { data };
      },
      providesTags: ["teams"],
    }),
    insertTeam: builder.mutation({
      queryFn: async (post) => {
        const { data, error } = await supabase
          .from("teams")
          .insert(post)
          .select();
        return error ? { error } : { data };
      },
      invalidatesTags: ["teams"],
    }),
    updateTeam: builder.mutation({
      queryFn: async (patch) => {
        const { data, error } = await supabase
          .from("teams")
          .update(patch)
          .eq("id", patch.id);
        return error ? { error } : { data };
      },
      invalidatesTags: ["teams"],
    }),
    deleteTeam: builder.mutation({
      queryFn: async (body) => {
        const { data, error } = await supabase
          .from("teams")
          .delete()
          .eq("id", body.id);
        return error ? { error } : { data };
      },
      invalidatesTags: ["teams"],
    }),
    deleteAllLeagueTeams: builder.mutation({
      queryFn: async (body) => {
        const { data, error } = await supabase
          .from("teams")
          .delete()
          .eq("league", body.id);
        return error ? { error } : { data };
      },
      invalidatesTags: ["teams"],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useInsertTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useDeleteAllLeagueTeamsMutation,
} = teams;
