import { apiSlice } from "./apiSlice";

export const players = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayers: builder.query({ query: () => "rest/v1/players" }),
    insertPlayer: builder.mutation({
      query: ({ ...post }) => ({
        url: `rest/v1/players`,
        method: "POST",
        body: post,
      }),
    }),
    updatePlayer: builder.mutation({
      query: ({ ...patch }) => ({
        url: "rest/v1/players?id=eq." + patch.id,
        method: "PATCH",
        body: {
          name: patch.name,
          team: patch.team,
        },
      }),
    }),
    deletePlayer: builder.mutation({
      query: ({ ...body }) => ({
        url: "rest/v1/players?id=eq." + body.id,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetPlayersQuery,
  useInsertPlayerMutation,
  useUpdatePlayerMutation,
  useDeletePlayerMutation,
} = players;
