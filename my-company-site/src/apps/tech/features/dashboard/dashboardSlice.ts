import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAdminOverview,
  fetchInstructorOverview,
  fetchManagementOverview,
  fetchLearnerOverview,
} from "../../api/endpoints/admin.api";

interface DashboardState {
  data: Record<string, any> | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  status: "idle",
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // list of all async thunks handled identically
    const fetchers = [
      fetchAdminOverview,
      fetchInstructorOverview,
      fetchManagementOverview,
      fetchLearnerOverview,
    ];

    for (const fetcher of fetchers) {
      builder
        .addCase(fetcher.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(fetcher.fulfilled, (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.data = action.payload;
        })
        .addCase(fetcher.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message || "Failed to fetch overview data";
        });
    }
  },
});

export default dashboardSlice.reducer;
