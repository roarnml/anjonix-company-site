import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice"; // ✅ Add this line

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer, // ✅ Register it here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
