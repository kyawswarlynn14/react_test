import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      addNewUser: (state, { payload }) => {
        const { id, name } = payload;
        state.users = [...state.users, {id, name}]
        localStorage.setItem("users", JSON.stringify(state.users));
      },
      updateUserFromLocalStorage: (state, { payload }) => {
        state.users = payload;
      },
    }
})

const savedUsers = JSON.parse(localStorage.getItem("users"));
if (savedUsers) {
  initialState.users = savedUsers;
}

export const { addNewUser, updateUserFromLocalStorage } = userSlice.actions;
export default userSlice.reducer;