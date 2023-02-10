// Dependencies
import { apiSlice } from "./apiSlice";
import { supabase } from "../../supabase";

export const teams = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      queryFn: async () => await supabase.from("teams").select(),
      providesTags: ["teams"],
    }),
    insertTeam: builder.mutation({
      queryFn: async (post) => await supabase.from("teams").insert(post).select,
      invalidatesTags: ["teams"],
    }),
    updateTeam: builder.mutation({
      queryFn: async (patch) =>
        await supabase.from("teams").update(patch).eq("id", patch.id),
      invalidatesTags: ["teams"],
    }),
    deleteTeam: builder.mutation({
      queryFn: async (body) =>
        await supabase.from("teams").delete().eq("id", body.id),
      invalidatesTags: ["teams"],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useInsertTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teams;
