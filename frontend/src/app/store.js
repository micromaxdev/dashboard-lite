import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import allReducer from "../features/all/allSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    all: allReducer,
  },
});
