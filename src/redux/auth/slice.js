// Dependencies
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    setAuth(state, action) {
      state.user = action.payload.user;
      state.session = action.payload.session;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = authSlice;
// Extract and export each action creator by name
export const { setAuth } = actions;
