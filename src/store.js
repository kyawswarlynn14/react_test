import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./store/userSlice";
import chatSlice from "./store/chatSlice";
import authSlice from "./store/authSlice";

const store = configureStore ({
  reducer: {
    auth: authSlice,
    user: userSlice,
    chat: chatSlice,
  }
})

export default store;
