import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import locationReducer from "./locationSlice";
import homeReducer from "./homeSlice";
import partnerReducer from "./PartnerSlice";
import profileReducer from "./profileSlice";
import updateProfileReducer from "./updateProfileSlice";
export const reduxStore = configureStore({
  reducer: {
    authReducer,
    locationReducer,
    homeReducer,
    partnerReducer,
    profileReducer,
    updateProfileReducer,
  },
});
