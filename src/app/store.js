import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/users/reducer/usersSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
