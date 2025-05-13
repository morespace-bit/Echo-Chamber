import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
