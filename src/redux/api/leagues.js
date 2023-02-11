import { apiSlice } from "./apiSlice";
import { supabase } from "../../supabase";

export const leagues = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeagues: builder.query({
      queryFn: async () => {
        const res = await supabase.from("leagues").select();
        if (res.status !== 200) {
          return { error: res.error };
        }
        return { data: res.data };
      },
      providesTags: ["leagues"],
    }),
    insertLeague: builder.mutation({
      queryFn: async (post) => {
        const res = await supabase
          .from("leagues")
          .insert([{ ...post }])
          .select();
        if (res.status !== 201) {
          return { error: res.error };
        }
        return { data: res.data };
      },
      invalidatesTags: ["leagues"],
    }),
    updateLeague: builder.mutation({
      queryFn: async (patch) => {
        const res = await supabase
          .from("leagues")
          .update(patch)
          .eq("id", patch.id);
        if (res.status !== 204) {
          return { error: res.error };
        }
        return { data: res.data };
      },
      invalidatesTags: ["leagues"],
    }),
    deleteLeague: builder.mutation({
      queryFn: async (body) => {
        const res = await supabase.from("leagues").delete().eq("id", body.id);
        if (res.status !== 204) {
          return { error: res.error };
        }
        return { data: res.data };
      },
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
