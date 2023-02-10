import { apiSlice } from "./apiSlice";
import { supabase } from "../../supabase";

export const leagues = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeagues: builder.query({
      queryFn: async () => await supabase.from("leagues").select(),
      providesTags: ["leagues"],
    }),
    insertLeague: builder.mutation({
      queryFn: async (post) =>
        await supabase
          .from("leagues")
          .insert([{ ...post }])
          .select(),
      invalidatesTags: ["leagues"],
    }),
    updateLeague: builder.mutation({
      queryFn: async (patch) =>
        await supabase.from("leagues").update(patch).eq("id", patch.id),
      invalidatesTags: ["leagues"],
    }),
    deleteLeague: builder.mutation({
      queryFn: async (body) =>
        await supabase.from("leagues").delete().eq("id", body.id),
      invalidatesTags: ["leagues"],
    }),
  }),
});

export const {
  useGetLeaguesQuery,
  useInsertLeagueMutation,
  useUpdateLeagueMutation,
  useDeleteLeagueMutation,
} = leagues;
