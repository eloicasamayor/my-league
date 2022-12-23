// Dependencies
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { user: "" },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = authSlice;
// Extract and export each action creator by name
export const { setUser } = actions;
