import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};
export const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    logout: () => initialState,
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;

export const { logout, setUser } = authSlice.actions;
