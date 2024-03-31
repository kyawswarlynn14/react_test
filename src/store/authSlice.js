import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUserInfo: (state, { payload }) => {
        state.userInfo = payload;
      },
      clearUserInfo: (state, { payload }) => {
        state.userInfo = null;
      }
    }
})

export const { setUserInfo, clearUserInfo } = authSlice.actions;
export default authSlice.reducer;