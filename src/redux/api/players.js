import { apiSlice } from "./apiSlice";
import { supabase } from "../../supabase";

export const players = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayers: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.from("players").select();
        return error ? { error } : { data };
      },
      providesTags: ["players"],
    }),
    insertPlayer: builder.mutation({
      queryFn: async (post) => {
        const { data, error } = await supabase.from("players").insert(post);
        return error ? { error } : { data };
      },
      invalidatesTags: ["players"],
    }),
    updatePlayer: builder.mutation({
      queryFn: async (patch) => {
        const { data, error } = await supabase
          .from("players")
          .update({
            name: patch.name,
            team: patch.team,
          })
          .eq("id", patch.id);
        return error ? { error } : { data };
      },
      invalidatesTags: ["players"],
    }),
    deletePlayer: builder.mutation({
      queryFn: async (body) => {
        const { data, error } = await supabase
          .from("players")
          .delete()
          .eq("id", body.id);
        return error ? { error } : { data };
      },
      invalidatesTags: ["players"],
    }),
    deleteAllLeaguePlayers: builder.mutation({
      queryFn: async (body) => {
        const { data, error } = await supabase
          .from("players")
          .delete()
          .eq("league", body.id);
        return error ? { error } : { data };
      },
      invalidatesTags: ["players"],
    }),
  }),
});

export const {
  useGetPlayersQuery,
  useInsertPlayerMutation,
  useUpdatePlayerMutation,
  useDeletePlayerMutation,
  useDeleteAllLeaguePlayersMutation,
} = players;
