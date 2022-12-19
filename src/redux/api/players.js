import { apiSlice } from "./apiSlice";
import { supabase } from "../../supabase";

export const players = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayers: builder.query({
      queryFn: async () => await supabase.from("players").select(),
      providesTags: ["players"],
    }),
    insertPlayer: builder.mutation({
      queryFn: async (post) => await supabase.from("players").insert(post),
      invalidatesTags: ["players"],
    }),
    updatePlayer: builder.mutation({
      queryFn: async (patch) =>
        await supabase
          .from("players")
          .update({
            name: patch.name,
            team: patch.team,
          })
          .eq("id", patch.id),
      invalidatesTags: ["players"],
    }),
    deletePlayer: builder.mutation({
      queryFn: async (body) =>
        await supabase.from("players").delete().eq("id", body.id),
      invalidatesTags: ["players"],
    }),
  }),
});

export const {
  useGetPlayersQuery,
  useInsertPlayerMutation,
  useUpdatePlayerMutation,
  useDeletePlayerMutation,
} = players;
