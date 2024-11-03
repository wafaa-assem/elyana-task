import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import locationReducer from "./locationSlice";
export const reduxStore = configureStore({
  reducer: {
    authReducer,
    locationReducer,
  },
});
