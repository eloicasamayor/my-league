import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const apiSlice = createApi({
  reducerPath: "myLeagueAPI",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({}),
  tagTypes: ["leagues", "matches", "players", "teams"],
});
